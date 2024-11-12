
export interface LoginInput {
    email: string;
    password: string
  }
  
  export interface RegisterInput {
    username: string;
    email: string
    password: string
  }
  
  export interface RegisterResponse {
    id: number;
    message: string;
  }
  
  export interface LoginToken {
    token: string;
  }