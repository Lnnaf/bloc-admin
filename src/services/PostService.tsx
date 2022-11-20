import axios from "axios";

import { TimeHelper } from "../helper/TimeHelper";
import { Post } from "../interface/Post.object";

export default class PostService {
  getAll(): Promise<Post[]> {
    return axios.get("http://localhost:8080/api/v1/post/posts").then((res) => res.data);
  }

  updatePost(post: any): Promise<Post[]> {
    return axios.put("http://localhost:8080/api/v1/post/update", post).then((res) => res.data);
  }

  createPost(post: any): Promise<Post[]> {
    return axios.post("http://localhost:8080/api/v1/post/create", post).then((res) => res.data);
  }

  deletePost(id: any): Promise<Post[]> {
    return axios.delete(`http://localhost:8080/api/v1/post/delete/${id}`)
      .then((res) => res.data)
      .catch((err) => {
       console.log(err);
       
      });
  }


  convert(posts: Post[]): any[] {
    return posts.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        createdDate: item.createdDate,
        lastModifier: item.lastModifier,
        author: item.author != null ? item.author.displayName : "",
        thumbnailUrl: item.thumbnailUrl || "",
        content: item.content,
        tags: item.tags
      }
    });

  }
}
