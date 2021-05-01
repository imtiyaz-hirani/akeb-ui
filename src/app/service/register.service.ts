import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {ICaptchaResponse, IUser} from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user : IUser;
  public user$ = new BehaviorSubject<IUser>(null);
  constructor(private http : HttpClient) { }

  fetchDetails(email : string) : IUser{
    return null;
  }

  verifyCaptcha(formData : FormData) : Observable<ICaptchaResponse>{
    return this.http.post<ICaptchaResponse>('https://www.google.com/recaptcha/api/siteverify', formData);
  }

  checkIfEmailExists(email: string) : Observable<IUser>{
     //call api and verify
    return  this.http.get<IUser>('https://akeb.herokuapp.com/user/' + email);
    //  let res : IUser =  {
    //    "id" : 1,
    //    "name" : "imt",
    //    "email" : "a@b.com",
    //    "qualification" : "BE"
    //  };
    //  return res;
  }

  postUser(user: IUser) : Observable<any>{
    return this.http.post<any>('https://akeb.herokuapp.com/user/webinar/register',user);
  }

}
