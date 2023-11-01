import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AddScholarComponent } from './add-scholar/add-scholar.component';
import { ScholarComponent } from './scholar/scholar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'scholars', component: SearchListComponent },
  { path: 'add', component: AddScholarComponent },
  { path: 'scholar/:id', component: ScholarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }