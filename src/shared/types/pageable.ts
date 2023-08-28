export interface Pageable<D> {
  offset?: number;
  limit?: number;
  total: number;
  data: D[];
}
