import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TabsComponent } from './tabs/tabs.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { HeaderComponent } from './header/header.component';
import { ListSearchComponent } from './list-search/list-search.component';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule,
    RouterModule
  ],
  declarations: [
    HomePage, 
    TabsComponent, 
    CarrouselComponent, 
    HeaderComponent, 
    ListSearchComponent
  ],
  providers: []
})
export class HomePageModule { }
