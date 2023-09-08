import { Component, Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

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

    constructor(private location: Location, private http: HttpClient) {}

    ngOnInit() {
        this.author = this.location.getState();
        this.authorName = this.author.data;
        console.log(this.authorName);
        var authorListApi = this.apiUrl + '?engine=' + this.apiEngine + '&mauthors=' + this.authorName + '&api_key=' + this.apiKey;
        this.getAuthors(authorListApi).subscribe((data: any[]) => {
            this.authorList = data;
            console.log(this.authorList);
        });
        // this.http.get('../../assets/mock-data/mock-mauthors.json').subscribe((res) => {
        //     this.mauthorData = res;
        //     this.authorList = this.mauthorData.profiles;
        // });

    }

    getAuthors(url: string) : Observable<any> {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Credentials': 'true'
        }
          
        const httpOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headers), 
        };
        return this.http.get<any>(url, httpOptions).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } 
        else {
          console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    searchAuthor() {
        console.log(this.authorName);
    }

    authorSearchById(index: number) {
        console.log(this.authorList[index].author_id);
    }
}
