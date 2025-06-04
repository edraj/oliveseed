export interface IParam {
  page?: string;
  shortname?: string;
  size?: string;
  keyword?: string;
  total?: number;
  sort?: { by: string, order?: string; }; // TODO:
  hasMore?: boolean;
}
