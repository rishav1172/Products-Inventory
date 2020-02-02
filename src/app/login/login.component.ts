import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '@app/_services';
// import { type } from 'os';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['../../assets/css/style.css', '../../assets/fonts/material-icon/css/material-design-iconic-font.min.css']   
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
    ) { 
        // redirect to home if already logged in
        route.queryParams.subscribe( val => {
            this.returnUrl = val.returnUrl || '/';
        })
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate([this.returnUrl]);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error('Username or Password is incorrect');
                    this.loading = false;
                });
    }
}
