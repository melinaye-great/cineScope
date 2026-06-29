"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Film, Calendar } from "lucide-react";
import KPICard from "@/components/KPICard";
import BoxOfficeRank from "@/components/BoxOfficeRank";
import BoxOfficeTrend from "@/components/BoxOfficeTrend";
import {
  movies,
  dailyBoxOffice,
  totalBoxOffice,
  totalShowCount,
  updateTime as initialUpdateTime,
} from "@/lib/mockData";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    setUpdateTime(initialUpdateTime);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2 md:mt-0"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 h-32 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-pulse h-96"></div>
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse h-80"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          🎬 CineScope 影界·实时票房
        </h1>
        <span className="text-sm text-gray-500 mt-2 md:mt-0">
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

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          票房排行榜
        </h2>
        <BoxOfficeRank movies={movies} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          近7日票房趋势
        </h2>
        <BoxOfficeTrend data={dailyBoxOffice} />
      </div>
    </div>
  );
}
