import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/general/firebase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(
    private router: Router,
    private authFirebaseService: FirebaseService
  ) { }

  ngOnInit() {}

  logout(): void {
    this.authFirebaseService.logout();
    this.router.navigate(['/login'])
  }

}
