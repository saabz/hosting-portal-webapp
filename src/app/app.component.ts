import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CoreService } from './core/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'Hosting Portal';
  showSpinner: boolean;
  spinnerStateSubscription$: Subscription;

  constructor(
    public readonly coreService: CoreService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.spinnerStateSubscription$ = this.coreService.spinnerState$.subscribe(
      (state) => {
        if (state === true) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.spinnerStateSubscription$) {
      this.spinnerStateSubscription$.unsubscribe();
    }
  }
}
