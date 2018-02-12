import { ChannelMessage } from './../../models/channel/channel-message.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(private database: AngularFireDatabase) {
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

  sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
    this.database.list(`channels/${channelKey}`).push(message);
  }
}
