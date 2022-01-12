import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { LoadingService } from './loading.service';
import { AlertsService } from './alerts.service';
import { ToastService } from './toast.service';
import { PostConfigObject } from './endPointsConfigClasses';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer '+'ea25dc52edaad7f2c4df1687cde5781da60dc91d'
    }),
  };
  constructor(
    private http: HttpClient,
    private api: ConfigService,
    private loadingLoader: LoadingService,
    private showAlerts: AlertsService,
    private toast: ToastService
  ) {
    this.apiUrl = api.SERVER_API;
  }

  setToken(postObject) {
    let token = localStorage.getItem('dol_token');
    if(postObject.API && postObject.API == 1){
      this.httpOptions.headers = new HttpHeaders({
        'DOLAPIKEY':  token,
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin":"true",
      });
    }else{
      this.httpOptions.headers = new HttpHeaders({
       // 'Accept': 'application/json',
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin":"true"
      });

      //this.httpOptions.headers = new HttpHeaders();
    }

  }
  commonPost(dataObject: any, postObject : PostConfigObject): Observable<any> {
    this.setToken(postObject);
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }

    console.log(this.httpOptions);
    console.log(dataObject);
    const apiResponse = new Observable((observer) => {
      this.http
        .post(this.makeUrl(postObject, false), dataObject, this.httpOptions)
        .subscribe(
          (response) => {
            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            if (response && response['error']) {
              this.showAlerts.showAlertNormal(
                response['error'],
                response['message'] || response['error_description']
              );
              this.toast.ErrorToast('Try Again', 1500);
            }
            console.log(response);
            observer.next(response);
          },
          (error) => {
            if (postObject.showError) {
              if (error.error && error.error.error && error.error.error.code && (error.error.error.code == 400 || error.error.error.code == 500)) {
                this.showAlerts.showAlertNormal(
                  'Error in Request',
                  error.error.error.message
                );
              }else if(error.error && error.error.message){
                this.showAlerts.showAlertNormal(
                  'Error in Request',
                  error.error.message
                );
              } else {
                this.showAlerts.showAlertNormal(
                  'Connection Error!',
                  'SomeThing Went Wrong!'
                );
              }
            }

            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            console.log(error);
            observer.error(error);
          }
        );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  commonPut(dataObject: any, postObject): Observable<any> {
    this.setToken(postObject);
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http
        .put(this.makeUrl(postObject, false), dataObject, this.httpOptions)
        .subscribe(
          (response) => {
            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            if (response && response['error']) {
              this.showAlerts.showAlertNormal(
                response['error'],
                response['message']
              );
              this.toast.ErrorToast('Try Again', 1500);
            }
            console.log(response);
            observer.next(response);
          },
          (error) => {
            if (postObject.showError) {
              console.log('Error',error);
              console.log('Error Staus',);

              if (error.status && error.status == 400) {
                this.showAlerts.showAlertNormal(
                  'Error in Request',
                  error.error.error.message
                );
              } else if(error.status == 401) {
                this.showAlerts.showAlertNormal(
                  'Authorization Error!',
                  'Any Issue in your posted Form!'
                );
              } else {
                this.showAlerts.showAlertNormal(
                  'Connection Error!',
                  'Error in Connection to Server!'
                );
              }
            }
            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            console.log(error);
            observer.error(error);
          }
        );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  commonDelete(postObject): Observable<any> {
    this.setToken(postObject);
    // console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http.delete(this.makeUrl(postObject, true), this.httpOptions).subscribe(
        (response) => {
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if (response && response['error']) {
            this.showAlerts.showAlertNormal(
              response['error'],
              response['message']
            );
          }
          console.log(response);
          observer.next(response);
        },
        (error) => {
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if (postObject.showError) {
            if (error.error &&  error.error.error && error.error.error.code && error.error.error.code == 400) {
              this.showAlerts.showAlertNormal(
                'Error in Request',
                error.error.error.message
              );
              console.log(error)
            } else {
              this.showAlerts.showAlertNormal(
                'Connection Error!',
                'Error in Connection to Server!'
              );
            }
          }
          console.error(error);
          observer.error(error);
        }
      );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  
  commonGet(postObject): Observable<any> {
    this.setToken(postObject);
    // console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http.get(this.makeUrl(postObject, true), this.httpOptions).subscribe(
        (response) => {
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if (response && response['error']) {
            this.showAlerts.showAlertNormal(
              response['error'],
              response['message']
            );
          }
          console.log(response);
          observer.next(response);
        },
        (error) => {
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if (postObject.showError) {
            if (error.error &&  error.error.error && error.error.error.code == 404) {
              this.showAlerts.showAlertNormal(
                'Response Back',
                error.error.error.message
              );
              console.log(error)
            } else {
              this.showAlerts.showAlertNormal(
                'Response Back!',
                ' Error in Connection to Server!'
              );
            }
          }
          console.error(error);
          observer.error(error);
        }
      );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  getUserToken() {
    var allToken = localStorage.getItem('token');
    if (allToken) {
      var tokenObject = JSON.parse(allToken);
      return tokenObject.access_token;
    }
  }
  makeUrl(postObject, isGet: boolean): string {
    this.apiUrl = postObject.endPointUrl;
    return this.apiUrl;
  }
}
