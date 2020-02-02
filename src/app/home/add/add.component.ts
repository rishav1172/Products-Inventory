import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, AlertService, UserService } from '@app/_services';
import { Router } from '@angular/router';
import { ComponentCanDeactivate } from '@app/_helpers/can-deactivate/component-can-deactivate';
import { Product } from '@app/_models';


@Component({ 
    templateUrl: 'add.component.html',
    styleUrls: ['../../../assets/css/style.css', '../../../assets/fonts/material-icon/css/material-design-iconic-font.min.css'] 
})
export class AddComponent extends ComponentCanDeactivate implements OnInit  {

    addForm: FormGroup;
    loading = false;
    submitted = false;
    new_product: Product;

    constructor(
        private formBuilder: FormBuilder,

        private userService: UserService,
        private alertService: AlertService
    ) {
        super();
    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            manufacturer: ['', Validators.required],
            price: ['', [Validators.required, Validators.minLength(6)]],
            quantity: ['', [Validators.required, Validators.min(1)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.addForm.controls; }

    canDeactivate():boolean{
        return !this.addForm.dirty;
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.addForm.invalid) {
            return;
        }

        this.loading = true;
        this.new_product = this.addForm.value;
        this.new_product.viewed = 0;
        this.userService.addProducts(this.new_product).subscribe();
        this.addForm.markAsPristine();
        this.addForm.markAsUntouched();
        // this.addForm.markAsPristine();
        // this.addForm.markAsUntouched();
        this.addForm.updateValueAndValidity();
        this.alertService.success('Product added successfully', true);
        this.loading = false;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }

}