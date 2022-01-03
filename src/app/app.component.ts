import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilService } from './shared/services/http-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private router: Router,
    private httpUtilService: HttpUtilService
  ) {}
  
  ngOnInit(): void {
    
  }
  
  sair(){   
    this.httpUtilService.deleteToken();
    this.router.navigate(['/']);
  }

  autenticado(){
    return this.httpUtilService.autenticado();
  }
}
