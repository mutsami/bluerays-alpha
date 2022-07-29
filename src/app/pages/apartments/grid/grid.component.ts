import { Component, OnInit } from '@angular/core'; 
import algoliasearch from 'algoliasearch/lite';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  config = {
    indexName: 'staycations',
    searchClient: algoliasearch('MS0SDRBX0K', 'd7d2fa3a66a52e49a90150f5f632ebf2'),
  }
  constructor() { }

  ngOnInit(): void {
  }

}
