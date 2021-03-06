import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {JwtClientProvider} from "../jwt-client/jwt-client";
import {JwtPayload} from "../../models/jwt-payload";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {UserResourceProvider} from "../user-resource/user-resource";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

    private _user = null;

    constructor(
        public jwtClient: JwtClientProvider,
        public fb: Facebook,
        public userResource: UserResourceProvider
    ) {
        this.user().then((user) => {
            console.log(user);
        })
    }

    //metodo para carregar dados do usuário
    user(): Promise<Object> {
        return new Promise((resolve) => {
            if (this._user) {
                resolve(this._user);
            }
            this.jwtClient.getPayload().then((payload: JwtPayload) => {
                if (payload) {
                    this._user = payload.user;
                }
                resolve(this._user);
            });
        });
    }

    //verifica se usuario está logado
    check(): Promise<boolean> {
        return this.user().then(user => {
            return user !== null;
        })
    }

    //metodo responsavel pelo login
    login({email, password}): Promise<Object> {
        return this.jwtClient.accessToken({email, password})
            .then(() => {
                return this.user();
            })
    }

    //login facebook
    loginFacebook():Promise<string> {
        return this.fb.login(['email'])
            .then((response: FacebookLoginResponse) => {
                let accessToken = response.authResponse.accessToken;
                return this.userResource
                    .register(accessToken)
                    .then(token => this.jwtClient.setToken(token));
            });
    }

    //metodo responsavel pelo logout
    logout() {
        return this.jwtClient.revokeToken().then(() => {
            this._user = null;
        });
    }
}
