import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private auth: AuthProvider,private navCtrl: NavController) {
  }

  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }

  navigateToEditPage() {
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile })
  }

  signOut() {
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }
}
