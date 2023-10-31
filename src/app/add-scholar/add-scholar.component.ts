import { Component, Injectable, OnInit } from "@angular/core";
import { FileUploadService } from './file-upload.service';

@Component({
    selector : 'app-add-scholar',
    templateUrl : './add-scholar.component.html',
    styleUrls : ['./add-scholar.component.css']
})

export class AddScholarComponent implements OnInit {
    shortLink: string = ""; 
    loading: boolean = false; 
    file!: File;
    filecount: number = 0;
    
    constructor(private fileUploadService: FileUploadService) { } 
  
    ngOnInit(): void { 
    } 
  
    // On file Select 
    onChange(event: any) { 
        this.file = event.target.files[0]; 
    } 
  
    // OnClick of button Upload 
    onUpload() { 
        this.loading = !this.loading; 
        console.log(this.file); 
        this.fileUploadService.upload(this.file).subscribe( 
            (event: any) => { 
                if (typeof (event) === 'object') { 
  
                    // Short link via api response 
                    this.shortLink = event.link; 
  
                    this.loading = false; // Flag variable  
                } 
            } 
        ); 
    }

    onAddFile() {
        this.filecount++;
    }  
}