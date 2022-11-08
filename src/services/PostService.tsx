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
    return axios.delete(`http://localhost:8080/api/v1/post/delete/${id}`).then((res) => res.data);
  }


  prepareDataForTable(posts: Post[]):any[]{
    
    const timeHelper = new TimeHelper();
    return posts.map((item) =>{
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        createdDate: item.createdDate != null ? timeHelper.convertHumanTime(item.createdDate): "",
        lastModifier: item.lastModifier != null ? timeHelper.convertHumanTime(item.lastModifier) :"",
        author: item.author.displayName
      }
    });
     
  }
}
