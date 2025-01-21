export type Pagination<T> = {
  totalCount: number;
  perPageCount: number;
  items: T[];
};

export type Collection<T> = {
  items: T[];
};
