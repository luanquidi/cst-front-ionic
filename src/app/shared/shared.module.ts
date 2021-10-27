import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { IllustationLoaderComponent } from './illustation-loader/illustation-loader.component';



@NgModule({
  declarations: [LoaderComponent, IllustationLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, IllustationLoaderComponent],
})
export class SharedModule { }
