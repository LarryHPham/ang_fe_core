import {Component, ViewContainerRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
//import {NgIf, NgFor, NgClass, NgModel, FORM_DIRECTIVES, ControlValueAccessor} from '@angular/common';
import {BoxScoresService} from '../../../services/box-scores.service';
import {GlobalFunctions} from '../../../global/global-functions';

declare var moment;

@Component({
  selector: 'datepicker',
  templateUrl: './app/fe-core/components/date-picker/date-picker.component.html'
})

/**
* Input tag is needed to create create this component
* Input tag has been turned transparent but above the fa-calendar
*/
export class DatePicker {
  public isOpened: boolean;
  public dateValue: string;
  public days: Array<Object>;
  public dayNames: Array<string>;
  private el: any;
  private date: any;
  private viewContainer: ViewContainerRef;
  private onChange: Function;
  private onTouched: Function;
  private cd: any;
  private cannonical: number;
  private today:string;
  private monthlyDates: any;
  private curDateView:any;

  @Input('model-format') modelFormat: string;
  @Input('view-format') viewFormat: string;
  @Input('init-date') initDate: string;
  @Input('first-week-day-sunday') firstWeekDaySunday: boolean;
  @Input('static') isStatic: boolean;
  @Input('disabled-days') disabledDays: Array<Object>;
  @Input() viewValue: string;
  @Input() chosenParam: any;

  @Output() changed = new EventEmitter<Date>();

  constructor(private _boxScores:BoxScoresService) {}


}
