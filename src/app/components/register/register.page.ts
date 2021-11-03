import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private authFirebaseService: FirebaseService,
    private loaderService: LoaderService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.createForm();
    sessionStorage.clear();
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      telefono: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repetirPassword: ['', [Validators.required]],
      terminosCondiciones: ['', [Validators.requiredTrue]],
    });
  }

  register(): void {
    // Se valida el estado del formulario.
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastService.presentToast(MENSAJES.TIPO_ERROR, 'Todos los campos del formulario son requeridos.');
      return;
    }

    if (this.usuario.password != this.usuario.repetirPassword) {
      this.toastService.presentToast(MENSAJES.TIPO_ERROR, 'Las contraseñas no coinciden.');
      return;
    }

    if (this.usuario.terminosCondiciones != true) {
      this.toastService.presentToast(MENSAJES.TIPO_ERROR, 'Acepta los terminos y condiciones para continuar.');
      return;
    }

    this.loaderService.changeLoaderState$.emit({ show: true });

    this.authFirebaseService.register(this.usuario).then((res) => {
      if (res) {
        this.toastService.presentToast(MENSAJES.TIPO_SUCCESS, '¡Registro exitoso! ✔');
        // this.usuario.password = this.usuarioService.hashPassword(this.usuario.password);
        // this.usuario.repetirPassword = this.usuarioService.hashPassword(this.usuario.password);
        this.usuarioService.createUser(this.usuario).then(res => {
          this.loaderService.changeLoaderState$.emit({ show: false });
          if (res) {
            // Se limpia formulario de registro.
            this.usuario = new Usuario();
            this.router.navigate(['/login']);
          }
        });

      } else {
        this.loaderService.changeLoaderState$.emit({ show: false });
        this.toastService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      }
    });
  }

  backLogin(): void {
    this.router.navigate(['/login']);
  }

}
