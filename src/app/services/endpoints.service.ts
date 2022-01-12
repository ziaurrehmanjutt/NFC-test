import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private config: ConfigService) {
   
  }

  /////Authus Command API
  public get loginUser(): string {
    return this.config.SERVER_API + 'login';
  }
  public get companyDetail(): string {
    return this.config.SERVER_API + 'multicompaniesapi/my_company';
  }

 
}

