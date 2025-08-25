export interface Board {
  bid: string;
  name: string;
  rowsForPage: number;
  pageCount: number;
  skin: string;
  category: string;
  active: boolean;
  editor: boolean;
  imageUpload: boolean;
  attachFile: boolean;
  comment: boolean;
  // AuthorityEntity_seul에서 상속받는 필드들도 있을 것
}

export interface Boards {
  items: Board[];
  pagination?: any;
  totalCount?: number;
}