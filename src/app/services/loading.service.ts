import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
// import { CustomLoaderComponent } from '../shared/custom-loader/custom-loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  static loading;
  static modalLoading;

  constructor(private loadingCtrl: LoadingController , private modalController: ModalController) {
    LoadingService.loading =  this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
    //  translucent: true,
    });

    // LoadingService.modalLoading = this.modalController.create({
    //   cssClass: 'my-custom-modal-css',
    //   component: CustomLoaderComponent
    // });
   }

  async prsentLoading() {
    (await LoadingService.loading).present();
  }

  async closeLoading() {
    (await LoadingService.loading).dismiss();
  }

  async presentModal() {
    (await LoadingService.modalLoading).present();
  }

  async closeModel() {
    (await LoadingService.modalLoading).dismiss();
  }
}
