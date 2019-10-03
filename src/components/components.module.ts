import { NgModule  ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { LmsProgressComponent } from './lms-progress/lms-progress';
import { QuizComponent } from './quiz/quiz';
import {  IonicModule } from "ionic-angular";
import { ProgressBarModule } from "angular-progress-bar";

@NgModule({
	declarations: [
    LmsProgressComponent,
    QuizComponent],
	imports: [IonicModule,ProgressBarModule],
	exports: [
    LmsProgressComponent,
    QuizComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
