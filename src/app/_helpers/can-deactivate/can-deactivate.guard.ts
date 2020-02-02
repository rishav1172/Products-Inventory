import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import {ComponentCanDeactivate} from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
   
    if(!component.canDeactivate()){
        if (confirm("Changes that you made may not be saved.")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}
