export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  name: string;
  email: string;
  password: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  has_password: boolean;
  auth_provider: string;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
};

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
