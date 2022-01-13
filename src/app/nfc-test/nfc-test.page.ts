import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from '../services/pages/attendance.service';
import { SelectAssetComponent } from '../comp/select-asset/select-asset.component';
import { WriteNfcComponent } from '../comp/write-nfc/write-nfc.component';
import { EmpSelectComponent } from '../comp/emp-select/emp-select.component';
import { ReadNfcComponent } from '../comp/read-nfc/read-nfc.component';
import { TagsOperationsComponent } from '../comp/tags-operations/tags-operations.component';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { ShareMeComponent } from '../comp/share-me/share-me.component';


@Component({
  selector: 'app-nfc-test',
  templateUrl: './nfc-test.page.html',
  styleUrls: ['./nfc-test.page.scss'],
})
export class NfcTestPage implements OnInit {

  isLogin = true;
  isEnable = false;
  constructor(
    private alertController: AlertController,
    private att: AttendanceServiceService,
    private modalCtrl: ModalController,
    private platform: Platform,

    private nfc: NFC,
  ) {
    let frmData = {
      person_email: 'adnan@gmail.com',
      password: 'admin123'
    }
    this.att.login(frmData).subscribe(data => {
      let token = data['logedin_Tokken'];
      let com_id = data['logedInUser']['comp_id'];
      console.log(token);
      localStorage.setItem('token', token);
      localStorage.setItem('com_id', com_id);
      this.isLogin = true;
    })
  }

  ngOnInit() {
  }

  readTags() {
    this.modalCtrl.create({
      component: ReadNfcComponent,
      componentProps: {
        thisFrom: 'addNew'
      }
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {
      console.log(resultdata);
      if (resultdata.role == 'ok') {
        this.writeNFC('1', resultdata.data)
      }
      // this.refreshData();
    });
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
            this.writeTypeSelect(data)
            console.log('Confirm Ok', data);
          }
        }
      ]
    });

    await alert.present();
  }

  writeTypeSelect(type) {
    if (type == '1') {
      this.openAssetSelect();
    }
    else if (type == '2') {
      this.openEmpSelect();
    }
  }
  openEmpSelect() {
    // this.writeNFC('2',{emp_name:'Title','emp_id': 10});
    // return;
    this.modalCtrl.create({
      component: EmpSelectComponent,
      componentProps: {
        thisFrom: 'addNew'
      }
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {
      console.log(resultdata);
      if (resultdata.role == 'ok') {
        this.writeNFC('2', resultdata.data)
      }
      // this.refreshData();
    });
  }
  openAssetSelect() {
    // this.writeNFC('1',{asset_title:'Title','asset_table_id': 10});
    // return;
    this.modalCtrl.create({
      component: SelectAssetComponent,
      componentProps: {
        thisFrom: 'addNew'
      }
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {
      console.log(resultdata);
      if (resultdata.role == 'ok') {
        this.writeNFC('1', resultdata.data)
      }
      // this.refreshData();
    });
  }

  writeNFC(type, dataWrite) {
    this.modalCtrl.create({
      component: WriteNfcComponent,
      componentProps: { type, dataWrite }
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {
      console.log(resultdata);
      // this.refreshData();
    });
  }

  makeReadonly(type) {
    this.modalCtrl.create({
      component: TagsOperationsComponent,
      componentProps: { type }
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {
      console.log(resultdata);
      // this.refreshData();
    });
  }

  ionViewWillEnter() {
    console.log('Enter');
    this.platform.ready().then(async () => {
       let x = await this.nfc.enabled().then(y=>{
        this.isEnable = true;
       }).catch(e=>{
        this.isEnable = false;
        console.log('Error is', e);
       });

    }); 
  }
  shareMe() {
    this.modalCtrl.create({
      component: ShareMeComponent
    }).then(modelel => {
      modelel.present();
      return modelel.onDidDismiss();
    }).then(resultdata => {

    });
  }

  
  refresh(ev) {
    this.ionViewWillEnter()
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);

  }


}
