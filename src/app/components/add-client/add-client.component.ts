import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  contacts = [
    {id: 1, label: 'Phone'},
    {id: 2, label: 'Email'},
    {id: 3, label: 'SMS'},
  ];

  myClient: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
    contact: {},
    subscribe: false,
    clientId: ''
  }

  constructor(private clientService: ClientService, private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userAuth().subscribe(auth => {
      this.myClient.clientId = auth.uid;
    });
  }

  createClient() {
    this.clientService.persistClient(this.myClient)
    .then((res) => {
      this.router.navigate(['/clients']);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

}
