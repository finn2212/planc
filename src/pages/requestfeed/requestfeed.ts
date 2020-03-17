import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import * as firestore from 'firebase/app';
import moment from 'moment';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-requestfeed',
  templateUrl: 'requestfeed.html',
})
export class RequestfeedPage {

  text: String ="";
  location: String="";
  posts: any[] = [];
  pageSize: number = 5;
  cursor: any;
  infiniteEvent: any;
  public goalList: any[];
  public loadedGoalList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private loadingController: LoadingController, private toastController: ToastController, 
    // private firestore: AngularFirestore
    ){
    this.getPosts();
  }
  /*
  ngOnInit() {
    this.firestore.collection(`goals`).valueChanges()
      .subscribe(goalList => {
        this.goalList = goalList;
        this.loadedGoalList = goalList;
    });
  }
  

  initializeItems(): void {
    this.goalList = this.loadedGoalList;
  }

  filterList(evt) {
    this.initializeItems();
  
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.goalList = this.goalList.filter(currentGoal => {
      if (currentGoal.goalName && searchTerm) {
        if (currentGoal.goalName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
*/
  getPosts(){
    this.posts = [];

    let loading = this.loadingController.create({
      content: "Laden..."
    })

    loading.present

    let query = firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize);
    
/*     query.onSnapshot((snapshot) => {
      let changeDocs = snapshot.docChanges();

     changeDocs.forEach((change) => {
        if(change.type == "added"){

        }

        if(change.type == "modified"){

        }

        if(change.type == "removed"){

        }
      })
    })
*/
    query.get().then((docs) => {

      docs.forEach((doc) => {
        this.posts.push(doc);
      })
      this.cursor = this.posts[this.posts.length - 1]
      console.log(this.posts)

    }).catch((err) => {
      console.log(err)
    })

  }

  loadMorePost(event) {
    firebase.firestore().collection("posts").orderBy("created", "desc").startAfter(this.cursor)
    .limit(this.pageSize).get().then((docs) => {

      docs.forEach((doc) => {
        this.posts.push(doc);
      })

      console.log(this.posts)

      if(docs.size < this.pageSize){
        event.enable(false);
        this.infiniteEvent = event;
      } else {
        event.complete();
        this.cursor = this.posts[this.posts.length - 1];
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  refresh(event){
    this.posts = [];
    this.getPosts();
    
    if(this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }

    event.complete();
  }

  post(){
    firebase.firestore().collection("posts").add({
      text: this.text,
      location: this.location,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName,
    }).then((doc) => {
      console.log(doc)

      this.getPosts();

    }).catch((err) => {
      console.log(err)
    })
  }

ago(time){
  let difference = moment(time).diff(moment())
  return moment.duration(difference).humanize();
}

}
