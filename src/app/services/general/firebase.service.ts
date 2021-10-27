import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { Usuario } from 'src/app/models/usuario';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private afAuth: AngularFireAuth,
    private alertService: ToastService,
    private firestoreService: AngularFirestore
  ) { }

  async login(usuario: Usuario): Promise<any> {
    try {
      return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password);
    } catch (err) {
      this.alertService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      return null;
    }
  }

  async register(usuario: Usuario): Promise<any> {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password);
    } catch (err) {
      this.alertService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      return null;
    }
  }

  async resetPassword(email: string): Promise<any> {
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (err) {
      this.alertService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      return null;
    }
  }

  getUser(): any {
    return this.afAuth.authState;
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
