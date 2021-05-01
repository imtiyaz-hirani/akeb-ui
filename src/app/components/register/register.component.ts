import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user.model';
import {RegisterService} from '../../service/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  //Roles: any = ['Admin', 'Author', 'Reader'];
  registrationForm: FormGroup;
  token: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  user : IUser = {};
  constructor(private _registerService: RegisterService,private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit() {
    this.addRecaptchaScript();

    this.registrationForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required,
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),

          ]),
        }
    );

  }

  OnFormSubmit() {
    if(this.token === ''){
      this.openSnackBar();
  }
  else{
      //check if the user exists
     this._registerService.checkIfEmailExists(this.registrationForm.value.email)
     .subscribe(_data=>{
      this.user =  _data;
      this._registerService.user$.next(this.user);
      this.route.navigateByUrl('/verify-registration');
     },
     err=>{
      this.user = this.registrationForm.value;
      this._registerService.user$.next(this.user);
      this.route.navigateByUrl('/info');
     });


    }


  }

  addRecaptchaScript() {

    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }

    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptcha(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

  renderReCaptcha() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6Lde3MAaAAAAAJfHpNWiQTIAd6i_DDIpxOFG2lSt',
      'callback': (response) => {
          console.log(response);
          this.token =response;
          let formData: any = new FormData();
          formData.append("secret", "6Lde3MAaAAAAAAeCDgZqhWlVyw0rOvFtR0Ocebev");
          formData.append("response", this.token);

      }
    });
  }

  openSnackBar() {
    this._snackBar.open('please verify that you are not a robot', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
