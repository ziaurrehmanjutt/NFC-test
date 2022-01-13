import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SelectAssetComponent } from './comp/select-asset/select-asset.component';
import { FormsModule } from '@angular/forms';
import { WriteNfcComponent } from './comp/write-nfc/write-nfc.component';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { EmpSelectComponent } from './comp/emp-select/emp-select.component';
import { ReadNfcComponent } from './comp/read-nfc/read-nfc.component';
import { TagsOperationsComponent } from './comp/tags-operations/tags-operations.component';
import { ShareMeComponent } from './comp/share-me/share-me.component';

@NgModule({
  declarations: [AppComponent, SelectAssetComponent, WriteNfcComponent, EmpSelectComponent, ReadNfcComponent,TagsOperationsComponent,ShareMeComponent],
  entryComponents: [SelectAssetComponent, WriteNfcComponent, EmpSelectComponent, ReadNfcComponent,TagsOperationsComponent,ShareMeComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NFC, Ndef],
  bootstrap: [AppComponent],

})
export class AppModule { }
