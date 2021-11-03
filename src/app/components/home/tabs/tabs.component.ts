import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { ToastService } from 'src/app/services/general/toast.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(
    private router: Router,
    private authFirebaseService: FirebaseService,
    private toastService: ToastService,

  ) { }

  ngOnInit() { }

  logout(): void {
    this.authFirebaseService.logout();
    this.router.navigate(['/login'])
  }

  notFound(): void {
    this.toastService.presentToast(MENSAJES.TIPO_WARNING, '¡Esta opción no se encuentra habilitada! 🕑 ');
  }

}
