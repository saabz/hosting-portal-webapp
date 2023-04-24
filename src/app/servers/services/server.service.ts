import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { globalConfig } from 'src/app/core/global.constants';
import { environment } from 'src/environments/environment';
import { ServerApiResponse, ServerFilters } from '../models/server.model';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  public serverFilters$: BehaviorSubject<ServerFilters>;

  constructor(private readonly http: HttpClient) {
    this.serverFilters$ = new BehaviorSubject<ServerFilters>({
      pageNumber: 1,
      resultsPerPage: globalConfig.resultsPerPage,
      storage: globalConfig.defaultStorageSelected.join(','),
      memory: '',
      model: '',
      hardDiskType: '',
      location: '',
    });
  }

  public createForm(): FormGroup {
    return new FormGroup({
      model: new FormControl('', []),
      location: new FormControl('', []),
      storage: new FormControl(globalConfig.defaultStorageSelected, []),
      hardDiskType: new FormControl('', []),
      memory: new FormArray([]),
    });
  }

  public getServers(): Observable<ServerApiResponse> {
    const queryString = this.buildQueryString();
    return this.http.get<ServerApiResponse>(
      environment.baseApiUrl +
        globalConfig.apiUrls.serverlistApiUrl +
        queryString
    );
  }

  private buildQueryString(): string {
    let queryString = '';
    const filters = this.serverFilters$.getValue();
    queryString =
      '?_page=' +
      filters.pageNumber.toString() +
      '&_limit=' +
      filters.resultsPerPage.toString();
    queryString += filters.memory === '' ? '' : '&memory=' + filters.memory;
    queryString += filters.storage === '' ? '' : '&storage=' + filters.storage;
    queryString += filters.model === '' ? '' : '&model=' + filters.model;
    queryString +=
      filters.hardDiskType === ''
        ? ''
        : '&hardDiskType=' + filters.hardDiskType;
    queryString +=
      filters.location === '' ? '' : '&location=' + filters.location;
    return queryString;
  }

  public setFilters(filterFormGroup: FormGroup): void {
    let filters = this.serverFilters$.getValue();
    filters = {
      ...filters,
      pageNumber: 1,
      storage: filterFormGroup.controls['storage'].value,
      hardDiskType: filterFormGroup.controls['hardDiskType'].value,
      memory: filterFormGroup.controls['memory'].value.join(),
      model: filterFormGroup.controls['model'].value,
      location: filterFormGroup.controls['location'].value,
    };

    this.serverFilters$.next(filters);
  }

  public incrementPageNumber(resultCount: number): void {
    const totalPages = this.getTotalPages(resultCount);
    let filters = this.serverFilters$.getValue();
    if (filters.pageNumber !== totalPages) {
      filters = {
        ...filters,
        pageNumber: filters.pageNumber + 1,
      };
      this.serverFilters$.next(filters);
    }
  }

  public getFilters(): ServerFilters {
    return this.serverFilters$.getValue();
  }

  public getTotalPages(resultCount: number): number {
    const resultsPerPage = globalConfig.resultsPerPage;
    const totalPages = Math.ceil(resultCount / resultsPerPage);
    return totalPages;
  }
}
