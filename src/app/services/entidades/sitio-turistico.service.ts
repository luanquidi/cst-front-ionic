import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { SitioTuristico } from 'src/app/models/sitioTuristico';
import { ToastService } from '../general/toast.service';


@Injectable({
  providedIn: 'root'
})
export class SitioTuristicoService {

  constructor(
    private afAuth: AngularFireAuth,
    private alertService: ToastService,
    private firestoreService: AngularFirestore
  ) { }


  // Obtener los sitios turisticos.
  getSitios(): Observable<any> {
    return this.firestoreService.collection('sitiosTuristicos').snapshotChanges().pipe(
      map(
        res => {
          if (res) {
            let response: SitioTuristico[] = [];
            res.forEach((element: any) => {
              response.push(this.mapObjectAndCreat(element))
            });
            return response;
          }
        }
      )
    );
  }


  mapObjectAndCreat(payload: any): SitioTuristico {
    let sitioTuristico: SitioTuristico = new SitioTuristico();
    sitioTuristico.id = payload.payload.doc.id;
    sitioTuristico.nombre = payload.payload.doc.data().nombre;
    sitioTuristico.descripcion = payload.payload.doc.data().descripcion;
    sitioTuristico.imagen = payload.payload.doc.data().imagen;
    sitioTuristico.municipio = payload.payload.doc.data().municipio;
    return sitioTuristico;
  }

}
