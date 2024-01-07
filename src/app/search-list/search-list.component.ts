import { Component, Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SearchListService } from "./search-list.service";

@Component({
    selector : 'app-search-list',
    templateUrl : './search-list.component.html',
    styleUrls : ['./search-list.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class SearchListComponent{
    faMagnifyingGlass = faMagnifyingGlass;
    author: any = {};
    authorName: string = "";
    authorList: any = [];
    mauthorData: any = {};
    apiUrl : string = 'https://serpapi.com/search.json';
    apiKey: string = '0ac4f57fd4e92788d9dabf20118139043c5a04cc76d9d2560c54320a5fab75fd';
    apiEngine: string = 'google_scholar_profiles';
    commonUrl: string = '../../assets/mock-data/';

    constructor(private location: Location, private http: HttpClient, private router: Router, private sls: SearchListService) {}

    async ngOnInit() {
        this.author = this.location.getState();
        this.authorName = this.author.data;

        const result = await this.sls.getAuthorListByName(this.commonUrl + this.authorName.toLowerCase() + '_search.json');
        var res: any = result;

        this.authorList = res.profiles;
    }

    authorSearchById(id: string) {
        console.log(id);
        this.router.navigate(['/scholar/' + id]);
    }
}