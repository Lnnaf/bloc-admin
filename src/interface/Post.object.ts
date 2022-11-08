import { User } from "./User.object";

export interface Post {
    id: number,
    imageUrl: string,
    title: string,
    urlTitle : string,
    description : string,
    author: User,
    lastModifier: Date
    createdDate: Date,
    postRead: string,
    relativeTime?: string,
    content : string 
}