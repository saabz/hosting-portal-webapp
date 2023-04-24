import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { ListComponent } from './components/list/list.component';
import { ListingPageComponent } from './screens/listing-page/listing-page.component';
import { ServersRoutingModule } from './servers-routing.module';
import { InfoComponent } from './components/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@NgModule({
  declarations: [
    FilterComponent,
    ListComponent,
    ListingPageComponent,
    InfoComponent,
  ],
  imports: [
    CommonModule,
    ServersRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSliderModule,
  ],
})
export class ServersModule {}
