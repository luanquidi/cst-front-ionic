import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule)
      },
      // {
      //   path: 'sub-pagina',
      //   loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule)
      // },

    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterPageModule)
  },
  {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full'
  },
  {path: "**", redirectTo: "/login"},
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'travels',
    loadChildren: () => import('./components/travels/travels.module').then( m => m.TravelsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
