import { Component, Input } from '@angular/core';

/**
 * Generated class for the LmsProgressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'lms-progress',
  templateUrl: 'lms-progress.html'
})
export class LmsProgressComponent {

  @Input() color;
  @Input() percent;
  @Input() sub_title;
  @Input() title;

  progress_color: '';

  constructor() {
    console.log('Hello LmsProgressComponent Component');
  }

  async ngAfterContentInit() {

    this.progress_color = this.color ? this.color : '#2fbbec';
    this.percent = this.percent ? this.percent : 0;
  }

}
