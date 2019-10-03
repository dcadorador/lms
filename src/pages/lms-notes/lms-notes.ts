import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../app/services/api.service';
import { GlobalProvider } from '../../providers/global/global';
import { LmsPopoverPage } from '../lms-popover/lms-popover';

@IonicPage()
@Component({
  selector: 'page-lms-notes',
  templateUrl: 'lms-notes.html',
})
export class LmsNotesPage {
  lms: any= null;
  lms_course_id: any=null;
  lms_title: any=null;
  lms_content: any=null;
  lms_notes_title: any = null;
  lms_notes_template: any = null;

  notesdata:any = {};
	public showNotes: Array<{lesson_id:string,notes_question:string,notes:string,date:string}>;  
 

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
     public navParams: NavParams,
     private apiService: ApiService,
     public sanitizer: DomSanitizer,
     public global: GlobalProvider,
     public element: ElementRef,
     private popoverCtrl: PopoverController,
  ) {

      this.lms_title =localStorage.getItem('lms_title');
      this.global.button_text ="CLOSE";
      this.lms_notes_title="My Notes - Note Page";
      this.global.id =localStorage.getItem('userID');  
      this.lms_course_id= localStorage.getItem('lms_course_id');

      // create loader
      this.global.loader = this.loadingCtrl.create({ duration: 10000 });
      this.global.loader.present().then(() => {    
          this.getLmsNotes();
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LmsNotesPage');
  }
  
  getLmsNotes(){
         // dismiss loader
         this.global.loader.dismiss();
         
         // give time to hide the loader first
         setTimeout(() => {       
         this.global.is_loading=false; 
   
         this.apiService.getNotes().subscribe((data)=>{ 
           this.showNotes =[];
           this.notesdata.response = data; 
 
           for (let i = 0; i < this.notesdata.response.length; i++) {
         
                this.showNotes.push({ 
                 lesson_id: this.notesdata.response[i].lesson_id,
                 notes_question: this.notesdata.response[i].notes_question,
                 notes: this.notesdata.response[i].notes,
                 date: this.notesdata.response[i].date
             }) 
           } 
           }, error => {
            this.showNotes =[];
            console.error('lms getNotes error : ', error);
         });
      
        },500);
  }

 //Notes
 lmsSaveNotes(){ 
    var highlightedItems = this.element.nativeElement.querySelectorAll(".notes_id");
    var totalItems = highlightedItems.length

    if(totalItems == 0){
      this.navCtrl.pop();
      return;
    }

    this.global.loader = this.loadingCtrl.create();
    this.global.loader.present().then(() => {
      let savingNotes = new Promise((resolve, error) => {
        for (let i = 0; i < totalItems; i++) {
             let lesson_id = [highlightedItems][0][i].id;
             let lesson_notes =[highlightedItems][0][i].childNodes[7].innerText;
         
          this.apiService.saveNotes(lesson_id, lesson_notes).subscribe((data) => {
              console.log('data save notes', data);   
              // console.log('data save test: ', i, totalItems)
              if ( (i+1)  >= totalItems ) {
                resolve()
              }
            }, err => {
              console.log("Oooops!",err);
              error(err)
            });
        }  
      })


      // when saving all notes is done close nav.
      savingNotes.then(
        // success
        () => {
          this.global.loader.dismiss()
          this.navCtrl.pop()
        },

        // error
        error => {
          // Handle error here still close the nav
          this.global.loader.dismiss()
          this.navCtrl.pop()
        }
      )
    })
 }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(LmsPopoverPage);
    popover.present({ev: event});   
  }
}
