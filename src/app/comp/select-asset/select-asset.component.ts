import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from 'src/app/services/pages/attendance.service';

@Component({
  selector: 'app-select-asset',
  templateUrl: './select-asset.component.html',
  styleUrls: ['./select-asset.component.scss'],
})
export class SelectAssetComponent implements OnInit {

  allEmp :any = [];
  selectIndex;
  constructor(
    private mdl: ModalController,
    private att: AttendanceServiceService,
  ) {  
    this.att.assetList().subscribe(data=>{
      if(data.length > 100){
        this.allEmp =  data.splice(0,100);
      }else{
        this.allEmp = data;
      }
      console.log(this.allEmp);
    })
  }

  ngOnInit() {}

  closeModel(){
    this.mdl.dismiss();
  }
  chnageRadio(){
    this.mdl.dismiss(this.allEmp[this.selectIndex],'ok');
  }
}
