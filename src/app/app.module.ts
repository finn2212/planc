import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/Login/login';
import { SignupPage } from '../pages/signup/signup';
import { RequestfeedPage } from '../pages/requestfeed/requestfeed'
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDbxkrYhAf2ujhoTcQ-GyDQvoOlIV0aoQA",
  authDomain: "projectcapp-301f6.firebaseapp.com",
  databaseURL: "https://projectcapp-301f6.firebaseio.com",
  projectId: "projectcapp-301f6",
  storageBucket: "projectcapp-301f6.appspot.com",
  messagingSenderId: "560544901990",
  appId: "1:560544901990:web:15a495dc5abcc8b88236a7",
  measurementId: "G-NB08V4GCVK"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
  timestampsInSnapshots: true
})

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    RequestfeedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    RequestfeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
