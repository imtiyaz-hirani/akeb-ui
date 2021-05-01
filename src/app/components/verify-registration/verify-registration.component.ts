import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/model/user.model';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.css']
})
export class VerifyRegistrationComponent implements OnInit {

  user : IUser;
  constructor(private _registerService: RegisterService) { }

  ngOnInit(): void {
    this._registerService.user$.subscribe(_data=>{
        this.user = _data;
    });
  }

}
