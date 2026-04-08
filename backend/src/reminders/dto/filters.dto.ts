export class GetRemindersFilterDto {
  client?: string;
  project?: string;
  is_completed?: boolean;
  start_date?: string;
  end_date?: string;
}

export const reminderFilterableFields = [
  'client',
  'project',
  'is_completed',
  'start_date',
  'end_date',
];
