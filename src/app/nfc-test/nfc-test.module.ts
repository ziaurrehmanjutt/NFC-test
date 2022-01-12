import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NfcTestPageRoutingModule } from './nfc-test-routing.module';

import { NfcTestPage } from './nfc-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfcTestPageRoutingModule
  ],
  declarations: [NfcTestPage]
})
export class NfcTestPageModule {}
