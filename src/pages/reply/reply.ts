import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import firebase from 'firebase';
import * as firestore from 'firebase/app';

@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {
  text: string = "";
  email: string = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController, public alertControler: AlertController) { 
    }

  antwortAbschicken(){
firebase.firestore().collection("responses").add({
  text: this.text,
  email: this.email,
}).then((doc) => {
  console.log(doc)
}).catch((err) => {
  console.log(err)
})
  }
}
