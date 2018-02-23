import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  private user: Observable<firebase.User>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth: AngularFireAuth,
  public viewCtrl: ViewController,
  public alertCtrl: AlertController) {
  }

  createUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.email,
      this.password
    ).then(user => {
      this.viewCtrl.dismiss();
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'ユーザー作成エラー',
        subTitle: 'ユーザー作成が出来ませんでした。',
        buttons: ['OK']
      });

      alert.present();
    });
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.email,
      this.password
    ).then(user => {
      this.viewCtrl.dismiss();
    }).catch(err => {
      let alert = this.alertCtrl.create({
        title: 'ログインエラー',
        subTitle: 'ログインできませんでした。',
        buttons: ['OK']
      });

      alert.present();
    })
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
