"use client";

import React from "react";

interface Movie {
  id: string;
  name: string;
  boxOffice: number;
  marketShare: number;
  seatRate: number;
  color: string;
}

interface BoxOfficeRankProps {
  movies: Movie[];
}

export default function BoxOfficeRank({ movies }: BoxOfficeRankProps) {
  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              排名
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              影片名称
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
              今日票房(万元)
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
              排片占比
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
              上座率
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => {
            const rank = index + 1;
            return (
              <tr
                key={movie.id}
                className={`border-b border-gray-100 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="py-3 px-4 text-center w-16">
                  {getRankEmoji(rank)}
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  {movie.name}
                </td>
                <td className="py-3 px-4 text-right font-mono text-gray-700">
                  {movie.boxOffice.toLocaleString()}
                </td>
                <td className="py-3 px-4 w-48">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${movie.marketShare}%`,
                          backgroundColor: movie.color,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {movie.marketShare.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {movie.seatRate.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
