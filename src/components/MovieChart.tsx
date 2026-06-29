"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface MovieChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  height?: string;
}

export default function MovieChart({
  data,
  title = "电影数据",
  height = "400px",
}: MovieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      title: {
        text: title,
        left: "center",
        textStyle: {
          color: "#e2e8f0",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      toolbox: {
        feature: {
          saveAsImage: { title: "保存图片" },
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: {
          color: "#94a3b8",
        },
      },
      series: [
        {
          name: "电影数据",
          type: "pie",
          radius: "60%",
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          itemStyle: {
            color: (params: echarts.DefaultLabelFormatterCallbackParams) => {
              const colorList = [
                "#3b82f6",
                "#8b5cf6",
                "#ec4899",
                "#f97316",
                "#eab308",
                "#22c55e",
                "#06b6d4",
                "#6366f1",
              ];
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, title]);

  return <div ref={chartRef} style={{ height, width: "100%" }} />;
}
