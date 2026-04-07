export type IReminder = {
  id: string;
  user_id: string;
  client_id: string;
  project_id: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  client?: {
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
  project?: {
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
};

export type IReminderApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  traceId: string;
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
    };
    data: IReminder[];
  };
};

export type ICreateReminderFormValues = {
  client_id: string;
  project_id?: string;
  title: string;
  description: string;
  due_date: string;
  is_completed: boolean;
};
