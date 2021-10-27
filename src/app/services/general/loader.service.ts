import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  changeLoaderState$: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
