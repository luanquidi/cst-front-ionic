import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MENSAJES } from 'src/app/constants/mensajesConstants.constant';
import { LoaderService } from 'src/app/services/general/loader.service';
import { ToastService } from 'src/app/services/general/toast.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  @ViewChild('loading') loading: ElementRef;
  @ViewChild('title') title: ElementRef;

  constructor(
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.loaderService.changeLoaderState$.subscribe((res: any) => {
      if (res.error) {
        this.error(res.message, res.timer);
      } else if (res.show) {
        this.show(res.message);
      } else {
        this.hide();
      }
    });
  }

  error(message: string, time: number): void {
    this.toastService.presentToast(MENSAJES.TIPO_ERROR, message);
    this.hide();
  }

  show(message: string): void {
    document.querySelector('main').classList.add('blurred');
    // this.title.nativeElement.innerText = message;
    this.loading.nativeElement.style.display = 'block';
  }

  hide(): void {
    document.querySelector('main').classList.remove('blurred');
    // this.title.nativeElement.innerText = '';
    this.loading.nativeElement.style.display = 'none';
  }

}
