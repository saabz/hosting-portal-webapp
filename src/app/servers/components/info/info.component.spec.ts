import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Server } from '../../models/server.model';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let mockData: Server;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [InfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    mockData = {
      model: 'HP DL180G62x Intel Xeon E5620',
      location: 'AmsterdamAMS-01',
      price: '€119.00',
      hdd: {
        title: '8x2TBSATA2',
        type: 'SATA2',
        value: '16000',
      },
      ram: {
        title: '32GBDDR3',
        type: 'DDR3',
        value: '32',
      },
    };
    component = fixture.componentInstance;
    component.serverDetails = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
