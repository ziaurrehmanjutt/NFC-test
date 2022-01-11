import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readerMode:any = [];
  constructor(
    private data: DataService,
    private nfc: NFC, private ndef: Ndef
  ) { }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  readTag() {

    // Read NFC Tag - Android
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode = this.nfc.readerMode(flags).subscribe(
      tag => console.log(JSON.stringify(tag)),
      err => console.log('Error reading tag', err)
    );
  }


}
