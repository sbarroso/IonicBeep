import { Profile } from './../../models/profile/profile.interface';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  public userProfile: Profile

  private loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(private loading: LoadingController, private data: DataProvider) {

    this.existingProfile = new EventEmitter<Profile>()
    this.loader = this.loading.create({
      content: 'Loading profile...'
    })
  }

  ngOnInit() {
    this.loader.present();

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = profile;
      this.existingProfile.emit(this.userProfile);
      this.loader.dismiss();
    })
  }

}
