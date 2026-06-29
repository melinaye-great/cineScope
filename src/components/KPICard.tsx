"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  changeRate?: number;
}

export default function KPICard({
  title,
  value,
  icon,
  changeRate,
}: KPICardProps) {
  const isPositive = changeRate !== undefined && changeRate > 0;
  const isNegative = changeRate !== undefined && changeRate < 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {changeRate !== undefined && (
          <span
            className={`text-sm flex items-center ${
              isPositive
                ? "text-green-500"
                : isNegative
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {isPositive && <TrendingUp className="w-3 h-3 mr-0.5" />}
            {isNegative && <TrendingDown className="w-3 h-3 mr-0.5" />}
            {isPositive && "↑"}
            {isNegative && "↓"}
            {Math.abs(changeRate).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
