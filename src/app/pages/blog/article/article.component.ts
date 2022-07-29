import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { AuthService } from 'src/app/services/auth.service';
import { ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
  blog!:any; 
  constructor(private route: ActivatedRoute,public auth:AuthService) { 
    this.route.params.subscribe(event => {

      this.auth.getBlog(event['id']).subscribe(e=>{ 
        this.blog = e;
      }) 
     });
  }
 
  ngOnInit() {

  }

}
