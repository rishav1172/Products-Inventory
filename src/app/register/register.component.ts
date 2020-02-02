import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '@app/_helpers';
import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { ComponentCanDeactivate } from '@app/_helpers/can-deactivate/component-can-deactivate';

@Component({ 
    templateUrl: 'register.component.html',
    styleUrls: ['../../assets/css/style.css', '../../assets/fonts/material-icon/css/material-design-iconic-font.min.css']
})
export class RegisterComponent extends ComponentCanDeactivate implements OnInit {
    
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        super();
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            id: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phone: ['', Validators.required],
            location: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    canDeactivate():boolean{
        return this.submitted||!this.registerForm.dirty;
    }

    registerUser: User = new User;

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.registerUser.id = this.registerForm.value["id"];
        this.registerUser.name = this.registerForm.value["name"];
        this.registerUser.phone = this.registerForm.value["phone"];
        this.registerUser.location = this.registerForm.value["location"];
        this.registerUser.password = this.registerForm.value["password"];

        // console.log(this.registerForm.value["name"]);
        this.loading = true;
        this.userService.register(this.registerUser)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
