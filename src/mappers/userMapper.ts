import type { UserMetadata, UserMetadataDTO } from "@/types/userTypes";

export const userMapper = {
  toUserMetadata(dto: UserMetadataDTO): UserMetadata {
    return {
      email: dto.email,
      name: dto.name,
      avatar: dto.avatar_url,
    };
  },
};
