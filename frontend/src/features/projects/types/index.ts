type TProjectStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

export type IProject = {
  id: string;
  user_id: string;
  client_id: string;
  title: string;
  budget: number | string;
  deadline: string;
  status: TProjectStatus | string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  client?: {
    id: string;
    name: string;
    email?: string;
    company?: string | null;
  };
};

export type TProjectsApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  traceId: string;
  data: {
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: IProject[];
  };
};
