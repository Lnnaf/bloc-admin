import { PostTag } from "./Tag.object";
import { User } from "./User.object";

export interface Post {
  id?: number | null;
  thumbnailUrl?: string;
  title?: string;
  urlTitle?: string;
  description?: string;
  author?: User;
  lastModifier?: string | null;
  createdDate?: string;
  postRead?: string | null;
  relativeTime?: string | null;
  content?: string;
  tags?: PostTag[];
}
