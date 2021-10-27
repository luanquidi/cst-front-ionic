import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/entidades/usuario.service';
import { FirebaseService } from 'src/app/services/general/firebase.service';
import { LoaderService } from 'src/app/services/general/loader.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authFirebaseService: FirebaseService,
    private loaderService: LoaderService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  aceptTerms(): void {}

  backLogin(): void {
    this.router.navigate(['/login']);
  }

}
