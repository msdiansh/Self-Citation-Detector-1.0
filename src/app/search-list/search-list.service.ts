import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SearchListService {
    public commonUrl: string = '../../assets/mock-data/';
    public authorId: string = '';
    public personalDetails: any = {};
    
    
    constructor(private http: HttpClient) {}

    async getAuthorListByName(url: string) {
        try {
            const response = await this.http.get(url).toPromise();
            return response;
        } 
        catch (error) {
            console.log("Error: Failed to Get Author List Details");
            return null;
        }
    }
}