import { Routes } from '@angular/router';
import { TravelListComponent } from './pages/travel-list/travel-list.component';
import { TravelFormComponent } from './pages/travel-form/travel-form.component';
import { TravelDetailComponent } from './pages/travel-detail/travel-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: TravelListComponent },
  { path: 'travels/new', component: TravelFormComponent },
  { path: 'travels/:id/edit', component: TravelFormComponent },
  { path: 'travels/:id', component: TravelDetailComponent },
  { path: '**', component: NotFoundComponent }
];
