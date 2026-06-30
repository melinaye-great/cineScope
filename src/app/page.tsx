"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Film, Calendar } from "lucide-react";
import KPICard from "@/components/KPICard";
import BoxOfficeRank from "@/components/BoxOfficeRank";
import BoxOfficeTrend from "@/components/BoxOfficeTrend";
import { fetchBoxOffice, type BoxOfficeResponse } from "@/lib/api";

export default function Home() {
  const [updateTime, setUpdateTime] = useState("加载中...");
  const [movies, setMovies] = useState<BoxOfficeResponse["movies"]>([]);
  const [dailyBoxOffice, setDailyBoxOffice] = useState<BoxOfficeResponse["dailyBoxOffice"]>([]);
  const [totalBoxOffice, setTotalBoxOffice] = useState(0);
  const [totalShowCount, setTotalShowCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await fetchBoxOffice();
      setMovies(data.movies);
      setDailyBoxOffice(data.dailyBoxOffice);
      setTotalBoxOffice(data.totalBoxOffice);
      setTotalShowCount(data.totalShowCount);
      setUpdateTime(data.updateTime);
    }

    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient-gold">
          🎬 CineScope 影界·实时票房
        </h1>
        <span className="text-sm text-gray-400 mt-2 md:mt-0">
          更新时间：{updateTime}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="今日大盘票房"
          value={totalBoxOffice.toLocaleString()}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="在映影片数"
          value={movies.length}
          icon={<Film className="w-5 h-5" />}
        />
        <KPICard
          title="今日总场次"
          value={totalShowCount.toLocaleString()}
          icon={<Calendar className="w-5 h-5" />}
        />
      </div>

      <div className="card-dark rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          票房排行榜
        </h2>
        <BoxOfficeRank movies={movies} />
      </div>

      <div className="card-dark rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          近7日票房趋势
        </h2>
        <BoxOfficeTrend data={dailyBoxOffice} />
      </div>
    </div>
  );
}
