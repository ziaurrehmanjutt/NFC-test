import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendanceServiceService } from 'src/app/services/pages/attendance.service';

@Component({
  selector: 'app-emp-select',
  templateUrl: './emp-select.component.html',
  styleUrls: ['./emp-select.component.scss'],
})
export class EmpSelectComponent implements OnInit {

  allEmp :any = [];
  selectIndex;
  constructor(
    private mdl: ModalController,
    private att: AttendanceServiceService,
  ) {  
    this.att.empList().subscribe(data=>{
      console.log(data);
      if(data.length > 100){
        this.allEmp =  data.splice(0,100);
      }else{
        this.allEmp = data;
      }
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
