import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './routes/edit/edit.component';
import { HomeComponent } from './routes/home/home.component';
import { SingleContactComponent } from './routes/single-contact/single-contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'contact/:id', component: SingleContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
