import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';
import { RequestfeedPage } from '../requestfeed/requestfeed';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public toastController: ToastController) {

  }

  goToSignup(){
    this.navCtrl.push(SignupPage)
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
      console.log(user)
      this.toastController.create({
        message: "Welcome " + user.user.displayName,
        duration: 3000
      }).present();

    this.navCtrl.setRoot(RequestfeedPage)

    }).catch((err) => {
      console.log(err)
      this.toastController.create({
        message: err.message,
        duration: 3000
      }).present();
  })

  }
}
