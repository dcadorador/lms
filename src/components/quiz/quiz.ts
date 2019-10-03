import { Component, Input } from '@angular/core';

/**
 * Generated class for the QuizComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quiz',
  templateUrl: 'quiz.html'
})
export class QuizComponent {

  @Input() form; // Original form quiz
  @Input() inputs; // Selected choices from each fields
  @Input() fields; // Current fields to show

  quiz_form: any = [];
  quiz_inputs: any = [];
  quiz_fields: any = [];

  constructor() {
    console.log('Hello QuizComponent Component');
  }

  async ngAfterContentInit() {  
    if (this.form) this.quiz_form = this.form
    if (this.inputs) this.quiz_inputs = this.inputs
    if (this.fields) this.quiz_fields = this.fields
  }

  onSelect(value, field_id, index, img_id) {

    if (!this.quiz_form || !this.quiz_inputs) {
      return
    }

    // check if theres an image id
    if (img_id) {

      this.quiz_form.fields.forEach(field => {
        if (field.id == field_id) {
          
          field.choices.forEach(choice => {

            if (choice.imageChoices_imageID == img_id)
              choice.class = 'active'

            else
              choice.class = ''

          })
        }
      })
    }

    console.log('index_' + field_id + ' ' + value);
    let idx = 'index_' + field_id;
    let obj = [];
    obj.push(idx);
    obj.push(value);
    let objidx = null;

    this.quiz_inputs.forEach(function(arr, i){
        if(arr[0] == idx){
          objidx = i;
        }
    });

    if (objidx !== null && this.quiz_inputs.length > 0)
      this.quiz_inputs.splice(objidx, 1);

    else
      this.quiz_form.input_index.push(index + 1);

    this.quiz_inputs.push(obj);
  }

}
