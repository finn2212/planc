import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Alert } from 'ionic-angular';
import firebase from 'firebase';
import { RequestfeedPage } from '../requestfeed/requestfeed';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

name: string = "";
email: string = "";
password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public toastController: ToastController, public alertControler: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

signup(){
  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
    (data) => {
      
      console.log(data)

      let newUser: firebase.User = data.user;
      newUser.updateProfile({
        displayName: this.name,
        photoURL: ""
      }).then((res) => {
        console.log("Profil Update")
      }).catch((err) => {
        console.log(err)
      })
      
      this.alertControler.create({
        title: "Account erstellt",
        message: "Dein Account ist erfolgreich eingerichtet.",
        buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot(RequestfeedPage)
          }
        }
        ]
      }).present();

  }).catch((err) => {
    console.log(err)
    this.toastController.create({
      message: err.message,
      duration: 3000
    }).present();
  })
}

  goToLogin(){
    this.navCtrl.pop();
}
}
