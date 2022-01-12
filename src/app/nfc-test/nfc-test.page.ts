import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfc-test',
  templateUrl: './nfc-test.page.html',
  styleUrls: ['./nfc-test.page.scss'],
})
export class NfcTestPage implements OnInit {

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  readTags() {

  }

  async writeTags() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tag Type',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'For Asset',
          value: '1',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'For Employee',
          value: '2',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok',data);
          }
        }
      ]
    });

    await alert.present();
  }

  writeTypeSelect(type){
    if(type == '1'){

    }
  }
  openEmpSelect(){
    
  }


}
