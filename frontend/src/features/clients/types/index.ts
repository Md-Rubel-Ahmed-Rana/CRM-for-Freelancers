export type IClient = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  _count: {
    projects: number;
    interactionLogs: number;
    reminders: number;
  };
};

export type IClientDropdown = {
  id: string;
  name: string;
};

export type IClientFormValues = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
};
