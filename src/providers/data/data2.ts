
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
// import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface'
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import {database} from 'firebase'


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  profileObject: FirebaseObjectObservable<any>;

  constructor(private database: AngularFireDatabase, private auth: AuthProvider) {
  }

  searchUser(firstName: string) {
    console.log('searching ', firstName)
    // const query = this.database.list('/profiles', {
    //   query: {
    //     orderByChild: 'firstName',
    //     equalTo: firstName
    //   }
    // })
    // return query.take(1)

      
    const query = this.database.list('/profiles', ref => {
      return ref.orderByChild('firstName')
                .equalTo(firstName)
    })
    return query;
  }

  getAuthenticatedUserProfile() {
    return this.auth.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.database.object(`/profiles/${authId}`))
      .take(1)

    // .mergeMap(authId => this.database.object(`/profiles/${authId}`).valueChanges())//.snapshotChanges())
    // return a//.take(1)
  }

  getProfile(user: User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`, { preserveSnapshot: true })
    return this.profileObject.take(1);
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    try {
      await this.profileObject.set(profile);
      return true
    } catch(e) {
      console.error(e);
      return false;
    }
  }

  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.$key}`);

    // this.database.list(`online-users/${profile.$key}`, ref => {
      try{
        console.log('issssss ', profile)
        ref.update({...profile});
        ref.onDisconnect().remove();
      }catch(e) {
        console.error(e);
      }
      return ref;
    // })
  }

  // AngularFireList vs FirebaseListObservable
  getOnlineUsers(): FirebaseListObservable<Profile[]> {
    return this.database.list(`online-users`);
  }
}
