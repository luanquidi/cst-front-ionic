import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  selectedPath = '';
  constructor(
    private router: Router,
    private authFirebaseService: FirebaseService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  logout(): void {
    this.authFirebaseService.logout();
    this.router.navigate(['/login'])
  }

  showAlert(): void {
    this.toastService.presentToast(MENSAJES.TIPO_ERROR, '¡Proximamente! 🕓')
  }

}
