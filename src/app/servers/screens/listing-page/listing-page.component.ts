import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Server } from '../../models/server.model';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
})
export class ListingPageComponent implements OnInit, OnDestroy {
  public servers$: Server[] = [];
  public serverCount: number;
  private serverSubscription$: Subscription | undefined;
  private filterSubscription$: Subscription | undefined;

  constructor(private readonly service: ServerService) {}

  public ngOnInit(): void {
    this.filterSubscription$ = this.service.serverFilters$.subscribe(
      (filters) => {
        this.loadData();
      }
    );
  }

  private loadData(): void {
    this.serverSubscription$ = this.service.getServers().subscribe({
      next: (serverApiResponse) => {
        if (serverApiResponse.responseCode === 200) {
          this.serverCount = serverApiResponse.responseData.resultCount;
          const filters = this.service.getFilters();
          if (filters.pageNumber > 1) {
            this.servers$.push(...serverApiResponse.responseData.results);
          } else {
            this.servers$ = serverApiResponse.responseData.results;
          }
        }
      },
      error: (error) => {
        this.serverCount = 0;
        this.servers$ = [];
        console.error('Error while retrieving servers', error);
      },
      complete: () => console.log('completed'),
    });
  }

  public handlePageScroll(): void {
    console.log('sroll detected, page incremented');
    this.service.incrementPageNumber(this.serverCount);
  }

  public ngOnDestroy(): void {
    if (this.serverSubscription$) {
      this.serverSubscription$.unsubscribe();
    }
    if (this.filterSubscription$) {
      this.filterSubscription$.unsubscribe();
    }
  }
}
