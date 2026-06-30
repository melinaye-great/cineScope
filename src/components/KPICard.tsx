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
    <div className="card-dark rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-amber-500/5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400">{title}</span>
        <span className="text-amber-500">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gradient-gold font-mono-nums">{value}</span>
        {changeRate !== undefined && (
          <span
            className={`text-sm flex items-center ${
              isPositive
                ? "text-green-400"
                : isNegative
                ? "text-red-400"
                : "text-gray-400"
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
