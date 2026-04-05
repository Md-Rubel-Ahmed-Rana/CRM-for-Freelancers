export type ISession = {
  id: string;
  deviceId: string;
  deviceName: string;
  ipAddress: string;
  createdAt: string;
  lastActiveAt: string;
  expiresAt: string;
  status: "active" | "revoked" | "expired";
};
