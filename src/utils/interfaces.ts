export interface bodyArticleEdit {
  title?: string;
  description?: string;
}

export interface payloadJwt {
  isAdmin: boolean;
  userName: string;
  id: number | string;
  email: string;
  password?: string;
}
