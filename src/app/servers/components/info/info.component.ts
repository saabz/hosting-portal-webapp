import { Component, Input } from '@angular/core';
import { Server } from '../../models/server.model';

@Component({
  selector: 'server-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() serverDetails: Server;
}
