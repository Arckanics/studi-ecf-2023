import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-comment',
  template: `
    <form class="{{formClass}}" [formGroup]="commentForm" (submit)="submitForm($event)">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input type="text" class="form-control" id="name" formControlName="name"  name="name" aria-describedby="nameHelp">
        <div id="nameHelp" class="form-text">Votre nom et/ou prénom</div>
      </div>
      <div class="mb-3">
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="message" formControlName="message" style="height: 124px"></textarea>
          <label for="message">Votre message</label>
        </div>
      </div>

      <app-note-input class="mb-1" [(value)]="commentForm.controls.note.value" >
        <input type="number" formControlName="note">
      </app-note-input>
    </form>
  `,
  styles: [
    `
    `
  ]
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() formClass: string = ''
  @Output() formUpdate = new EventEmitter<FormGroup>()
  commentForm: any = new FormGroup({
    name: new FormControl(''),
    message: new FormControl(''),
    note: new FormControl(5)
  })

  submitForm($event:any) {
    if ($event) {
      $event.preventDefault()
    }
    this.formUpdate.emit(this.commentForm)
  }
  ngOnInit() {
    this.commentForm.valueChanges.subscribe(() => {
      this.submitForm(null)
    })
  }

  ngOnDestroy() {
    this.commentForm.valueChanges.unsubscribe()
  }
}
