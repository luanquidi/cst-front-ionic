import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { SitioTuristicoService } from 'src/app/services/entidades/sitio-turistico.service';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { LoaderService } from 'src/app/services/general/loader.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authFirebaseService: FirebaseService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.authFirebaseService.logout();
  }


  recoveryPassword(): void {
    if (this.email == '' || !this.email) {
      this.toastService.presentToast(MENSAJES.TIPO_ERROR, '¡El correo electrónico es requerido!');
      return;
    };

    this.loaderService.changeLoaderState$.emit({ show: true });
    this.authFirebaseService.resetPassword(this.email).then((res) => {
      if (res === undefined) {
        this.loaderService.changeLoaderState$.emit({ show: false });
        this.toastService.presentToast(MENSAJES.TIPO_SUCCESS, '¡Se ha enviado un correo para recuperar tu contraseña, revisa tu inbox! ✔');
      } else {
        this.loaderService.changeLoaderState$.emit({ show: false });
      }
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
