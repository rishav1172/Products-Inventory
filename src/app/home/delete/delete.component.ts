import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@app/_models';
import { UserService, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';
import { SearchService } from '@app/_services/search.service';


@Component({
    templateUrl: 'delete.component.html',
    styleUrls: ['./delete.component.css']
})


export class DeleteComponent implements OnInit, OnDestroy {
    products: Product[];
    loading = false;
    status:boolean = false;
    filtered_products: Product[];
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
                if(search_val!=undefined && search_val["name"]) {
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


    public sendCheckedCountries(): void {
        this.loading = true;
        var checked_Countries = this.filtered_products.map(function(item, index) { 
            return {
              id: item.id,
              index: index,
              checked : item.checked
            }}).filter( (product) => {
            return product.checked;
        } );
        console.log(checked_Countries);
        checked_Countries = checked_Countries.sort().reverse();
        // this.recentPrdt = checked_Countries.length;
        for(let i of checked_Countries){
            this.userservice.deleteProduct(i["id"]).subscribe(change_det => {
            });
            this.filtered_products.splice(i["index"], 1);
        }
        this.userservice.getProducts().subscribe(
            products => {
                this.products = products;
        });
        this.loading = false;
    }
    

    clearCheckedCountries():void {
        this.filtered_products.forEach((el)=>{el.checked = false;});
        this.status = false;
        // document.getElementsByClassName("checkbox").checked = false;
    }
    clearAll(ss: boolean):void {
        this.filtered_products.forEach((el)=>{
            el.checked = (!this.status) ? true:false;
        });
        this.status = !this.status;
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