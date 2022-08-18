import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import algoliasearch from 'algoliasearch/lite'; 
import Flickity from 'flickity';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recent:any;
  config = {
    indexName: 'listings',
    searchClient: algoliasearch('MS0SDRBX0K', 'd7d2fa3a66a52e49a90150f5f632ebf2'),
  }
  mailText: string;
  uploaderPhone: any;
  constructor(private auth:AuthService) { 
    this.auth.getRecentListings().subscribe(e=>{
      this.recent = e;
    })
  }

  ngOnInit() { 
  }

  getUploaderEmail(id:any){   
    this.auth.getUploaderID(id).forEach((e:any)=>{
      this.mailText = "mailto:"+ e?.email;  
      window.location.href = this.mailText;
    }) 
  }

  getUploaderPhone(id:any){ 
    this.auth.getUploaderID(id).forEach((e:any)=>{
      this.uploaderPhone = e?.phoneNumber;
      this.mailText = "tel:"+ e?.phoneNumber;  
      window.location.href = this.mailText;
    }) 
  }
}
