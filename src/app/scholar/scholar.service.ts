export class ScholarService {
    public coAuthorList :any = [];

    public setCoAuthors(list: any) {
        this.coAuthorList = list;
    }




    public getSelfCitations(coAuthorList: any) {
        let coAuthMap = new Map<string, string>();
        for(var x in coAuthorList) {
            coAuthMap.set(coAuthorList[x].name, coAuthorList[x].author_id);
        }
    }

}