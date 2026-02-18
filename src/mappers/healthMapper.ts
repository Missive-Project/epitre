import type { HealthDTO, Health } from "../types/healthTypes";

export const healthMapper = {
  toDomain(dto: HealthDTO): Health {
    return {
      status: dto.status === "ok" ? "healthy" : "unhealthy",
      timestamp: new Date(dto.timestamp),
      uptime: dto.uptime,
    };
  },
};
