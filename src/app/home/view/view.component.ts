import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@app/_models';
import { UserService, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';
import { SearchService } from '@app/_services/search.service';
import { filter } from 'rxjs/operators';


@Component({ 
    templateUrl: 'view.component.html',
    styleUrls: ['./view.component.css'] 
})

export class ViewComponent implements OnInit, OnDestroy {

    products: Product[];
    filtered_products: Product[];
    modal_product: Product = new Product;
    private subscription: Subscription;

    constructor(private userservice: UserService, private alertService: AlertService, private searchService: SearchService) {
        this.alertService.clear();
    }

    ngOnInit() : void {
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
    }

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
    }

    isShow: boolean;
    topPosToStartShowing = 100;

    @HostListener('window:scroll')
    checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        console.log('[scroll]', scrollPosition);

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