import { Injectable }  from '@angular/core';
import { ApiService } from '../../app/services/api.service';

@Injectable()
export class UserService {
    private _id: any;
    //private _webinar_form_assessed: any;

    constructor(
        public apiService: ApiService
    ) {
        this._id = localStorage.getItem('userID') ? localStorage.getItem('userID') : null;
    }

    get userId(){
        return this._id;
    }

    set userId(id){
        localStorage.setItem('userID',id);
    }

    userWebinarFormAssessed(status){
        localStorage.setItem('user_webinar_form_assessed',status);
    }

    getUserWebinarFormAssessed(){
        return localStorage.getItem('user_webinar_form_assessed');
    }

}