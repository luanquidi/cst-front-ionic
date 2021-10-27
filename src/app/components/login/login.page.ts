import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { Usuario } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { LoaderService } from 'src/app/services/general/loader.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private router: Router, 
    private toastService: ToastService,
    private authFirebaseService: FirebaseService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.authFirebaseService.logout();
  }


  signIn(): void {
    this.loaderService.changeLoaderState$.emit({show: true});
    this.authFirebaseService.login(this.usuario).then(res => {
      if(res) {
        this.loaderService.changeLoaderState$.emit({show: false});
        this.toastService.presentToast(MENSAJES.TIPO_SUCCESS, '¡Ingreso exitoso! ✔');
        this.router.navigate(['/home']);
      }else {
        this.loaderService.changeLoaderState$.emit({show: false});
      }
    });
  }

  checkIn(): void {
    this.router.navigate(['/register']);
  }

}
