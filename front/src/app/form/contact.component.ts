import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-contact',
  template: `
    <form class="{{formClass}}" [formGroup]="contactForm" (submit)="submitForm($event)">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input type="text" class="form-control validator" id="name" formControlName="name" name="name"
               aria-describedby="nameHelp">
        <div id="nameHelp" class="form-text">Votre nom</div>
      </div>
      <div class="mb-3">
        <label for="firstname" class="form-label">Prénom</label>
        <input type="text" class="form-control validator" id="firstname" formControlName="firstname" name="firstname"
               aria-describedby="firstnameHelp">
        <div id="firstnameHelp" class="form-text">Votre prénom</div>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Adresse</label>
        <input type="text" class="form-control" id="address" formControlName="address" name="address"
               aria-describedby="addressHelp">
        <div id="addressHelp" class="form-text">Votre adresse</div>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Email</label>
        <input type="email" class="form-control validator" id="email" formControlName="email" name="email"
               aria-describedby="emailHelp" [email]="true">
        <div id="emailHelp" class="form-text">Votre email</div>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Téléphone</label>
        <input type="text" class="form-control validator" id="phone" formControlName="phone" name="phone"
               aria-describedby="phoneHelp">
        <div id="phoneHelp" class="form-text">Votre téléphone</div>
      </div>
      <div class="mb-1">
        <label for="subject" class="form-label">Sujet</label>
        <input type="text" class="form-control" id="subject" formControlName="subject" name="subject"
               >
      </div>
      <div class="mb-3">
        <div class="form-floating">
          <textarea class="form-control validator" placeholder="Votre message" id="message" formControlName="message"
                    style="height: 124px"></textarea>
          <label for="message">Votre message</label>
        </div>
      </div>

    </form>
  `,
  styles: [
    `
      .form-control {
        &.validator {
          &.ng-invalid.ng-touched.ng-dirty {
            border-color: rgba(217, 13, 33, 0.5);
          }
          &.ng-valid.ng-touched.ng-dirty {
            border-color: #198754;
          }
        }
      }
    `
  ]
})
export class ContactComponent {
  @Input() formClass: string = ''
  @Output() formUpdate = new EventEmitter<FormGroup>()
  contactForm: any = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    firstname: new FormControl('', {
      validators: Validators.required,
    }),
    address: new FormControl(''),
    email: new FormControl('', {
      validators: Validators.required,
    },),
    phone: new FormControl('', {
      validators: Validators.pattern("^[0-9]{10}$"),
      updateOn: "blur"
    }),
    subject: new FormControl('', {
      validators: Validators.required,
    },),
    message: new FormControl('', {
      validators: Validators.required,
    }),
  })

  constructor(private store: Store<{modal:any}>) {

    this.store.select('modal').forEach((prop: any) => {
      if (prop.extra) {
        if (prop.extra.contactSubject) {
          this.contactForm.controls['subject'].setValue(prop.extra.contactSubject)
        }
      }
    })

  }

  submitForm($event: any) {
    if ($event) {
      $event.preventDefault()
    }
    this.formUpdate.emit(this.contactForm.value)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
