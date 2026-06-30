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
      <div className="h-[300px] w-full flex items-center justify-center bg-gray-900/50 rounded-lg">
        <span className="text-gray-500 text-sm">暂无数据</span>
      </div>
    );
  }

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(26, 26, 26, 0.95)",
      borderColor: "#374151",
      borderWidth: 1,
      textStyle: {
        color: "#e5e5e5",
      },
      formatter: (params: { name: string; value: number }[]) => {
        const item = params[0];
        return `${item.name}<br/>票房: <strong style="color: #fbbf24">${item.value.toLocaleString()}</strong> 万元`;
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
          color: "#374151",
        },
      },
      axisLabel: {
        color: "#9ca3af",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#9ca3af",
        formatter: (value: number) => `${(value / 1000).toFixed(1)}k`,
      },
      splitLine: {
        lineStyle: {
          color: "#1f2937",
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
          width: 2,
        },
        itemStyle: {
          color: "#fbbf24",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(251, 191, 36, 0.4)" },
              { offset: 0.5, color: "rgba(245, 158, 11, 0.2)" },
              { offset: 1, color: "rgba(245, 158, 11, 0.02)" },
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
