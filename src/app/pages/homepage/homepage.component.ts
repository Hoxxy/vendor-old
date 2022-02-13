import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }
}
