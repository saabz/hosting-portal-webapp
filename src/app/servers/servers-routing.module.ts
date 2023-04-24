import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageComponent } from './screens/listing-page/listing-page.component';

const routes: Routes = [
  { path: '', component: ListingPageComponent },
  {
    path: 'list',
    component: ListingPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServersRoutingModule {}
