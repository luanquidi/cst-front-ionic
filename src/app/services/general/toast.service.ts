import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(tipo, mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: 'top',
      color: tipo,
      duration: 2000
    });
    await toast.present();
  }
}
