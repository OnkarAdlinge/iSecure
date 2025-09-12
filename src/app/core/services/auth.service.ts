import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private dataService = inject(DataService);

  loginWithCredentials(data: any) {
    return this.dataService.postData('security/login', data);
  }
}
