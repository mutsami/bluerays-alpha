import { Component, OnInit } from '@angular/core';

import { Observable, finalize, map } from 'rxjs';
import { Uploader } from 'src/app/models/uploader';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.css']
})
export class MylistingsComponent implements OnInit {

  userData:any;
  user:any;
  uploader:any;
  listings:any;

  constructor(public auth:AuthService) {
    this.userData = localStorage.getItem('user');
    this.user = JSON.parse(this.userData); 

    this.auth.getMyListings(this.user.uid).subscribe(e=>{ 
      this.listings = e;      
    })
    
   }

  ngOnInit(): void {
  }
  saveListing(id: any){
    
    console.log('saved id', id)
  }



}
