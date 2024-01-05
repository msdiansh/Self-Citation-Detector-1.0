import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScholarService } from "./scholar.service";
import { ArticleInfo } from "src/model/article-info.model";

@Component({
    selector: 'app-scholar',
    templateUrl : './scholar.component.html',
    styleUrls : ['./scholar.component.css']
})

export class ScholarComponent{
    public commonUrl: string = '../../assets/mock-data/';
    public authorId: string = "";
    public personalDetails: any = {};
    public authorDetails: any = {};
    public name: string = "";
    public affiliation: string = "";
    public mail: string = "";
    public interests: any = [];
    public thumbnail: string = "";
    public articles: any = [];
    public coauthors: any = [];
    public articleData: Array<ArticleInfo> = [];
    public hData: any = [];
    public i10Data: any = [];
    public countData: any = [];
    public coAuthorMap: Map<string, string> = {
        clear: function (): void {
            throw new Error("Function not implemented.");
        },
        delete: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        forEach: function (callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void {
            throw new Error("Function not implemented.");
        },
        get: function (key: string): string | undefined {
            throw new Error("Function not implemented.");
        },
        has: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        set: function (key: string, value: string): Map<string, string> {
            throw new Error("Function not implemented.");
        },
        size: 0,
        entries: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        keys: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        values: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        [Symbol.iterator]: function (): IterableIterator<[string, string]> {
            throw new Error("Function not implemented.");
        },
        [Symbol.toStringTag]: ""
    }

    constructor(private route: ActivatedRoute, private http: HttpClient, public ss: ScholarService) {
        route.params.subscribe((params) => {
            this.authorId = params["id"];
        });
    }

    async ngOnInit() {
        console.log(this.authorId);
        try {
            const res = await this.ss.getAuthorDetails(this.commonUrl + 'Info_' + this.authorId + '/' + this.authorId + '.json');
            // console.log(res);
            this.authorDetails = res.author;
            // console.log(this.authorDetails);
            this.interests = this.authorDetails.interests;

            this.coauthors = res.co_authors;
            // console.log(this.coauthors);

            this.articles = res.articles;
            // console.log(this.articles);

            for(var article of this.articles) {
                var data: ArticleInfo = {
                    title: "",
                    totalCitations: 0,
                    selfCitations: 0,
                    otherCitations: 0,
                    selfOtherRatio: 'nil',
                    selfAllRatio: 'nil',
                    otherAllRatio: 'nil'
                };
                data.title = article.title;
                if(article.cited_by.value != '' && article.cited_by.value != undefined && article.cited_by.value != null)
                    data.totalCitations = article.cited_by.value;
                this.articleData.push(data);
            }

            let coAuthMap = new Map<string, string>();
            for(var c of this.coauthors) {
                coAuthMap.set(c.name, c.author_id);
            }
            // console.log(coAuthMap);

            var index: number = -1;
            for (var article of this.articles) {
                var citesId: string = article.cited_by.cites_id;
                var citationId: string = article.citation_id;
                index = index + 1;
                if(citesId == undefined || citationId == undefined) 
                    continue;
                try {
                    const citedByInfo: any = await this.ss.getCitedByDetails(this.commonUrl + 'Info_' + this.authorId + '/Cited By/citedBy_' + citesId + '.json');
                    
                    const citationInfo: any = await this.ss.getCitedByDetails(this.commonUrl + 'Info_' + this.authorId + '/Citations/citation_' + citationId.substring(this.authorId.length + 1) + '.json');
                    if(citedByInfo == null || citedByInfo == undefined || citationInfo == null || citationInfo == undefined)
                        continue;

                    var citeAuthList = (citationInfo.citation.authors).split(',');
                    var authIdList = new Set<string | undefined>();
                    authIdList.add(this.authorId);
                    citeAuthList.forEach((listItem: any) => {
                        listItem = listItem.trim();
                        if(coAuthMap.get(listItem) == undefined)
                            authIdList.add("Name: " + listItem);
                        else
                            authIdList.add(coAuthMap.get(listItem));
                    });
                    
                    var citedByList = citedByInfo.organic_results;
                    var count: number = 0;
                    for(var x in citedByList) {
                        var citedByAuthors = citedByList[x].publication_info.authors;
                        if(citedByAuthors == undefined)
                            continue;
                        for(var y in citedByAuthors) {
                            if(authIdList.has("Name: "+citedByAuthors[y].name) ||  authIdList.has(citedByAuthors[y].author_id)) {
                                count = count+1;
                                break;
                            }
                        }
                    }
                    this.articleData[index].selfCitations = count;
                    this.articleData[index].otherCitations = this.articleData[index].totalCitations - count;
                }
                catch (error) {
                    console.log("Error: Self Citations unavailable.");
                }
            }

            var total = [], self = [], other = [];
            for(var art of this.articleData) {
                total.push(art.totalCitations);
                self.push(art.selfCitations);
                other.push(art.otherCitations);
                var x = (art.selfCitations/art.otherCitations).toFixed(2);
                art.selfOtherRatio = x.toString();
                if(art.selfOtherRatio == 'Infinity' || art.selfOtherRatio == "NaN")
                    art.selfOtherRatio = '∞'
                x = (art.selfCitations/art.totalCitations).toFixed(2);
                art.selfAllRatio = x.toString();
                if(art.selfAllRatio == 'Infinity' || art.selfAllRatio == "NaN")
                    art.selfAllRatio = '∞'
                x = (art.otherCitations/art.totalCitations).toFixed(2);
                art.otherAllRatio = x.toString();
                if(art.otherAllRatio == 'Infinity' || art.otherAllRatio == "NaN")
                    art.otherAllRatio = '∞'
                if(art.totalCitations == 0)
                {
                    art.selfOtherRatio = '—'
                    art.selfAllRatio = '—'
                    art.otherAllRatio = '—'
                }
            }
            total.sort((a,b) => (a > b ? -1 : 1));
            self.sort((a,b) => (a > b ? -1 : 1));
            other.sort((a,b) => (a > b ? -1 : 1));
            var i: number = 0, count: number = 0;
            var fl1: number = 1, fl2: number = 1;
            console.log(total);

            for(i=0; i<total.length; i++) {
                count += total[i];
                if(i >= total[i] && fl1 > 0)
                {
                    this.hData.push(i); 
                    console.log("h-index for total citations", i);
                    fl1 = fl1-1;
                }
                if(total[i] < 10 && fl2 > 0)
                {
                    this.i10Data.push(i); 
                    console.log("i10-index for total citations", i);
                    fl2 = fl2-1;
                }  
            }
            this.countData.push(count);
            fl1 = 1; fl2 = 1; count = 0;
            console.log(self);
            for(i=0; i<self.length; i++) {
                count += self[i];
                if(i >= self[i] && fl1 > 0)
                {
                    this.hData.push(i); 
                    console.log("h-index for self citations", i);
                    fl1 = fl1-1;
                }
                if(self[i] < 10 && fl2 > 0)
                {
                    this.i10Data.push(i); 
                    console.log("i10-index for self citations", i);
                    fl2 = fl2-1;
                }  
            }
            this.countData.push(count);
            fl1 = 1; fl2 = 1; count = 0;
            console.log(other);
            for(i=0; i<other.length; i++) {
                count += other[i];
                if(i >= other[i] && fl1 > 0)
                {
                    this.hData.push(i); 
                    console.log("h-index for other citations", i);
                    fl1 = fl1-1;
                }
                if(other[i] < 10 && fl2 > 0)
                {
                    this.i10Data.push(i); 
                    console.log("i10-index for other citations", i);
                    fl2 = fl2-1;
                }  
            }
            this.countData.push(count);
            console.log(this.countData);
            console.log(this.hData);
            console.log(this.i10Data);
        } 
        catch (error) {
            console.log("Error: Author Complete Details unavailable.");
        }
    }
}