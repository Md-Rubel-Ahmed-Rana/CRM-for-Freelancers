export type SessionResponseDto = {
  id: string;
  deviceId: string;
  deviceName: string;
  ipAddress?: string;
  createdAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
  current?: boolean;
};
