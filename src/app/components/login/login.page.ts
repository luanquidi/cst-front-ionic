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
  private whiteListUsers = [
    { email: 'luanquidi1@hotmail.com', password: 'luis' }
  ]

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  signIn(): void {
    if (!this.password && !this.email) {
      this.toastService.presentToast('danger', 'Todos los campos del formulario son requeridos.');
      return;
    }
    const token = '75c450c3f963befb912ee79f0b63e563652780f0';

    const isOk = this.whiteListUsers.filter(user => {
      return user.email.toLocaleUpperCase() === this.email.toUpperCase();
    });

    if(isOk.length > 0) {

      if (this.password.toUpperCase() != 'LUIS') {
        this.toastService.presentToast('danger', '¡Las credenciales no son correctas! 😕');
        return;
      }

      this.toastService.presentToast('success', '¡Ingreso exitoso! ✔');
      sessionStorage.setItem('token', token);
      this.router.navigate(['/home']);
    }else {
      this.toastService.presentToast('danger', '¡El usuario no está registrado! 😕');
    }
  }

  checkIn(): void {
    this.router.navigate(['/register']);
  }

}
