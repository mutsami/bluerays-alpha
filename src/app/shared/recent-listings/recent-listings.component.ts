import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recent-listings',
  templateUrl: './recent-listings.component.html',
  styleUrls: ['./recent-listings.component.css']
})
export class RecentListingsComponent implements OnInit {

  recent:any;
  uploaderEmail:any;
  uploaderPhone:any;
  mailText:string = "";
  favourites:any;


  constructor(private auth:AuthService) { 

    this.auth.getRecentListings().subscribe(e=>{
      this.recent = e;
      this.auth.getFavListing().pipe(take(1)).subscribe((q)=>{
        this.favourites = q;
      })
    })
    
    
  }
  ngOnInit(): void {
  }

  checkFav(id:string){ 
    if(this.recent.find((x: { id: string; }) => x.id === id)){
      console.log('donkey',this.recent.find((x: { id: string; }) => x.id === id).id)
    }
  }

  favourite(id:string){
    this.auth.saveFavListing(id)
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

  
  sendMail(){
    
  }

}
