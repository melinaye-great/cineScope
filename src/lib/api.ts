export interface APIMovie {
  id: string;
  name: string;
  boxOffice: number;
  boxOfficeAccum: number;
  marketShare: number;
  seatRate: number;
  showCount: number;
  color: string;
}

export interface DailyBoxOfficeItem {
  date: string;
  value: number;
}

export interface BoxOfficeResponse {
  movies: APIMovie[];
  dailyBoxOffice: DailyBoxOfficeItem[];
  totalBoxOffice: number;
  totalShowCount: number;
  updateTime: string;
}

const MOCK_DATA: BoxOfficeResponse = {
  movies: [
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
  ],
  dailyBoxOffice: [
    { date: "06-23", value: 8200 },
    { date: "06-24", value: 9100 },
    { date: "06-25", value: 8750 },
    { date: "06-26", value: 10200 },
    { date: "06-27", value: 9800 },
    { date: "06-28", value: 10500 },
    { date: "06-29", value: 9990 },
  ],
  totalBoxOffice: 9990,
  totalShowCount: 24150,
  updateTime: new Date().toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function fetchFromApi(): Promise<BoxOfficeResponse | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/boxoffice`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[API] Failed to fetch box office data:", error);
    return null;
  }
}

export async function fetchBoxOffice(): Promise<BoxOfficeResponse> {
  const apiData = await fetchFromApi();

  if (apiData) {
    return apiData;
  }

  const now = new Date();
  return {
    ...MOCK_DATA,
    updateTime: now.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
