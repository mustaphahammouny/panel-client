import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];
  searchClients: Client[] = [];
  balanceSum: number = 0;
  search: string = '';

  constructor(private clientService: ClientService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.userAuth().subscribe(auth => {
      this.getAllClients(auth.uid);
    });
  }

  getAllClients(clientId) {
    this.clientService.getClientsByUser(clientId).subscribe(
      (res: Client[]) => {
        this.searchClients = this.clients = res;
        this.balanceSum = this.clients.reduce(function (i, client) {
          return i + client.balance;
        }, 0);
      },
      err => {
        console.log(err);
      }
    );
  }

  removeClient(id) {
    this.clientService.deleteClient(id)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  toggleActive(client) {
    this.clientService.toggleActive(client);
  }

  searchClient() {
    if(this.search != '') {
      this.searchClients = this.clients.filter(client => 
        client.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
        client.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
        client.email.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.searchClients = this.clients;
    }
  }

}
