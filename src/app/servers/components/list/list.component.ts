import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Server } from '../../models/server.model';

@Component({
  selector: 'servers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() servers: Server[] = [];
  @Input() serverCount: number;
  @Output() scrolledDown = new EventEmitter<void>();
  public showServerContainer: boolean;
  public spinnerLoading: boolean;

  constructor() {
    this.showServerContainer = true;
  }

  public onScroll() {
    this.scrolledDown.emit();
  }
}
