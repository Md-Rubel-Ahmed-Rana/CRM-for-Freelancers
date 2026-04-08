export class GetInteractionsFilterDto {
  client?: string;
  project?: string;
  type?: 'CALL' | 'MEETING' | 'EMAIL' | 'OTHER';
  start_date?: string;
  end_date?: string;
}

export const interactionFilterableFields = [
  'client',
  'project',
  'type',
  'start_date',
  'end_date',
];
