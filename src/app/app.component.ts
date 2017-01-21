import { Component } from '@angular/core';

import { environment } from '../environments/environment';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.BASE_URL;
  constructor(
    private authService:AuthService
  ){
    // this.authService.signin("admin@admin.admin","admin");
  }
}
