import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private config: ConfigService) {
   
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public get login(): string {
    return this.config.SERVER_API + 'registration?op=company_signin&auth=';
  }
  public get assetList(): string {
    return this.config.SERVER_API + 'asset?op=show_AssetsList&auth='+this.getToken();
  }
  public get empList(): string {
    return this.config.SERVER_API + 'employee?op=show_Employees&auth='+this.getToken();
  }
  public get get_nfc(): string {
    return this.config.SERVER_API + 'nfc_api?op=get_nfc&auth='+this.getToken();
  }
  public get uploadToServer(): string {
    return this.config.SERVER_API + 'nfc_api?op=add_nfc&auth='+this.getToken();
  }

  
}

