import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {

  @Input() fileUpload!: FileUpload;
  images?: Array<any> = [];
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
  }
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
  include(fileUpload: any){
    if(this.imageExists(fileUpload.id)){
      const index: any = this.images?.indexOf(fileUpload);
      if (index !== -1) {
          this.images?.splice(index, 1);
      }   
      
    }else if (!this.imageExists(fileUpload.id)){ 
      this.images?.push(fileUpload)
    } 
    
  }

  imageExists(id: any) {
    return this.images?.some(function(el) {
      return el.id === id;
    }); 
  }

}
