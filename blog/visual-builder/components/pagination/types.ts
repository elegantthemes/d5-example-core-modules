import { type BlogAttrs, type BlogMetadata } from '@divi/types';


export interface PaginationProps {
  metadata: BlogMetadata;
  enable: BlogAttrs['pagination']['advanced']['enable'];
  paged: number;
  onChangePage: (page: number) => void;
}
