import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@app/_models';
import { UserService, AlertService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '@app/_services/search.service';


@Component({ 
    templateUrl: 'update.component.html',
    styleUrls: ['./update.component.css', '../../../assets/css/style.css', '../../../assets/fonts/material-icon/css/material-design-iconic-font.min.css'] 
})

export class UpdateComponent implements OnInit, OnDestroy {

    products: Product[];
    filtered_products: Product[];
    modal_product: Product = new Product;
    addForm: FormGroup;
    loading = false;
    submitted = false;
    isShow: boolean;
    topPosToStartShowing = 100;
    
    private subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        // private router: Router,
        // private authenticationService: AuthenticationService,
        // private userService: UserService,
        private alertService: AlertService,
        private userservice: UserService,
        private searchService: SearchService 
    ) {
        this.alertService.clear();
    }

    ngOnInit() {
        this.userservice.getProducts().subscribe(
            products => {
                this.products = products;
                this.filtered_products = this.products;
            }
        );
        this.subscription = this.searchService.getSearch()
            .subscribe( search_val => {
                if(search_val != undefined && search_val["name"]) {
                    this.filtered_products = this.performFilter(search_val);
                }
        });
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

    index:number;

    performFilter(filterBy: object): Product[] {
        if(filterBy["name"]!='Price' || filterBy["name"]!='Quantity') {
            filterBy["description"] = filterBy["description"].toLocaleLowerCase();
        }
        if(filterBy["name"]=="Product Name") {
            filterBy["name"] = "name";
        }
        else{
            filterBy["name"] = filterBy["name"].toLocaleLowerCase();
            // console.log(typeof filterBy["description"]);
        }
        if(filterBy["name"]=='price' || filterBy['name']=='qunatity'){
            return this.products.filter((product: Product) => product[filterBy["name"]]==filterBy["description"]);
        }
        else{
            return this.products.filter((product: Product) => product[filterBy["name"]].toLocaleLowerCase().indexOf(filterBy["description"]) !== -1);
        }
    }

    model_values(prodt: Product, index:number): void{
        this.modal_product = prodt;
        this.addForm.get('name').setValue(this.modal_product.name);
        this.addForm.get('description').setValue(this.modal_product.description);
        this.addForm.get('price').setValue(this.modal_product.price);
        this.addForm.get('quantity').setValue(this.modal_product.quantity);
        this.addForm.get('manufacturer').setValue(this.modal_product.manufacturer);
        // this.addForm.setValue(this.modal_product);
        this.index = index;
    }

    onSubmit(){
        this.userservice.updateProduct(
            this.addForm.value, this.modal_product.id
        ).subscribe(x => {this.products[this.index] = this.addForm.value;});
        
        alert("Update successfully");
    };  
 
    @HostListener('window:scroll')
    checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


        if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
    }

  // TODO: Cross browsing
    gotoTop() {
        window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}