import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '@app/_services/search.service';


@Component({ 
    selector: 'pm-search',
    templateUrl: 'search.component.html',
    styleUrls: ['../../../assets/css/style.css', '../../../assets/fonts/material-icon/css/material-design-iconic-font.min.css'] 
})
export class SearchComponent implements OnInit {

    searchForm: FormGroup;
    loading = false;


    constructor(
        private formBuilder: FormBuilder,
        private searchService: SearchService

    ) {}

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.searchForm.controls; }

    onSubmit() {
        // reset alerts on submit

        // stop here if form is invalid
        if (this.searchForm.invalid) {
            return;
        }
        this.searchService.searched(this.searchForm.value);
        // this.loading = true;
        // this.userService.addProducts(this.addForm.value).subscribe();
        // this.addForm.markAsPristine();
        // this.addForm.markAsUntouched();
        // // this.addForm.markAsPristine();
        // // this.addForm.markAsUntouched();
        // this.addForm.updateValueAndValidity();
        // this.alertService.success('Product added successfully', true);
        // this.loading = false;
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