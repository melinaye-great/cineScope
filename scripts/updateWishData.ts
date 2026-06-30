import { db } from './src/lib/db';
import { movies, wishData } from './src/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

const DOUBAN_API_KEY = process.env.DOUBAN_API_KEY || '';
const JISU_APPKEY = process.env.JISU_APPKEY || '';

const DOUBAN_API_BASE = 'https://api.douban.com/v2/movie';
const JISU_API_BASE = 'https://api.jisuapi.com/movie/detail';

interface DoubanMovieResponse {
  id: string;
  title: string;
  wish_count?: number;
}

interface JisuMovieResponse {
  status: string;
  msg: string;
  result?: {
    movie_id?: string;
    title?: string;
    want?: string;
  };
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWishFromDouban(movieName: string): Promise<number | null> {
  try {
    if (!DOUBAN_API_KEY) {
      console.warn('豆瓣 API Key 未配置');
      return null;
    }

    const searchUrl = `${DOUBAN_API_BASE}/search?q=${encodeURIComponent(movieName)}&apikey=${DOUBAN_API_KEY}`;
    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      console.warn(`豆瓣搜索失败: ${movieName}, status: ${searchRes.status}`);
      return null;
    }

    const searchData = await searchRes.json();
    const subjects = searchData.subjects || [];

    if (subjects.length === 0) {
      console.warn(`豆瓣未找到影片: ${movieName}`);
      return null;
    }

    const firstMovie = subjects[0];
    const movieId = firstMovie.id;

    const detailUrl = `${DOUBAN_API_BASE}/subject/${movieId}?apikey=${DOUBAN_API_KEY}`;
    const detailRes = await fetch(detailUrl);

    if (!detailRes.ok) {
      console.warn(`豆瓣详情获取失败: ${movieName}, status: ${detailRes.status}`);
      return null;
    }

    const detailData: DoubanMovieResponse = await detailRes.json();
    const wishCount = detailData.wish_count || 0;

    console.log(`✅ 豆瓣: ${movieName} -> ${wishCount}`);
    return wishCount;

  } catch (error) {
    console.error(`豆瓣API调用异常: ${movieName}`, error);
    return null;
  }
}

async function fetchWishFromJisu(movieName: string): Promise<number | null> {
  try {
    if (!JISU_APPKEY) {
      console.warn('极速数据 API Key 未配置');
      return null;
    }

    const url = `${JISU_API_BASE}?appkey=${JISU_APPKEY}&title=${encodeURIComponent(movieName)}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`极速数据请求失败: ${movieName}, status: ${res.status}`);
      return null;
    }

    const data: JisuMovieResponse = await res.json();

    if (data.status !== '0') {
      console.warn(`极速数据返回错误: ${movieName}, msg: ${data.msg}`);
      return null;
    }

    const wishStr = data.result?.want || '0';
    const wishCount = parseInt(wishStr.replace(/,/g, ''), 10) || 0;

    console.log(`✅ 极速数据: ${movieName} -> ${wishCount}`);
    return wishCount;

  } catch (error) {
    console.error(`极速数据API调用异常: ${movieName}`, error);
    return null;
  }
}

async function updateWishData() {
  console.log('🚀 开始更新 "想看" 数据...');

  try {
    const targetMovies = await db
      .select()
      .from(movies)
      .where(inArray(movies.status, ['released', 'upcoming']));

    console.log(`📋 找到 ${targetMovies.length} 部影片需要更新`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < targetMovies.length; i++) {
      const movie = targetMovies[i];
      const movieName = movie.name;

      let wishCount = await fetchWishFromDouban(movieName);
      let source = 'douban';

      if (wishCount === null) {
        wishCount = await fetchWishFromJisu(movieName);
        source = 'jisu';
      }

      if (wishCount === null) {
        console.warn(`❌ 所有数据源均失败: ${movieName}`);
        failCount++;
        continue;
      }

      const today = new Date();

      const existingData = await db
        .select()
        .from(wishData)
        .where(eq(wishData.movieId, movie.id));

      const yesterdayData = existingData.find(
        d => d.platform === source && d.snapshotDate !== today
      );

      const dailyIncrement = yesterdayData
        ? wishCount - (yesterdayData.wishCount || 0)
        : 0;

      await db
        .insert(wishData)
        .values({
          movieId: movie.id,
          platform: source,
          wishCount: wishCount,
          dailyIncrement: dailyIncrement,
          snapshotDate: today,
        })
        .onConflictDoUpdate({
          target: wishData.uniqueSnapshot,
          set: {
            wishCount: wishCount,
            dailyIncrement: dailyIncrement,
          },
        });

      console.log(`✅ 更新成功: ${movieName} (${source}) -> ${wishCount}`);
      successCount++;

      await sleep(1500);
    }

    console.log(`🎉 更新完成! 成功: ${successCount}, 失败: ${failCount}`);

  } catch (error) {
    console.error('💥 更新过程发生异常:', error);
  }
}

if (require.main === module) {
  updateWishData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { updateWishData };
