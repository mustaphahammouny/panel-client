import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import toastr from 'toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
    .then(res => {
      this.router.navigate(['/clients']);
    })
    .catch(err => {
      toastr.error(err.message);
    });
  }

  loginWithEmailAndPassword() {
    this.authService.loginWithEmailAndPassword(this.credential)
    .then(res => {
      this.router.navigate(['/clients']);
    })
    .catch(err => {
      toastr.error(err.message);
    });
  }

}
