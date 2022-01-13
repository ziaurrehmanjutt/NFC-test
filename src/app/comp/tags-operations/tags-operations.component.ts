import { ModalController } from '@ionic/angular';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-tags-operations',
  templateUrl: './tags-operations.component.html',
  styleUrls: ['./tags-operations.component.scss'],
})
export class TagsOperationsComponent implements OnInit {

  @Input('type') type;
  showError = '';
  constructor( private nfc: NFC, private mdl: ModalController,private _zone: NgZone,) { 

    this.nfc.addNdefListener().subscribe(data=>{

      if(this.makeReadonly){
        this.nfc.makeReadOnly().then(result=>{
          console.log(result);
          this.showError = '';
          this.closeModel();
        }).catch(err=>{
          this._zone.run(()=>{
            this.showError = JSON.stringify(err);
          })
          console.log(this.showError);
        });
      }
      else if(this.makeBlank){
        this.nfc.erase().then(result=>{
          console.log(result);
          this.showError = '';
          this.closeModel();
        }).catch(err=>{
          this._zone.run(()=>{
            this.showError = JSON.stringify(err);
          })
          console.log(this.showError);
        });
      }
    })


   }

  makeBlank = false;
  makeReadonly = false;
  ngOnInit() {}
  
  ionViewDidEnter(){
    if(this.type == '1'){
      this.makeReadonly = true;
    }else if(this.type == '2'){
      this.makeBlank = true;
    }
  }
  ionViewWillLeave(){      
    this.makeReadonly = false;
    this.makeBlank = false;
  }

  closeModel() {
    
    this.mdl.dismiss();
  }
} 
