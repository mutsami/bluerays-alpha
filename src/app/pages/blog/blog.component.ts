import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  blogs: Array<any> = [];
  loader =true;

  constructor(public auth: AuthService) { 
    // subscribe to the request data from our service
    auth.getBlogs().subscribe((e:any) => {
      //Map the data to a more useable array
      this.blogs = e
       
    })
  }
  ngOnInit(): void {
  }

}
