import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent, AddComponent, UpdateComponent, DeleteComponent, ViewComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register'; 
import { AlertComponent, SearchComponent } from './_components';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile';
import { CanDeactivateGuard } from './_helpers/can-deactivate/can-deactivate.guard';
import { ChartsModule } from 'ng2-charts';
import { top_viewedComponent } from './home/top_viewed/top_viewed.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AddComponent,
        UpdateComponent,
        DeleteComponent,
        ViewComponent,
        AlertComponent,
        ProfileComponent,
        SearchComponent,
        top_viewedComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        CanDeactivateGuard

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }