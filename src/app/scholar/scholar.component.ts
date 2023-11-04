import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { ScholarService } from "./scholar.service";

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
    public selfCitations: Array<number> = [];

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
        this.name = authorPersonal.name;
        this.affiliation = authorPersonal.affiliations;
        this.mail = authorPersonal.email;
        this.interests = authorPersonal.interests;
        this.thumbnail = authorPersonal.thumbnail;

        this.articles = this.details.articles;
        this.coauthors = this.details.co_authors;
        
        let coAuthMap = new Map<string, string>();
        this.coauthors.forEach((c: any) => {
            coAuthMap.set(c.name, c.author_id);
        });
        console.log(coAuthMap);

        var index: number = 0;
        for(var i in this.articles) {
            console.log(i);
            this.selfCitations.push(0);
            var citationId = this.articles[i].citation_id;
            var citesId = this.articles[i].cited_by.cites_id;
            var citationInfo = localStorage.getItem("citationId-" + citationId);
            var citedByInfo = localStorage.getItem("citesId-" + citesId);
            
            if(citationInfo == null) 
                continue;
            if(citedByInfo == null)
                continue;

            var citeAuthList = (JSON.parse(citationInfo).citation.authors).split(',');
            var authIdList = new Set<string | undefined>();
            authIdList.add(this.authorId);
            citeAuthList.forEach((listItem: any) => {
                listItem = listItem.trim();
                console.log("|"+listItem+"|"+" -> "+coAuthMap.get(listItem));
                if(coAuthMap.get(listItem) == undefined)
                    authIdList.add("Name: " + listItem);
                else
                    authIdList.add(coAuthMap.get(listItem));
            });
            console.log(authIdList);
            
            var citedByList = JSON.parse(citedByInfo).organic_results;
            console.log(citedByList);

            var count: number = 0;
            for(var x in citedByList) {
                var citedByAuthors = citedByList[x].publication_info.authors;
                if(citedByAuthors == undefined)
                    continue;
                for(var y in citedByAuthors) {
                    if(authIdList.has(citedByAuthors[y].name) || authIdList.has(citedByAuthors[y].author_id)) {
                        console.log(citedByList[x].title, "    ->   ", citedByAuthors[y].name, citedByAuthors[y].author_id);
                        count = count+1;
                        break;
                    }
                };
                console.log(citedByList[x].publication_info.authors);
            }
            this.selfCitations[Number(i)] = count;
            index = index+1;
        }
        console.log(this.selfCitations);
    }
}