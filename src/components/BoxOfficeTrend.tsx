"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

interface DailyBoxOffice {
  date: string;
  value: number;
}

interface BoxOfficeTrendProps {
  data: DailyBoxOffice[];
}

export default function BoxOfficeTrend({ data }: BoxOfficeTrendProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-lg">
        <span className="text-gray-400 text-sm">暂无数据</span>
      </div>
    );
  }

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
      formatter: (params: { name: string; value: number }[]) => {
        const item = params[0];
        return `${item.name}<br/>票房: <strong>${item.value.toLocaleString()}</strong> 万元`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
      axisLabel: {
        color: "#6b7280",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#6b7280",
        formatter: (value: number) => `${(value / 1000).toFixed(1)}k`,
      },
      splitLine: {
        lineStyle: {
          color: "#f3f4f6",
        },
      },
    },
    series: [
      {
        name: "票房",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#3b82f6",
          width: 2,
        },
        itemStyle: {
          color: "#3b82f6",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
              { offset: 1, color: "rgba(59, 130, 246, 0.05)" },
            ],
          },
        },
        data: data.map((item) => item.value),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "300px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
}
