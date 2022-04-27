import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recent-listings-sm',
  templateUrl: './recent-listings-sm.component.html',
  styleUrls: ['./recent-listings-sm.component.css']
})
export class RecentListingsSmComponent implements OnInit {
recent:any;
  constructor(private auth:AuthService) { 
    this.auth.getRecentListings().subscribe(e=>{
      this.recent = e;
    })
  }

  ngOnInit(): void {
  }

}
