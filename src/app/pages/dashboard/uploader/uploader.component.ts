import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  @Input() item:any;
  altimage:any = '/assets/img/292x300.png';
  constructor(public auth:AuthService) { 
   }

  ngOnInit(): void {
  } 

}
