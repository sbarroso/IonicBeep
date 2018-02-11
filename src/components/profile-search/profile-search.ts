import { DataProvider } from './../../providers/data/data';
import { Component, EventEmitter, Output } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the ProfileSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-search',
  templateUrl: 'profile-search.html'
})
export class ProfileSearchComponent {

  query: string;

  profileList: Profile[];

  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private data: DataProvider) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  selectProfile(profile: Profile) {
    this.selectedProfile.emit(profile);
  }

  searchUser(query: string) {
    const trimmedQuery = query.trim();

    if (trimmedQuery === query) {
      this.data.searchUser(query).subscribe(profiles => {
        console.log('profiles found:', profiles)
        this.profileList = profiles;
      })
    }
  }

}
