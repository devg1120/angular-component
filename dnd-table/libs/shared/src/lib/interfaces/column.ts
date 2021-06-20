export interface Column {
  headerName: string;
  field: string;
  width?: number;
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  hidden?: boolean;
  sortable?: boolean;
  sortOrder?: SortOrder;
  resizable?: boolean;
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none'
}
