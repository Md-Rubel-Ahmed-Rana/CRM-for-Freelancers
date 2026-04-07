export type IInteractionType = "CALL" | "MEETING" | "EMAIL" | "OTHER";

export const interactionsTypes = ["CALL", "MEETING", "EMAIL", "OTHER"];

type IClient = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

type IProject = {
  id: string;
  user_id: string;
  client_id: string;
  title: string;
  budget: string;
  deadline: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type IInteraction = {
  id: string;
  user_id: string;
  client_id: string;
  project_id: string;
  type: IInteractionType;
  notes: string;
  date: string;
  created_at: string;
  updated_at: string;
  client: IClient;
  project: IProject;
};

export type IInteractionsResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  traceId: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: IInteraction[];
  };
};

export type ICreateInteractionFormValues = {
  client_id: string;
  project_id?: string;
  type: IInteractionType;
  notes: string;
  date: string;
};
