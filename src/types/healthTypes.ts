export interface HealthDTO {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface Health {
  status: "healthy" | "unhealthy";
  timestamp: Date;
  uptime: number;
}
