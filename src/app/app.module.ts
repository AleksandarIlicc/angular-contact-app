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
import { ContactService } from './service/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    NavigationComponent,
    SingleContactComponent,
    ContactListComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
