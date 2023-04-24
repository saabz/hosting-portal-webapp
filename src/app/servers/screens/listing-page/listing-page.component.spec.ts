import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ServerService } from '../../services/server.service';

import { ListingPageComponent } from './listing-page.component';

describe('ListingPageComponent', () => {
  let component: ListingPageComponent;
  let fixture: ComponentFixture<ListingPageComponent>;
  let service: ServerService;
  const filters = {
    pageNumber: 1,
    resultsPerPage: 10,
    memory: '',
    storage: '',
    model: '',
    location: '',
    hardDiskType: '',
  };
  const mockApiResponse = {
    responseCode: 200,
    responseMessage: 'Server list retrieved successfully',
    responseData: {
      resultCount: 109,
      results: [
        {
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
        },
        {
          model: 'HP DL380eG82x Intel Xeon E5-2420',
          location: 'AmsterdamAMS-01',
          price: '€131.99',
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
        },
        {
          model: 'IBM X36302x Intel Xeon E5620',
          location: 'AmsterdamAMS-01',
          price: '€106.99',
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
        },
        {
          model: 'HP DL120G7Intel G850',
          location: 'AmsterdamAMS-01',
          price: '€39.99',
          hdd: {
            title: '4x1TBSATA2',
            type: 'SATA2',
            value: '4000',
          },
          ram: {
            title: '4GBDDR3',
            type: 'DDR3',
            value: '4',
          },
        },
        {
          model: 'Dell R210-IIIntel G530',
          location: 'AmsterdamAMS-01',
          price: '€35.99',
          hdd: {
            title: '2x500GBSATA2',
            type: 'SATA2',
            value: '1000',
          },
          ram: {
            title: '4GBDDR3',
            type: 'DDR3',
            value: '4',
          },
        },
        {
          model: 'Supermicro SC846Intel Xeon E5620',
          location: 'AmsterdamAMS-01',
          price: '€199.99',
          hdd: {
            title: '24x1TBSATA2',
            type: 'SATA2',
            value: '24000',
          },
          ram: {
            title: '32GBDDR3',
            type: 'DDR3',
            value: '32',
          },
        },
        {
          model: 'HP DL120G91x Intel E5-1620v3',
          location: 'AmsterdamAMS-01',
          price: '€119.99',
          hdd: {
            title: '4x2TBSATA2',
            type: 'SATA2',
            value: '8000',
          },
          ram: {
            title: '32GBDDR4',
            type: 'DDR4',
            value: '32',
          },
        },
        {
          model: 'HP DL380eG82x Intel Xeon E5-2420',
          location: 'AmsterdamAMS-01',
          price: '€142.99',
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
        },
        {
          model: 'HP DL180G62x Intel Xeon E5645',
          location: 'AmsterdamAMS-01',
          price: '€129.99',
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
        },
        {
          model: 'HP DL120G7Intel G850',
          location: 'AmsterdamAMS-01',
          price: '€163.99',
          hdd: {
            title: '4x1TBSATA2',
            type: 'SATA2',
            value: '4000',
          },
          ram: {
            title: '4GBDDR3',
            type: 'DDR3',
            value: '4',
          },
        },
      ],
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ListingPageComponent],
    }).compileComponents();

    service = TestBed.inject(ServerService);
    fixture = TestBed.createComponent(ListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data when initialized', () => {
    const spy1 = spyOn(component as any, 'loadData').and.callFake(() => {
      return of(mockApiResponse);
    });
    service.serverFilters$.next(filters);
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
  });

  it('should assign api response data to server data if API response is successful/200 ', () => {
    // component.servers$ = mockApiResponse.responseData.results;
    const spy1 = spyOn(service, 'getServers').and.callFake(() => {
      return of(mockApiResponse);
    });
    (component as any).loadData();
    expect(component.servers$).toEqual(mockApiResponse.responseData.results);
  });

  it('should paginate when user scrolls down the page', () => {
    const spy = spyOn(service, 'incrementPageNumber').and.callThrough();
    component.handlePageScroll();
    expect(spy).toHaveBeenCalled();
  });

  it('should remove filter subscription when component is destroyed', () => {
    (component as any).filterSubscription$ = of(filters).subscribe();
    component.ngOnDestroy();
    expect((component as any).filterSubscription$.closed).toBeTruthy();
  });

  it('should remove server subscription when component is destroyed', () => {
    (component as any).serverSubscription$ = of(mockApiResponse).subscribe();
    component.ngOnDestroy();
    expect((component as any).serverSubscription$.closed).toBeTruthy();
  });
});
