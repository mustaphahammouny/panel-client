import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Client } from '../models/client';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients');
  }
  
  getClients() {
    return this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  persistClient(client: Client) {
    return this.clientsCollection.add(client);
  }

  deleteClient(id: string) {
    return this.clientsCollection.doc(id).delete();
  }

  getClient(id: string) {
    return this.clientsCollection.doc(id).valueChanges();
  }

  updateClient(client: Client) {
    return this.clientsCollection.doc(client.id).update(client);
  }

  toggleActive(client) {
    return this.clientsCollection.doc(client.id).update({
      active: !client.active
    });
  }

  getClientsByUser(clientId) {
    return this.afs.collection('clients', ref => {
      return ref.where('clientId', '==', clientId);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
