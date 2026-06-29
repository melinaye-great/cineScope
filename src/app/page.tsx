"use client";

import { TrendingUp, Film, Calendar } from "lucide-react";
import KPICard from "@/components/KPICard";
import BoxOfficeRank from "@/components/BoxOfficeRank";
import BoxOfficeTrend from "@/components/BoxOfficeTrend";
import {
  movies,
  dailyBoxOffice,
  totalBoxOffice,
  totalShowCount,
  updateTime,
} from "@/lib/mockData";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 顶部标题栏 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          🎬 CineScope 影界·实时票房
        </h1>
        <span className="text-sm text-gray-500 mt-2 md:mt-0">
          更新时间：{updateTime}
        </span>
      </div>

      {/* KPI 卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="今日大盘票房"
          value={totalBoxOffice}
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

      {/* 票房排行榜 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          票房排行榜
        </h2>
        <BoxOfficeRank movies={movies} />
      </div>

      {/* 近7日票房趋势 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          近7日票房趋势
        </h2>
        <BoxOfficeTrend data={dailyBoxOffice} />
      </div>
    </div>
  );
}
