import {
  type BlogAttrs,
  type BlogPost,
  type Icon,
  type OnOff,
} from '@divi/types';


export interface PostThumbnailProps {
  post: BlogPost;
  showOverlay: OnOff;
  overlayIcon: Icon.Font.AttributeValue;
  enable: BlogAttrs['image']['advanced']['enable'];
}
