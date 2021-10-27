import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/entidades/usuario.service';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { LoaderService } from 'src/app/services/general/loader.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authFirebaseService: FirebaseService,
    private loaderService: LoaderService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();

  }

  register(): void {
    if (!this.usuario.nombre || !this.usuario.documento || !this.usuario.email || !this.usuario.telefono || !this.usuario.ciudad || !this.usuario.password || !this.usuario.repetirPassword) {
      this.toastService.presentToast('danger', 'Todos los campos del formulario son requeridos.');
      return;
    }

    this.loaderService.changeLoaderState$.emit({show: true});

    this.authFirebaseService.register(this.usuario).then((res) => {
      if(res){
        this.toastService.presentToast(MENSAJES.TIPO_SUCCESS, '¡Registro exitoso! ✔');

        this.usuarioService.createUser(this.usuario).then(res => {
          this.loaderService.changeLoaderState$.emit({show: false});
          if(res){
            // Se limpia formulario de registro.
            this.usuario = new Usuario();
            this.router.navigate(['/login']);
          }
        });
        
      }else {
        this.loaderService.changeLoaderState$.emit({show: false});
        this.toastService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      }
    });
  }

  backLogin(): void {
    this.router.navigate(['/login']);
  }

}
