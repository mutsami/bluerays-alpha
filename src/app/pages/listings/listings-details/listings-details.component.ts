import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listings-details',
  templateUrl: './listings-details.component.html',
  styleUrls: ['./listings-details.component.css']
})
export class ListingsDetailsComponent implements OnInit {
  private routeSub: Subscription;
  listing:any;
  recent:any;
  constructor(private auth:AuthService, private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => { 
      this.auth.getListing(params['id']).subscribe(e=>{ 
        this.listing = e;
      })
    });

    this.auth.getRecentListings().subscribe(e=>{
      this.recent = e;
    })

    
   }

  ngOnInit(): void {
  }

}
