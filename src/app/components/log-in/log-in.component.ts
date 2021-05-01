import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user.model';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  registrationForm: FormGroup;
  user : IUser = {};
  successMsg : boolean = false;
  errMsg : boolean = false;
  constructor(private _registerService: RegisterService, private route: Router) { }

  ngOnInit(): void {
    if(this._registerService.user$.getValue() === null){
        this.route.navigateByUrl("/register");
        return;
    }
    this.registrationForm = new FormGroup(
      {
        email: new FormControl({value: this._registerService.user$.getValue().email, disabled: true}),
        name: new FormControl('', [Validators.required,Validators.maxLength(40)]),
        qualification : new FormControl('', [Validators.required,Validators.maxLength(40)])
        }
    );
  }

  OnFormSubmit(){
      this.user = this.registrationForm.value;
      this.user.email = this._registerService.user$.getValue().email;
      console.log(this.user);
      //post user
      this._registerService.postUser(this.user).subscribe(_data=>{
        this._registerService.user$.next(this.user);
        this.successMsg = true;
      } ,
      err=>{
        this.successMsg = false;
        this.errMsg = true;
      });
  }

}
