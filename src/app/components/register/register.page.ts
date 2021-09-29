import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string;
  documento: string;
  correo: string;
  telefono: string;
  ciudad: string;
  password: string;
  repetirPassword: string;

  constructor(
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  register(): void {
    if (!this.nombre || !this.documento || !this.correo || !this.telefono || !this.ciudad || !this.password || !this.repetirPassword) {
      this.toastService.presentToast('danger', 'Todos los campos del formulario son requeridos.');
      return;
    }
    this.toastService.presentToast('success', '¡Registro exitoso! ✔');
    this.clearForm();
    this.router.navigate(['/login']);
  }

  backLogin(): void {
    this.router.navigate(['/login']);
  }

  clearForm(): void {
    this.nombre = '';
    this.documento = '';
    this.correo = '';
    this.telefono = '';
    this.ciudad = '';
    this.password = '';
    this.repetirPassword = '';
  }

}
