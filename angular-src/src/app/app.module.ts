import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router'


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageListComponent } from './image-list/image-list.component';
import { CollectionComponent } from './components/collection/collection.component'

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages/module';
import {AuthGuard} from './guards/auth.guard';
import {ImageService} from './services/image.service';


//creating routes for out components
const appRoutes: Routes=[
  {path:'',component:HomeComponent},//home page
  {path:'register',component:RegisterComponent},
  {path:'collection',component:CollectionComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},//canActivate protects it and makes it private from front end
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ImageListComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  //services go in providers in the app module
  providers: [ValidateService, AuthService,AuthGuard,ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
