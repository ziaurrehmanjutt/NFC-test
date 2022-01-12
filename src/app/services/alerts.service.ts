import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private alertController: AlertController , private toastController: ToastController) { }

  async showAlertNormal(title, messageOb) {
    const alert = await this.alertController.create({
      header: title,
      // subHeader: 'Subtitle',
      message: messageOb,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async SuccessToast(msg: string, durationMs: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: durationMs,
      cssClass: 'successToast',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark',
          // text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async ErrorToast(msg: string, durationMs: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: durationMs,
      cssClass: 'failedToast',
      buttons: [
        {
          side: 'start',
          icon: 'bug',
          // text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
