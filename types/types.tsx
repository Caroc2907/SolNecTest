export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IComment {
  id: string;
  postId: number;
  name: string;
  email: string;
  body: string;
}
