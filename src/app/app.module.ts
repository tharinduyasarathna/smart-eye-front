import { UserServiceService } from './services/user-service.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "./core/material.module";
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { HistoryComponent } from './history/history/history.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } },
  { path: 'setting', component: SettingComponent, data: { title: 'Setting Component' } },
  { path: 'history', component: HistoryComponent, data: { title: 'History Component' } },
  { path: 'about', component: AboutComponent, data: { title: 'About Component' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile Component' } }

];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SecondComponent,
    FirstComponent,
    LoginComponent,
    SettingComponent,
    HistoryComponent,
    AboutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    CustomMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        FormsModule,
        
  ],
  providers: [
    AngularFirestore,
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
