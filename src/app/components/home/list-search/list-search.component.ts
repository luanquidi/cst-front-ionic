import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.scss'],
})
export class ListSearchComponent implements OnInit {

  @Input() data: any[] = [];
  textoBuscar: string = '';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  onSearchChange( event ) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

  async showModal(item: any){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        sitio: item,
      }
    });

    await modal.present();
  }

}
