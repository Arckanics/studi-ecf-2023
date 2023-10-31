import { Component } from '@angular/core';
import { AbstractListComponent } from "../abstract-list.component";
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-messages',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-message *ngFor="let msg of this.list; let i = index" [index]="i" [msg]="msg" class="message" [ngClass]="{
        'opacity-75': msg.isRead
    }" (openMessage)="openMsg($event)"></app-message>
    <app-modal *ngIf="modalToggle" [mailFooter]="true" (close)="modalToggle = false" [title]="message.mail">
      <div id="top-mail" class="mb-2">
        <div id="msg-name" class="mb-2">
          <span class="text-decoration-underline">{{ message.name }} {{ message.firstname }}</span> : {{ message.phone }}
        </div>
        <div id="msg-subject" class="mb-1">
          <div class="input-group">
            <div class="input-group-text">Sujet :</div>
            <div class="form-control bg-white">{{ message.subject }}</div>
          </div>
        </div>
        <div id="msg-content">
          <div class="input-group">
            <div class="form-control bg-white">{{ message.message }}</div>
          </div>
        </div>
      </div>
    </app-modal>
  `,
  styles: [
    `
      :host {
        display: flex;
        position: relative;
        flex-direction: column;
        padding: .4rem;
        padding-bottom: 4rem;
        gap: .1rem;
      }

      .message {
        &:first-child {
          border-radius: .375rem .375rem 0 0;
        }
        &:last-child {
          border-radius:  0 0 .375rem .375rem;
        }
      }
    `
  ]
})
export class MessagesComponent extends AbstractListComponent {

  message = {
    id: 0,
    firstname: "",
    name: "",
    mail: "",
    message: "",
    phone: "",
    subject: "",
    isRead: false
  }

  constructor(
    private bdd: DatabaseService
  ) {
    super();
    this.db = "messages";
    this.bdd.getData(this.db).subscribe((next:any) => {
      this.list = next.map((m:any) => {
        m.isRead = m.isRead != 0;
        return m;
      })
    })
  }

  openMsg($event: any) {
    this.message = { ...this.list[$event] }
    if (!this.message.isRead) {
      this.bdd.put(this.db, { id: $event, isRead: true }).subscribe((next:any) => {
        this.list[$event].isRead = true
      })
    }
    this.modalToggle = true
  }
}
