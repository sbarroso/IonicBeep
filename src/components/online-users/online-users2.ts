import { NavController } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

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

  userList: FirebaseListObservable<Profile[]> //AngularFireList<Profile[]>;

  constructor(private data: DataProvider, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {
    this.data.getAuthenticatedUserProfile().subscribe((profile) => {
      this.data.setUserOnline(profile);
    })
  }

  getOnlineUsers() {
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile) {
    this.navCtrl.push('MessagePage', { profile })
  }

}
