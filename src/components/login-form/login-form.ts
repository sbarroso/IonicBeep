import { AuthProvider } from './../../providers/auth/auth';
import { LoginResponse } from './../../models/login/login-response.interface';
import { Account } from './../../models/account/account.interface';
import { Component, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  @Output() loginStatus: EventEmitter<LoginResponse>

  account = {} as Account;

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async login() {
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account)
    this.loginStatus.emit(loginResponse);
  }

  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

}
