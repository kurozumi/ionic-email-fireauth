import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  talks: Observable<any[]>;
  talksRef: AngularFireList<any>;
  content: string;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase,
  public modalCtrl: ModalController,
  private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if(!user) {
        let contactModal = this.modalCtrl.create(LoginPage);
        contactModal.present();
      }
      this.talksRef = db.list('talks');
      this.talks = this.talksRef.valueChanges();      
    })
    
  }

  addTalk() {
    this.talksRef.push({
      name: "名無しさん",
      content: this.content
    });
    this.content = "";
  }
}
