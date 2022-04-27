import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recent-listings-grid',
  templateUrl: './recent-listings-grid.component.html',
  styleUrls: ['./recent-listings-grid.component.css']
})
export class RecentListingsGridComponent implements OnInit {

  recent:any;
  mailText: string;
  uploaderPhone: any;
  constructor(private auth:AuthService) { 
    this.auth.getRecentListings().subscribe(e=>{
      this.recent = e;
    })
  }
  ngOnInit(): void {
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
