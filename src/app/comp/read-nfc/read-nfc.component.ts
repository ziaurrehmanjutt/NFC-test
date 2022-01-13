import { AttendanceServiceService } from 'src/app/services/pages/attendance.service';
import { ModalController } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { Ndef, NFC } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-read-nfc',
  templateUrl: './read-nfc.component.html',
  styleUrls: ['./read-nfc.component.scss'],
})
export class ReadNfcComponent implements OnInit {

  cardDetails = {
    cardType: '',
    objectID: '',
    objectName: '',
    isValid: false,
    isChanged: false,
  }
  constructor(private mdl: ModalController,
    private nfc: NFC, private ndef: Ndef,
    private _zone: NgZone,
    private api: AttendanceServiceService) { }

  isReading = true;
  tagID = '';
  tagString = 'INT-1-1-1';

  cardType = 1;
  ngOnInit() { }

  closeModel() {
    
    this.mdl.dismiss();
  }


  ionViewWillEnter() {
    this.isReading = true;
    this.readTags();
    this.nfc.addNdefListener().subscribe(data => {
      if (!this.isReading) {
        return;
      }
      console.log(data);
      let TagData = data['tag']['id'];
      if (data['tag'] && data['tag']['ndefMessage'] && data['tag']['ndefMessage']['0'] && data['tag']['ndefMessage']['0']['payload']) {

      } else {
        this._zone.run(() => {
        this.cardType = 2;
        this.isReading = false;
        })
        return;
      }
      let message = data['tag']['ndefMessage']['0']['payload'];
      console.log('message is', message)
      this.tagString = this.nfc.bytesToString(message);
      console.log('string is', this.tagString);
      this.tagID = this.nfc.bytesToHexString(TagData);
      this.isReading = false;
      this.readTags();
    })

  }

  ionViewWillLeave() {
    this.isReading = false;
  }

  readTags() {
    this._zone.run(() => {


      let st = this.tagString;
      if (st) {
        let allArray = st.split("-");

        if (allArray[0] && allArray[0].includes('INT')) {
          this.cardType = 1;
          this.checkFromServer(this.tagID)
          if (allArray[1]) {
            this.cardDetails.cardType = allArray[1];
          }
        } else {
          this.cardType = 3;
        }
      } else {
        this.cardType = 2;
      }
    })
  }

  checkFromServer(id) {
    let frmData = {
      nfc_id: id
    }
    this.api.get_nfc(frmData).subscribe(data => {
      console.log(data);
      if (data == '-1') {
        this.cardDetails.isValid = false
      } else {
        if (data['row']['tag_status'] == '1') {
          this.cardDetails.isValid = true;
        } else {
          this.cardDetails.isValid = false;
        }

        if (data['row']['tag_string'] == this.tagString) {
          this.cardDetails.isChanged = false;
        } else {
          this.cardDetails.isChanged = true;
        }

        if (this.cardDetails.cardType == '1') {
          this.cardDetails.objectName = data['object']['asset_title'];

        } else if (this.cardDetails.cardType == '2') {
          this.cardDetails.objectName = data['object']['emp_name'];

        }
      }
    })
  }
}
