export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface LoginResponse {
    access_token: string;
    username: string;
    email: string;
}

export interface SignupReq{
    username: string;
    password: string;
    email: string;
}

export interface SignupRes{
    msg: string;
}