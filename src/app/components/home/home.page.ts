import { Component, OnInit } from '@angular/core';
import { SitioTuristicoService } from 'src/app/services/entidades/sitio-turistico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any[] = [];
  constructor(private sitiosTuristicosService: SitioTuristicoService) { }

  ngOnInit() {
    this.sitiosTuristicosService.getSitios().subscribe(res => {
      this.data = res;
    })
  }

}
