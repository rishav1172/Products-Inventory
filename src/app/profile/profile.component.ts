import { Component } from '@angular/core';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

// import { type } from 'os';

@Component({ 
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css', '../../assets/css/style.css', '../../assets/fonts/material-icon/css/material-design-iconic-font.min.css'] 
})
export class ProfileComponent {

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }
}