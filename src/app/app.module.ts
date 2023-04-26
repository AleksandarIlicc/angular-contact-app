import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { EditComponent } from './routes/edit/edit.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SingleContactComponent } from './routes/single-contact/single-contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NewContactComponent } from './routes/new-contact/new-contact.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FooterComponent } from './components/footer/footer.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    NavigationComponent,
    SingleContactComponent,
    ContactListComponent,
    SpinnerComponent,
    NewContactComponent,
    SearchBoxComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
