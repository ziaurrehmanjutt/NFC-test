import { AttendanceServiceService } from 'src/app/services/pages/attendance.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, NgZone } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-write-nfc',
  templateUrl: './write-nfc.component.html',
  styleUrls: ['./write-nfc.component.scss'],
})
export class WriteNfcComponent implements OnInit {


  @Input('type') type;
  @Input('dataWrite') dataWrite;
  step = 1; 
  showError = '';
  isForWriting = false;

  constructor(
    private mdlCtrl: ModalController,
    private api : AttendanceServiceService,
    private nfc: NFC, private ndef: Ndef,

    private _zone:NgZone
  ) { }

  ngOnInit() {}

  closeModel(){
      this.mdlCtrl.dismiss();
  }

  ionViewWillEnter(){
    // this.uploadServer(12,'IIB-1-12','636737373');
    // return;
    this.showError = '';

    console.log('tyye is',this.type);
    console.log('data is',this.dataWrite);
    let com_id =  localStorage.getItem('com_id');
    this.isForWriting = true;
    this.nfc.addNdefListener().subscribe(data=>{
      console.log(data);

      let TagData = data['tag']['id'];
      // String s = ;
      let id = this.nfc.bytesToHexString(TagData);
      // console.log('id is',id);
      // this.nfc.bytesToHexString
      // console.log('id is',new String(TagData));
      // console.log(TagData); 
      let objId= '';
      if(this.isForWriting){
        let str = 'INT-'+this.type+'-'
        if(this.type == '1'){
          str += this.dataWrite.asset_table_id
          objId = this.dataWrite.asset_table_id;
        }else if(this.type == '2'){
          str += this.dataWrite.emp_id
          objId = this.dataWrite.emp_id;
        }
        str += '-'+com_id;
        let message = this.ndef.textRecord(str);
        this.nfc.write([message]).then(
          () => {
            this.isForWriting = false;
            console.log('ok, write Complete')
            this.step = 2;  
            this.uploadServer(objId,str,id);
          },
          error => {
            this._zone.run(() => {
              this.showError = error;
              })
            console.log(error)
          }
        )
      }
    })
  }

  ionViewWillLeave(){
    this.isForWriting = false;
  }



  uploadServer(id,string,nfc_id){
      let frmData = {
        nfc_type : this.type,
        object_id : id,
        nfc_string : string,
        nfc_id : nfc_id
      }
      console.log(frmData);

      this.api.uploadToServer(frmData).subscribe(data=>{
        console.log(data);
        this.mdlCtrl.dismiss('','ok');
      })
  }
}
