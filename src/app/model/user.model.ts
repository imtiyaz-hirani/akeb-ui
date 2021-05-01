export interface IUser{
  id? : number;
  email? : string;
  name?: string;
  qualification?: string;
}


export interface ICaptchaResponse{
    success?: boolean,
    challenge_ts?: string
    hostname?: string
}
