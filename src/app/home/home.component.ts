import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector : 'app-home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class HomeComponent{
    faMagnifyingGlass = faMagnifyingGlass;
    authorName: string = "";

    constructor(private router: Router) {}

    searchAuthor() {
        console.log(this.authorName);
        this.router.navigate(['/scholars'], { state: { data: this.authorName } });
    }

    addScholar() {
        this.router.navigate(['/add']);
    }
}