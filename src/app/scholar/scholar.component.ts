import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-scholar',
    templateUrl : './scholar.component.html',
    styleUrls : ['./scholar.component.css']
})

export class ScholarComponent{
    
    public authorId: string = "";
    public details: any = {};
    public name: string = "";
    public affiliation: string = "";
    public mail: string = "";
    public interests: any = [];
    public thumbnail: string = "";
    public articles: any = [];
    public coauthors: any = [];

    constructor(private route: ActivatedRoute) {
        route.params.subscribe((params) => {
            this.authorId = params["id"];
        });
    }

    ngOnInit() {
        console.log(this.authorId);

        var result: any = localStorage.getItem('authData-' + this.authorId);
        this.details = JSON.parse(result);

        var authorPersonal = this.details.author;
        // console.log(this.details);

        this.name = authorPersonal.name;
        this.affiliation = authorPersonal.affiliations;
        this.mail = authorPersonal.email;
        this.interests = authorPersonal.interests;
        this.thumbnail = authorPersonal.thumbnail;

        this.articles = this.details.articles;

        this.coauthors = this.details.co_authors;
        console.log(this.coauthors);
    }
}