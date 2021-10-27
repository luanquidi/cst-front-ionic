import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { SitioTuristico } from 'src/app/models/sitioTuristico';
import { Usuario } from 'src/app/models/usuario';
import { ToastService } from '../general/toast.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afAuth: AngularFireAuth,
    private alertService: ToastService,
    private firestoreService: AngularFirestore
  ) { }

  // Ejemplo de creación en collección.
  async createUser(usuario: any): Promise<any> {
    try {
      return await this.firestoreService.collection('usuarios').add({...usuario});
    } catch (err) {
      this.alertService.presentToast(MENSAJES.TIPO_ERROR, MENSAJES.MENSAJE_ERROR_PETICION);
      return null;
    }
  }

  // Obtener los usuarios.
  getUsuarios(): Observable<any> {
    return this.firestoreService.collection('usuarios').snapshotChanges().pipe(
      map(
        res => {
          if (res) {
            let response: Usuario[] = [];
            res.forEach((element: any) => {
              response.push(this.mapObjectAndCreat(element))
            });
            return response;
          }
        }
      )
    );
  }


  mapObjectAndCreat(payload: any): Usuario {
    let usuario: Usuario = new Usuario();
    usuario.id = payload.payload.doc.id;
    usuario.nombre = payload.payload.doc.data().nombre;
    usuario.email = payload.payload.doc.data().email;
    usuario.documento = payload.payload.doc.data().documento;
    usuario.telefono = payload.payload.doc.data().telefono;
    usuario.ciudad = payload.payload.doc.data().ciudad;
    usuario.terminosCondiciones = payload.payload.doc.data().terminosCondiciones;
    return usuario;
  }
}
