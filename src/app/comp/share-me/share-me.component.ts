import { Component, NgZone, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-share-me',
  templateUrl: './share-me.component.html',
  styleUrls: ['./share-me.component.scss'],
})
export class ShareMeComponent implements OnInit {

  showError = '';
  isSharing = false;
  constructor(private nfc: NFC,private ndef:Ndef, private mdl: ModalController, private _zone: NgZone,) {
  }

  ngOnInit() { }


  ionViewWillEnter(){
    let com_id =  localStorage.getItem('com_id');
    let str = 'INT-2-0-'+com_id;
    let message = this.ndef.textRecord(str);
    this.isSharing = true;
    this.nfc.addNdefListener().subscribe(x=>{
      if(!this.isSharing){
        return null;
      }
      this.nfc.share([message]).then(x=>{
        console.log(x);
      }).catch(err=>{
        this.showError = JSON.stringify(err);
        console.log(err)
      });

    })
  }
  ionViewWillLeave() {
    this.nfc.unshare();
    console.log('Unshare Called'); this.isSharing = false;
  }

  closeModel() {

    this.mdl.dismiss();
  }

}


