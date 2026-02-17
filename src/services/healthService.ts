import { hermesClient } from "../clients/hermesClient";
import { healthMapper } from "../mappers/healthMapper";
import type { Health, HealthDTO } from "../types/healthTypes";

export const healthService = {
  async checkHealth(): Promise<Health> {
    const dto = await hermesClient.get("health").json<HealthDTO>();
    return healthMapper.toDomain(dto);
  },
};
