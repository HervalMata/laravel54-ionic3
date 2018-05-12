import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Test } from '../components/test/test';
import {LoginPage} from "../pages/login/login";
import {Http, HttpModule} from "@angular/http";
import { JwtClientProvider } from '../providers/jwt-client/jwt-client';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import { AuthProvider } from '../providers/auth/auth';
import {Env} from "../models/env";

declare var ENV:Env;

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        Test,
        LoginPage
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
            driverOrder: ['localstorage']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        Test,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        JwtClientProvider,
        JwtHelper,
        AuthProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {
            provide: AuthHttp,
            deps: [Http, Storage],
            useFactory(http, storage){
                let authConfig = new AuthConfig({
                    headerPrefix: 'Bearer',
                    noJwtError: true,
                    noClientCheck: true,
                    tokenGetter: (() => storage.get(ENV.TOKEN_NAME))
                });
                return new AuthHttp(authConfig, http);
            }
        }
    ]
})
export class AppModule {}
