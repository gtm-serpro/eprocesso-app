import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'processo/:id',
    loadChildren: () => import('./view-processo/view-processo.module').then( m => m.ViewProcessoPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'arquivar/:id',
    loadChildren: () => import('./arquivar/arquivar.module').then( m => m.ArquivarPageModule)
  },
  {
    path: 'movimentar/:id',
    loadChildren: () => import('./movimentar/movimentar.module').then( m => m.MovimentarPageModule)
  },
  {
    path: 'liberar/:id',
    loadChildren: () => import('./liberar/liberar.module').then( m => m.LiberarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
