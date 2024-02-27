import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SearchListComponent } from './search-list/search-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddScholarComponent } from './add-scholar/add-scholar.component';
import { ScholarComponent } from './scholar/scholar.component';
import { HeaderComponent } from './header/header.component';
import { ScholarService } from './scholar/scholar.service';
import { SearchListService } from './search-list/search-list.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchListComponent,
    AddScholarComponent,
    ScholarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule
  ],
  providers: [
    ScholarService,
    SearchListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
