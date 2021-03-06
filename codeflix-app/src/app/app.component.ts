import { Component, ViewChild } from '@angular/core';
// import { Component } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import {RedirectorProvider} from "../providers/redirector/redirector";

// import { Test } from '../components/test/test';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  user: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public  auth: AuthProvider,
              public riderector: RedirectorProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
      //carrega usuario
      this.auth.user().then(user => {
          this.user = user;
      });

      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngAfterViewInit(){
      //metodo redirecionamento login caso erro token
      this.riderector.config(this.nav);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
      this.auth.logout().then(() => {
         alert('logout com sucesso');
          this.nav.setRoot(LoginPage);
      });
  }
}
