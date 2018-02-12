import { ChatProvider } from '../../providers/chat/chat';
import { Channel } from '../../models/channel/channel.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ChannelMessage } from '../../models/channel/channel-message.interface';

/**
 * Generated class for the ChannelChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channelMessages: FirebaseListObservable<ChannelMessage[]>;
  channel: Channel

  constructor(private chat: ChatProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.channel = this.navParams.get('channel');
    console.log('ionViewDidLoad ChannelChatPage', this.channel);
    this.channelMessages = this.chat.getChannelChatRef(this.channel.$key);

  }

  sendMessage(content: string) {
    let channelMessage: ChannelMessage = { content }

    this.chat.sendChannelChatMessage(this.channel.$key, channelMessage);

  }

}
