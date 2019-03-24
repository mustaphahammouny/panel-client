import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit {

  id: string = '';

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

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getClient();
  }

  getClient() {
    this.clientService.getClient(this.id).subscribe((res: Client) => {
      this.myClient = res;
    });
  }

}
