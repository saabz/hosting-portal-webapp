import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/screens/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'servers',
    loadChildren: () =>
      import('./servers/servers.module').then((m) => m.ServersModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'servers',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
