export class GetProjectsFilterDto {
  status?: string;
  client?: string;
  budget?: number;
  deadline?: Date;
}

export const projectFilterableFields = [
  'status',
  'client',
  'budget',
  'deadline',
];
