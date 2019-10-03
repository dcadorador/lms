import { Injectable }  from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {

    // private apiUrl = 'http://api.lifestreet.local/api';
    private apiUrl = 'https://lifestreetapi.stageserve.com/api';
    // private apiUrl = 'https://api.lifestreet.com.au/api';
    //private apiUrl = 'http://lsapi.app/api';

    private apiHeaders = new RequestOptions({
        headers : new Headers({
            'Content-Type': 'application/json',
        })
    });

    constructor(
        private http: Http
        //private userService: UserService
    ) {
    }

    token = localStorage.getItem('token');
    user_id = localStorage.getItem('userID');

    get authenticated() {
        return this.token !== null;
    }

    handleError(error) {
        console.log(error);
        return error.status == 0 ? Observable.throw(error) : Observable.throw(JSON.parse(error._body));
    }

    authenticate(username: string, password: string) {
        const json = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(`${this.apiUrl}/login`, json, this.apiHeaders)
            .map(response => {
                this.token = response.json().token;
                localStorage.setItem('token',this.token);
                localStorage.setItem('userID',response.json().data.ID);
                localStorage.setItem('userData',JSON.stringify(response.json().data));
                localStorage.setItem('userProfile',JSON.stringify(response.json().data.profile));
                localStorage.setItem('compId', response.json().data.company_id);
                return response.json();
            })
            .catch(this.handleError);
    }

    logOut() {
        const json = JSON.stringify({
            token: localStorage.getItem('token')
        });

        // even with fail request, local storage must be empty
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userData');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('article');
        localStorage.removeItem('tool');
        localStorage.removeItem('video');
        localStorage.removeItem('username');
        localStorage.removeItem('trending');
        localStorage.removeItem('webinar');
        localStorage.removeItem('user_webinar_form_assessed');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('home_settings');
        localStorage.removeItem('user_trending');
        localStorage.removeItem('user_webinar');
        localStorage.removeItem('user_tool');
        localStorage.removeItem('user_trending_last_update');
        localStorage.removeItem('user_trending_check');
        localStorage.removeItem('company_service');
        localStorage.removeItem('compId');
        localStorage.removeItem('lite_home_settings');
        localStorage.removeItem('book_countries_setting');
        localStorage.removeItem('book_fallback_setting');

        return this.http.post(`${this.apiUrl}/logout`,json, this.apiHeaders)
            .map(response => {
              console.log(response.json());
            })
            .catch(this.handleError);
      }
}