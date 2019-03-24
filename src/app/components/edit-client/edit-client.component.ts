import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  contacts = [
    {id: 1, label: 'Phone'},
    {id: 2, label: 'Email'},
    {id: 3, label: 'SMS'},
  ];

  myClient: Client = {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
    contact: {},
    subscribe: false
  }

  id: string = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getClient();
  }

  getClient() {
    this.clientService.getClient(this.id).subscribe((res: Client) => {
      this.myClient = res;
      console.log(res);
    });
  }

  updateClient() {
    this.myClient.id = this.id;
    this.clientService.updateClient(this.myClient)
    .then(res => {
      this.router.navigate(['/clients']);
    })
    .catch(err => {
      console.log(err.message);
    });
  }

}
