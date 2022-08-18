import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  open1:boolean;
  constructor( public auth:AuthService) { 
    this.open1 = false;
  }

  ngOnInit(): void {
  }
  open(){
    this.open1 = true
  }
  
  close(){
    this.open1 = false
  }

}
