import { Profile } from './../../models/profile/profile.interface';
import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent implements OnInit {

  userProfile: Profile

  loader: Loading;

  constructor(private loading: LoadingController, private data: DataProvider, private auth: AuthProvider) {
    this.loader = this.loading.create({
      content: 'Loading profile...'
    })
  }

  ngOnInit() {
    this.loader.present();
    this.auth.getAuthenticatedUser().subscribe(user => {
      this.data.getProfile(user).subscribe((profile: Profile) => {
        this.userProfile = <Profile>profile.val();
        this.loader.dismiss();
      })
    })
  }

}
