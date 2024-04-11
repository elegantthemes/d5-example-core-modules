import { type BlogAttrs, type BlogPost } from '@divi/types';


export interface ReadMoreProps {
  post: BlogPost;
  enable: BlogAttrs['readMore']['advanced']['enable'];
}
