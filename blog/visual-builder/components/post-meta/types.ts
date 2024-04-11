import { type BlogAttrs, type BlogPost } from '@divi/types';


export interface PostMetaProps {
  post: BlogPost;
  enable: {
    author: BlogAttrs['meta']['advanced']['showAuthor'];
    date: BlogAttrs['meta']['advanced']['showDate'];
    categories: BlogAttrs['meta']['advanced']['showCategories'];
    comments: BlogAttrs['meta']['advanced']['showComments'];
  }
}
