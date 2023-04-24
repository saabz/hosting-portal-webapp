import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { globalConfig } from 'src/app/core/global.constants';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'servers-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public pageNumber = 0;
  public locations = globalConfig.locations;
  public memoryUnits = globalConfig.memoryUnits;
  public filterFormGroup: FormGroup;
  public minValue = 250;
  public maxValue = 3000;
  public options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number): string => {
      return value >= 1000 ? value / 1000 + 'TB' : value + 'GB';
    },
    getPointerColor: (value: number): string => {
      return '#1b74e4';
    },
    getSelectionBarColor: (value: number): string => {
      return '#1b74e4';
    },
    stepsArray: globalConfig.rangeSliderSteps,
  };

  constructor(private readonly serverService: ServerService) {
    this.filterFormGroup = this.serverService.createForm();
  }

  public applyFilters(): void {
    this.serverService.setFilters(this.filterFormGroup);
  }

  public checkboxChangeHandler(event: any): void {
    const formArray: FormArray = this.filterFormGroup.get(
      'memory'
    ) as FormArray;

    // checkbox checked
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      // checkbox unchecked
      let i = 0;
      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          // unselected element to be removed from FormArray
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
