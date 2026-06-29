// 电影 Mock 数据

export interface Movie {
  id: string;
  name: string;
  boxOffice: number;
  boxOfficeAccum: number;
  marketShare: number;
  seatRate: number;
  showCount: number;
  color: string;
}

export interface DailyBoxOffice {
  date: string;
  value: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    name: "哪吒之魔童闹海",
    boxOffice: 4860,
    boxOfficeAccum: 48200,
    marketShare: 38.5,
    seatRate: 28.3,
    showCount: 9850,
    color: "#ef4444",
  },
  {
    id: "2",
    name: "唐探1900",
    boxOffice: 2350,
    boxOfficeAccum: 28500,
    marketShare: 21.2,
    seatRate: 18.6,
    showCount: 6200,
    color: "#f97316",
  },
  {
    id: "3",
    name: "封神第二部",
    boxOffice: 1580,
    boxOfficeAccum: 18600,
    marketShare: 14.8,
    seatRate: 15.2,
    showCount: 4100,
    color: "#3b82f6",
  },
  {
    id: "4",
    name: "蛟龙行动",
    boxOffice: 680,
    boxOfficeAccum: 8200,
    marketShare: 7.6,
    seatRate: 12.1,
    showCount: 2200,
    color: "#22c55e",
  },
  {
    id: "5",
    name: "熊出没·重启未来",
    boxOffice: 520,
    boxOfficeAccum: 5600,
    marketShare: 5.8,
    seatRate: 22.4,
    showCount: 1800,
    color: "#eab308",
  },
];

export const dailyBoxOffice: DailyBoxOffice[] = [
  { date: "06-23", value: 8200 },
  { date: "06-24", value: 9100 },
  { date: "06-25", value: 8750 },
  { date: "06-26", value: 10200 },
  { date: "06-27", value: 9800 },
  { date: "06-28", value: 10500 },
  { date: "06-29", value: 9990 },
];

export const totalBoxOffice = dailyBoxOffice[dailyBoxOffice.length - 1].value;

export const totalShowCount = movies.reduce((sum, m) => sum + m.showCount, 0);

export const updateTime = new Date().toLocaleString("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
