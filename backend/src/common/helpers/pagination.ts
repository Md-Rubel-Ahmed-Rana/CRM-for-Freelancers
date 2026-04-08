export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

type IReturnOptions = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

const calculatePagination = (options: IPaginationOptions): IReturnOptions => {
  const page = Number(options?.page || 1);
  const limit = Number(options?.limit || 10);
  const sortBy = options.sortBy || 'created_at';
  const sortOrder = options.sortOrder || 'desc';

  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
