import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login-response.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private toast: ToastController) { }

  register(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: `Account created; ${event.result.email}`,
        duration: 3000
      }).present()
    } else {
      this.toast.create({
        message: `Account not created; ${event.error.message}`,
        duration: 3000
      }).present()
    }
  }

}
