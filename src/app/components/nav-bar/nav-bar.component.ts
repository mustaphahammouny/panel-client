import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import toastr from 'toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loggedIn = null;

  ngOnInit() {
    this.authService.userAuth().subscribe(auth => {
      this.loggedIn = auth;
    });
  }

  logOut() {
    this.authService.logOut()
    .then(res => {
      this.router.navigate(['/login']);
    })
    .catch(err => {
      toastr.error(err.message);
    });
  }
}
