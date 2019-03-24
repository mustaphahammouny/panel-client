import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { toastr } from 'toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credential = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  createUser() {
    this.authService.createUser(this.credential)
    .then(res => {
      toastr.success('Your registration was finished successfully');
    })
    .catch(err => {
      toastr.error(err.message);
    });
  }

}
