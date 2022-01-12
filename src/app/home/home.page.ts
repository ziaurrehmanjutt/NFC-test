import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { NFC, Ndef, NdefRecord } from '@awesome-cordova-plugins/nfc/ngx';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
// var nfc
declare var nfc: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readerMode: any = [];

  readingTag: boolean = false;
  writingTag: boolean = false;
  isWriting: boolean = false;
  ndefMsg: any;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private data: DataService,
    private platform: Platform,
    private nfc: NFC, private ndef: Ndef
  ) {


  }

  ionViewWillEnter() {
    console.log('Enter');
    this.platform.ready().then(() => {

      this.nfc.addNdefListener().subscribe(data=>{
        console.log(data);

        let message = this.ndef.textRecord('hello,world, Again');
        this.nfc.write([message]).then(
          () => {
            console.log('ok')
          },
          error => {
            console.log(error)
          }
        )
      })

      console.log('Ready');
      // this.subscriptions.push(this.nfc.addNdefListener()
      //   .subscribe(data => {
      //     console.log('IK')
      //     console.log(data);
      //     if (this.readingTag) {
      //       let payload = data.tag.ndefMessage[0].payload;
      //       let tagContent = this.nfc.bytesToString(payload).substring(3);
      //       this.readingTag = false;
      //       console.log("tag data", tagContent);
      //     }
      //     else if (this.writingTag) {
      //       if (!this.isWriting) {
      //         this.isWriting = true;
      //         this.nfc.write([this.ndefMsg])
      //           .then(() => {
      //             this.writingTag = false;
      //             this.isWriting = false;
      //             console.log("written");
      //           })
      //           .catch(err => {
      //             this.writingTag = false;
      //             this.isWriting = false;
      //             console.log(err);

      //           });
      //       }
      //     }
      //   },
      //     err => {
      //       console.log(err);
      //     })
      // )
    });

    // this.nfc.addNdefListener().subscribe(data=>{
    //   console.log(data);
    // })




  }
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);

  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  onNfc(nfcEvent) {

    console.log(nfcEvent);

    var message = [
      this.ndef.textRecord("Hello World, OK")
    ];

    this.nfc.write(message);
  }

  async readTag() {

    // Read NFC Tag - Android
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.readerMode =  await this.nfc.readerMode(flags).subscribe(
      tag => {
        
        console.log(JSON.stringify(tag));



        var message: NdefRecord[] = [
          this.ndef.textRecord("Whay You Do this"),
          // this.ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc")
        ];
        this.nfc.write(message).then(x => {
          console.log(x);
        })


        console.log('Write Successful');
      },

      err => console.log('Error reading tag', err)
    )
    console.log('Mode',this.readerMode);
  }

  writeOnTags() {
    var message = [
      this.ndef.textRecord("hello, world"),
      this.ndef.uriRecord("http://github.com/chariotsolutions/phonegap-nfc")
    ];
    this.nfc.write(message).then(x => {
      console.log(x);
    })

  }


  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  readTag1() {
    this.readingTag = true;
  }

  writeTag(writeText: string = "I am Hello") {
    this.writingTag = true;
    this.ndefMsg = this.ndef.textRecord(writeText);
  }



  async writeNfc() {
    this.nfc.addTagDiscoveredListener(() => {
      let message = this.ndef.textRecord('hello,world, Again');
      this.nfc.write([message]).then(
        () => {
          console.log('ok')
        },
        error => {
          console.log(error)
        }
      )
    }, (err) => {
      console.error(err);
    }).subscribe((event) => {
      console.log(event)

    });
  }

}
