import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ScholarService {
    public commonUrl: string = '../../assets/mock-data/';
    public authorId: string = '';
    public personalDetails: any = {};
    
    // public 

    public citesByMap: Map<string, any> = {
        clear: function (): void {
            throw new Error("Function not implemented.");
        },
        delete: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        forEach: function (callbackfn: (value: any, key: string, map: Map<string, any>) => void, thisArg?: any): void {
            throw new Error("Function not implemented.");
        },
        get: function (key: string) {
            throw new Error("Function not implemented.");
        },
        has: function (key: string): boolean {
            throw new Error("Function not implemented.");
        },
        set: function (key: string, value: any): Map<string, any> {
            throw new Error("Function not implemented.");
        },
        size: 0,
        entries: function (): IterableIterator<[string, any]> {
            throw new Error("Function not implemented.");
        },
        keys: function (): IterableIterator<string> {
            throw new Error("Function not implemented.");
        },
        values: function (): IterableIterator<any> {
            throw new Error("Function not implemented.");
        },
        [Symbol.iterator]: function (): IterableIterator<[string, any]> {
            throw new Error("Function not implemented.");
        },
        [Symbol.toStringTag]: ""
    };

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
    };

    constructor(private http: HttpClient) {}

    setCoAuthorMap(coAuthors: any) {
        for(var c of coAuthors) {
            this.coAuthorMap.set(c.name, c.author_id);
        }
        console.log(this.coAuthorMap);
    }

    async getCitedByDetails(url: string) {
        try {
            const response = await this.http.get(url).toPromise();
            return response;
        } 
        catch (error) {
            console.log("Error: Failed to Get Cited By Details");
            return null;
        }
    }

    async getCitationDetails(url: string) {
        try {
            const response = await this.http.get(url).toPromise();
            return response;
        } 
        catch (error) {
            console.log("Error: Failed to Get Citation Details");
            return null;
        }
    }

    async getAuthorDetails(url: string): Promise<any> {
        try {
            const response = await this.http.get(url).toPromise();
            return response;
        } 
        catch (error) {
            console.log("Error: Failed to Get Author Details");
            return null;
        }
    }

}