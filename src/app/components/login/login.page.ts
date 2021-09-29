import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  signIn(): void {
    if (!this.password && !this.email) { 
      this.toastService.presentToast('danger', 'Todos los campos del formulario son requeridos.');
      return; 
    }
    const token = '++--Token--++';
    if (this.email != 'luanquidi1@hotmail.com' || this.password != 'luis') {
      this.toastService.presentToast('danger', '¡Las credenciales no son correctas! 😕'); 
    } else {
      this.toastService.presentToast('success', '¡Ingreso exitoso! ✔');
      this.router.navigate(['/home']);
      sessionStorage.setItem('token', token);
    }
  }

  checkIn(): void {
    this.router.navigate(['/register']);
  }

}
