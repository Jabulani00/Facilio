import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { UserProfileService } from './services/user-profile.service'; // Import the service

=======
import { RequestModalComponent } from './request-modal/request-modal.component';

// Add these imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> 0a4e85528803fb310e0986834b0cc53b8dc0be26

@NgModule({
  declarations: [AppComponent, RequestModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    // Add these modules
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserProfileService // Ensure the service is provided
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
