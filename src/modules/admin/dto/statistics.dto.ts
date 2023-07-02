export interface StatisticsCard {
  title: string;
  desc: string;
  value: string;
  data: number;
}
export interface Leaderboard {
  name: string;
  bookedSlot: number;
  unbookedSlot: number;
  cancelled: number;
  occupancy: number;
}

export interface LeaderGraph {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}

export interface AdminStatistics {
  bookedOccupancy: StatisticsCard;
  leaderboard: Leaderboard[];
  leaderGraph: LeaderGraph[];
}
