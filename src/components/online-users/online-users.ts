import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the OnlineUsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.html'
})
export class OnlineUsersComponent implements OnInit {

  userList: FirebaseListObservable<Profile[]>;

  constructor(private data: DataProvider) {
  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      // Set the user online within firebase
      this.data.setUserOnline(profile);
    })
  }

  getOnlineUsers() {
    this.userList = this.data.getOnlineUsers();
  }

}
