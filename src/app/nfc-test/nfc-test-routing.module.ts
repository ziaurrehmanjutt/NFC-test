import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfcTestPage } from './nfc-test.page';

const routes: Routes = [
  {
    path: '',
    component: NfcTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfcTestPageRoutingModule {}
