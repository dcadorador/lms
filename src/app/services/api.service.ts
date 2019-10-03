import { Injectable }  from '@angular/core';
import { Headers, Http, RequestOptions }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiService {


    // private apiUrl = 'http://api.lifestreet.local/api';
    private apiUrl = 'https://lifestreetapi.stageserve.com/api';
    // private apiUrl = 'https://api.lifestreet.com.au/api';
    //private apiUrl = 'http://lsapi.app/api';
    // private apiUrl ='https://lifestreet.stageserve.com/wp-json/lifestreet/api/v1';

    constructor(
        private http: Http,
        private authService: AuthService
    ) {

    }
    private requestOptions() {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this.authService.token
        });
        return new RequestOptions({headers : headers});
    }

    handleError(error) {
        console.log(JSON.parse(error._body));
        return Observable.throw(JSON.parse(error._body));
    }

    userProfile(id){
        return this.http.get(`${this.apiUrl}/users/${id}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userForm(id, form){
        return this.http.get(`${this.apiUrl}/users/${id}/forms/${form}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userExisting(id){
        return this.http.post(`${this.apiUrl}/users/${id}/existing`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userPosts(id, type=null){
        if(type){
            return this.http.get(`${this.apiUrl}/users/${id}/posts?type=${type}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
        }
        return this.http.get(`${this.apiUrl}/users/${id}/posts`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userFormResults(id, form){
        //console.log(`${this.apiUrl}/users/${id}/forms/${form}/results`);
        return this.http.get(`${this.apiUrl}/users/${id}/forms/${form}/results`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    trendingPosts(type = null){
        if(type) {
            return this.http.get(`${this.apiUrl}/posts/trending?type=${type}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
        }
        return this.http.get(`${this.apiUrl}/posts/trending`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    userTrendingPosts(id,type=null){
        if(type) {
            return this.http.get(`${this.apiUrl}/users/${id}/posts/featured?type=${type}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
        }
        return this.http.get(`${this.apiUrl}/users/${id}/posts/featured`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    post(id,type = null) {
        if(type) {
            return this.http.get(`${this.apiUrl}/posts/${id}?type=${type}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
        }

        return this.http.get(`${this.apiUrl}/posts/${id}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    postForm(id){
        return this.http.get(`${this.apiUrl}/forms/${id}/meta`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    postFormResponse(id,data){
        const jsonRequest = JSON.stringify(data);
        console.log(jsonRequest);
        return this.http.post(`${this.apiUrl}/forms/${id}`, jsonRequest , this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    postByUrl(url) {
        return this.http.get(`${this.apiUrl}/posts/url?url=${url}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError)
    }

    getForm(id) {
        return this.http.post(`${this.apiUrl}/forms/${id}`,this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    postQuizResponse(id,data){
        const jsonRequest = JSON.stringify(data);
        console.log(jsonRequest);
        return this.http.post(`${this.apiUrl}/forms/${id}/quiz`, jsonRequest , this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    homeSettings(user=null){
        if(user) {
            return this.http.get(`${this.apiUrl}/home/settings?user=${user}`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
        }
        return this.http.get(`${this.apiUrl}/home/settings`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    liteHomeSettings() {
        return this.http.get(`${this.apiUrl}/lite/settings`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    bookingSettings() {
        return this.http.get(`${this.apiUrl}/booking/settings`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    trendingUpdated(){
        return this.http.get(`${this.apiUrl}/posts/trending/updated`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userTrendingUpdated(id){
        return this.http.get(`${this.apiUrl}/users/${id}/posts/trending/updated`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    userTrendingCheck(id) : Promise<any> {
        /*return this.http.get(`${this.apiUrl}/users/${id}/posts/featured/check`, this.requestOptions())
            .toPromise()
            .then(
                response => {
                    localStorage.setItem('user_trending_check',JSON.stringify(response));
                    return response;
                },
                error => {
                    console.log(error);
                }
            )*/
        return new Promise(resolve => {
            this.http.get(`${this.apiUrl}/users/${id}/posts/featured/check`, this.requestOptions())
            .subscribe(
                data => {
                    resolve(JSON.parse(data["_body"]));
                },
                error => {
                    console.log(error);
                }
            )
        });   
    }

    userTools(id){
        return this.http.get(`${this.apiUrl}/users/${id}/tools/featured`, this.requestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCompanyId() {
        let uid = localStorage.getItem('userID')
        return new Promise((res, err) => {
            this.homeSettings(uid).subscribe(
                data => {
                    console.log('sets company id')
                    localStorage.setItem('compId', data.data.company_id)
                    res(data.data.company_id)
                },

                error => {
                    console.log(error);
                    err(error)                    
                }
            )
        })
    }

    clearCache() {
        return new Promise((res, err) => {
            this.http.get(`${this.apiUrl}/clearCache`, this.requestOptions())
            .subscribe(() => { res(true) }, error => { err(error) })
        })
    }

    load() {
        console.log('refreshing from the api');
        this.trendingPosts().subscribe(
            data => {
              localStorage.setItem('trending',JSON.stringify(data));
            },
            error => console.log(error)
          )
          this.trendingPosts('webinar').subscribe(
                data => localStorage.setItem('webinar',JSON.stringify(data)),
                error => console.log(error)
          );
          this.trendingPosts('tool').subscribe(post => {
            this.post(post.data.tool).subscribe(
              data => {
                localStorage.setItem('tool',JSON.stringify(data));
              },
              error => console.log(error)
            )
          });
          this.homeSettings().subscribe(
              data => {
                localStorage.setItem('home_settings',JSON.stringify(data));
              },
              error => console.log(error)
          );
    }

    loadPost() {

        return {

            // info of this post
            info: ($id) => {
                return new Promise((res, err) => {
                    if (!$id || $id === 'undefined' || typeof $id == 'undefined') { 
                        err('info invalid id ' + $id)
                        return
                    }


                    this.clearCache()

                        .then(() => {
                            this.http
                                .get(`${this.apiUrl}/posts/${$id}`, this.requestOptions())
                                .map(response=> response.json())
                                .subscribe(

                                // success to fetch post
                                ({data}) => {
                                    // add localStorage here



                                    let bookcountries = []
                                    let bookfallback = {
                                        method: '',
                                        calendar: '',
                                        text: ''
                                    }

                                    // iterate meta
                                    data.meta.forEach((meta) => {

                                        if (typeof meta.meta_key === 'undefined') {
                                            // do nothing
                                        // store company service
                                        } else if (meta.meta_key === '_company_type_of_service') {
                                            localStorage.setItem('company_service', meta.meta_value)

                                        // for book settings
                                        } else if (meta.meta_key.indexOf('add_country_') === 0) {
                                            
                                            // split to segregate metaKeys
                                            let metaKey = meta.meta_key.split('add_country_')[1]

                                            // get id of country repeater and insert to countries
                                            let id = metaKey.charAt(0)
                                            
                                            // initiate book country id
                                            if (typeof bookcountries[id] === 'undefined') {
                                                bookcountries[id] = {}
                                            }


                                            // to get country
                                            if (metaKey.indexOf('_country') > 0) {
                                                // insert country value
                                                bookcountries[id].country = meta.meta_value
                                            }

                                            // to get method
                                            if (metaKey.indexOf('_booking_method') > 0) {
                                                // insert method value
                                                bookcountries[id].method = meta.meta_value
                                            }

                                            // to get textphone content
                                            if (metaKey.indexOf('_textphone_content') > 0) {
                                                // insert textphone content value
                                                bookcountries[id].text = meta.meta_value
                                            }

                                            // to get calendar link
                                            if (metaKey.indexOf('_calendar_link') > 0) {
                                                // insert textphone content value
                                                bookcountries[id].calendar = meta.meta_value
                                            }


                                            // bookcountries.push(meta)

                                        // otherwise try to check fallback book method
                                        } else if (meta.meta_key === 'booking_method') {
                                            bookfallback.method = meta.meta_value

                                        // check fallback calendar link
                                        } else if (meta.meta_key === 'calendar_link') {
                                            bookfallback.calendar = meta.meta_value

                                        // check fallback textphone content
                                        } else if (meta.meta_key === 'textphone_content') {
                                            bookfallback.text = meta.meta_value
                                        }

                                    })

                                    // console.log('bookcountries : ', bookcountries)

                                    // store bookcountries setting
                                    localStorage.setItem('book_countries_setting', JSON.stringify(bookcountries))
                                    localStorage.setItem('book_fallback_setting', JSON.stringify(bookfallback))
                                    res(data)
                                },

                                // error to fetch post
                                error => {
                                    console.log(error)
                                    err(error)
                                }
                            )
                        })

                        .catch(error => {
                            err(error)
                        })

                })
            },

            // trending post
            trendingPost: () => {
                return new Promise((res, err) => {
                    this.trendingPosts().subscribe(
                        data => {
                            localStorage.setItem('trending',JSON.stringify(data));
                            res(data)
                        },
                        error => {
                            console.log(error)
                            err(error)
                        }
                    )
                })
            },


            // trending webinar
            trendingWebinar: () => {
                return new Promise((res, err) => {
                    this.trendingPosts('webinar').subscribe(
                        data => {
                            localStorage.setItem('webinar',JSON.stringify(data))
                            res(data)
                        },
                        error => {
                            console.log(error)
                            err(error)
                        }
                    );
                })
            },


            // trending tools
            trendingTool: () => {
                return new Promise((res, err) => {
                    this.trendingPosts('tool').subscribe(post => {
                        this.post(post.data.tool).subscribe(
                            data => {
                                localStorage.setItem('tool',JSON.stringify(data));
                                res(data)
                            },
                            error => {
                                console.log(error)
                                err(error)
                            }
                        )
                    });
                })
            }
        }
        
    }

    loadUserContent(id) {
        return new Promise((resolve, error) => {
            return this.homeSettings(id).subscribe(
                data => {
                    localStorage.removeItem('home_settings');
                    localStorage.setItem('home_settings',JSON.stringify(data))

                    Promise.all([
                        new Promise((res, err) => {
                            this.userTrendingPosts(id).subscribe(
                                data => {
                                    localStorage.setItem('user_trending',JSON.stringify(data))
                                    res()
                                },
                                error => {
                                    console.log(error)
                                    err(error)
                                }
                            )  
                        }),
                        new Promise((res, err) => {
                            this.userTrendingPosts(id,'webinar').subscribe(
                                data => {
                                    localStorage.setItem('user_webinar',JSON.stringify(data))
                                    res()
                                },
                                error => {
                                    console.log(error)
                                    err(error)
                                }
                            )
                        }),
                        new Promise((res, err) => {
                            this.userTools(id).subscribe(
                                data => {
                                    localStorage.setItem('user_tool',JSON.stringify(data))
                                    res()
                                },
                                error => {
                                    console.log(error)
                                    err(error)
                                }
                            )
                        }),
                        new Promise((res, err) => {
                            this.userTrendingUpdated(id).subscribe(
                                data => {
                                    localStorage.setItem('user_trending_last_update',JSON.stringify(data.data.trending_updated_date));
                                    res()
                                },
                                error => {
                                    console.log(error)
                                    err(error)
                                }
                            )
                        }),
                    ]).then(() => {
                        resolve(data)
                    })

                },
                err => {
                    console.log(err)
                    error(err)
                }
            )
        });
    }

    deleteStorageData() {
        localStorage.removeItem('trending');
        localStorage.removeItem('webinar');
        localStorage.removeItem('tool');
        localStorage.removeItem('home_settings');
    }

    // get wellbeing minute by user id
    getUserWbMinute(userid){
        return this.http.get(`${this.apiUrl}/wellbeing/user/${userid}`, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    // get specific wellbeing details
    getWellbeingMinute(id, userid) {
        return this.http.get(`${this.apiUrl}/wellbeing/detail/${id}/${userid}`, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    // update specific wellbeing minute status with user
    updateWellbeingMinute(userId, data) {
        return this.http.put(`${this.apiUrl}/wellbeing/user/${userId}`, data, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    // get all wellbeing minute
    wellbeingMinute(){
        return this.http.get(`${this.apiUrl}/wellbeing`, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    // LMS
    getInvitationLMS() {
        return this.http.get(`${this.apiUrl}/lms/invite`, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    acceptInvitationLMS() {
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.put(`${this.apiUrl}/lms/invite/accept`, {
            course_id : course_id
        }, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    declineInvitationLMS() {
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.put(`${this.apiUrl}/lms/invite/decline    `, {
            course_id : course_id
        }, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    getNextLMS(currentContent, params = null) {
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.post(`${this.apiUrl}/lms/next`, {
            course_id : course_id,
            current_content: currentContent,
            params : params
        }, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }

    getLMSReport() {
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.get(`${this.apiUrl}/lms/reports/${course_id}`, this.requestOptions())
                    .map(response => response.json())
                    .catch(this.handleError)
    }

    getLMSResults(lesson_id, entry_id) {
        return this.http.get(`${this.apiUrl}/lms/results/${lesson_id}/${entry_id}`, this.requestOptions())
                    .map(response => response.json())
                    .catch(this.handleError)
    }

    getLMSModuleInfo() {
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.get(`${this.apiUrl}/lms/module/${course_id}`, this.requestOptions())
                    .map(response => response.json())
                    .catch(this.handleError)
    }

    getNotes(){
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.get(`${this.apiUrl}/lms/notes/${course_id}`, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);
    }


    saveNotes(lessonId, lessonNotes){
        let course_id = localStorage.getItem('lms_course_id')
        return this.http.post(`${this.apiUrl}/lms/notes/save`, {
            course_id : course_id,
            lesson_id: lessonId,
            lesson_notes : lessonNotes
        }, this.requestOptions())
        .map(response => response.json())
        .catch(this.handleError);

       
    }
}