import { ChannelMessage } from './../../models/channel/channel-message.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { Message } from '../../models/messages/message.interface';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(private auth: AuthProvider, private database: AngularFireDatabase) {
  }

  addChannel(channelName: string) {
    this.database.list(`channel-names`).push({name: channelName})
  }

  getChannelListRef(): FirebaseListObservable<any> {//TODO? <Channel>
    return this.database.list(`channel-names`);   
  }

  getChannelChatRef(channelKey: string) {
    return this.database.list(`channels/${channelKey}`);
  }

  async sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
    await this.database.list(`channels/${channelKey}`).push(message);
  }

  async sendChat(message: Message) {
    await this.database.list(`messages`).push(message);

  }

  getChats(userTwoId: string) {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(uid => this.database.list(`user-messages/${uid}/${userTwoId}`))
      .mergeMap(chats => {
        return Observable.forkJoin(
          chats.map(chat => this.database.object(`messages/${chat.$key}`).first()),
          (...vals: Message[]) => {
            console.log(vals);
            return vals;
          }
        )
      })
  }

  getLastMessagesForUser(): Observable<Message[]> {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(authId => this.database.list(`last-messages/${authId}`))
      .mergeMap(messageIds => {
        return Observable.forkJoin(
          messageIds.map(message => {
            return this.database.object(`messages/${message.key}`).first()              
          }),
          (...vals: Message[]) => {
            return vals;
          }
        )
      })
  }
}
