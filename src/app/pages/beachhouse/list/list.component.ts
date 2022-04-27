import { Component, OnInit } from '@angular/core'; 
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  config = {
    indexName: 'beach-house',
    searchClient: algoliasearch('MS0SDRBX0K', 'd7d2fa3a66a52e49a90150f5f632ebf2'),
  }
  constructor() { }

  ngOnInit(): void {
  }

}
