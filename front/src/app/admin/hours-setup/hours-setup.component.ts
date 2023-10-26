import { Component, ViewChild } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-hours-setup',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <admin-hours
      *ngFor="let h of list" [hour]="h"
      (action)="getAction($event)"
    ></admin-hours>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Ajouter</div>
    <app-modal title="Horaire" [formGroup]="formSet">
      <form class="admin-form">
        <div class="mb-3">
          <div class="input-group">
            <label class="input-group-text">Jour</label>
            <select class="form-select" formControlName="day">
              <option *ngFor="let day of fillLoop(7); let i=index" [value]="i">{{getStrDay(day)}}</option>
            </select>
          </div>
        </div>
        <div class="mb-3 drop-shadow-range">
          <label class="input-label bg-transparent mb-1">Début</label>
          <div class="input-group">
            <div class="form-control">
              <input type="range" class="form-range" step="1" min="0" max="23" value="0" name="begin-h"
                     (input)="setHoursStamp($event, true,true)" #beginHour>
              <label class="input-group-text">Heure(s) : <span
                class="fw-bold">{{formSet.controls['begin'].value | slice:0:2 }}</span></label>
            </div>
            <div class="form-control">
              <input type="range" class="form-range" step="5" min="0" max="55" value="0" name="begin-m"
                     (input)="setHoursStamp($event, true,false)" #beginMin>
              <label class="input-group-text">Minute(s) : <span
                class="fw-bold">{{formSet.controls['begin'].value | slice:3 }}</span></label>
            </div>
          </div>
        </div>
        <div class="mb-3 drop-shadow-range">
          <label class="form-label">Fin</label>
          <div class="input-group">
            <div class="form-control">
              <input type="range" class="form-range" step="1" min="0" max="23" value="0" name="end-h"
                     (input)="setHoursStamp($event, false,true)" #endHour>
              <label class="input-group-text">Heure(s) : <span
                class="fw-bold">{{formSet.controls['end'].value | slice:0:2 }}</span></label>
            </div>
            <div class="form-control">
              <input type="range" class="form-range" step="5" min="0" max="55" value="0" name="end-m"
                     (input)="setHoursStamp($event, false,false)" #endMin>
              <label class="input-group-text">Minute(s) : <span
                class="fw-bold">{{formSet.controls['end'].value | slice:3 }}</span></label>
            </div>
          </div>
        </div>
      </form>
    </app-modal>
  `,
  styles: [
    `
      :host {
        display: flex;
        position: relative;
        flex-direction: column;
        gap: .4rem;
        padding: .4rem;
        padding-bottom: 4rem;
      }

      .add-btn {
        position: fixed;
        right: .4rem;
        bottom: 4rem;
      }

      .drop-shadow-range {
        .form-range {
          filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
        }
      }
    `
  ]
})
export class HoursSetupComponent extends AbstractListComponent {
  private db: string = "hours"
  @ViewChild('beginHour') inputBh: any;
  @ViewChild('beginMin') inputBm: any;
  @ViewChild('endHour') inputEh: any;
  @ViewChild('endMin') inputEm: any;

  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {

      this.list = res
    })
    this.resetForm()
  }

  getStrDay(d: number) {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay() + d)
    return date.toLocaleDateString('fr-FR', { weekday: "long" })
  }

  override getAction(act: any): any | boolean {
    if (act.action == "create") {
      this.resetForm()
    }
    return super.getAction(act);
  }


  setHoursStamp($event: any, isBegin: boolean, isHour: boolean) {
    $event.stopPropagation()
    const control = isBegin ? this.formSet.controls['begin'] : this.formSet.controls['end']
    const initTime = control.value.split(/:/).map((v: any) => Number(v))
    const value = $event.target.value.padStart(2, '0')
    const intTime = { hour: initTime[0].toString(), min: initTime[1].toString() }
    const setTime = () => {
      if (isHour) {
        return `${value}:${intTime.min.padStart(2, '0')}`
      }
      return `${intTime.hour.padStart(2, '0')}:${value}`
    }

    control.setValue(setTime(), { emitEvent: false })
    // control.setValue(setTime())
  }

  exportTimeValues(begin: any, end: any) {
    const bOutput = begin.split(/:/).map((v: any) => Number(v))
    const eOutput = end.split(/:/).map((v: any) => Number(v))
    return {
      begin: {
        hour: bOutput[0],
        min: bOutput[1],
      },
      end: {
        hour: eOutput[0],
        min: eOutput[1],
      }
    }
  }

  resetForm() {
    if (this.formSub) {
      this.formSub.unsubscribe()
    }

    this.formSet = new FormGroup({
      id: new FormControl(null),
      day: new FormControl(0),
      begin: new FormControl('00:00'),
      end: new FormControl('00:00')
    })

    this.formSub = this.formSet.valueChanges.subscribe((e) => {
      const { begin, end } = this.exportTimeValues(e.begin, e.end)
      const { inputBh, inputBm, inputEh, inputEm } = this
      inputBh.nativeElement.value = begin.hour
      inputBm.nativeElement.value = begin.min
      inputEh.nativeElement.value = end.hour
      inputEm.nativeElement.value = end.min
    })
  }

}
