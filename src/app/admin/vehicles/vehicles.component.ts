import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-vehicles',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-vehicle *ngFor="let v of list" [car]="v" (action)="getAction($event)"></app-vehicle>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(['create','vehicle'])">Ajouter</div>
    <app-modal (xhrSend)="prevSubmit($event)" title="Véhicule">
      <form [formGroup]="formSet" (submit)="prevSubmit($event)" *ngIf="event !== 'delete'">
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text input-label">Nom</span>
            <textarea class="form-control" name="name" id="name" formControlName="name" rows="3"></textarea>
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text input-label">Année</span>
            <input type="number" class="form-control" name="year" id="year" step="1" formControlName="year">
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text input-label">Prix</span>
            <input type="number" class="form-control" name="price" id="price" step="50" formControlName="price">
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text input-label">Kilom.</span>
            <input type="number" class="form-control" name="km" id="km" step="1000" formControlName="km">
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text input-label">énergie</span>
            <select class="form-select" name="fuel" id="fuel" formControlName="fuel">
              <option *ngFor="let opt of energies" [value]="opt.value">{{opt.name}}</option>
            </select>
          </div>
        </div>
        <div class="mb-3" formArrayName="options">
          <label class="form-label">Options</label>
          <div class="input-group mb-1" *ngFor="let opt of options.controls; let i=index">
            <div role="button" class="btn btn-secondary" (click)="resetOpt(i)" *ngIf="!areEquals(i)"><i
              class="bi bi-arrow-counterclockwise"></i></div>
            <input
              type="text" class="form-control car-opt"
              formControlName="{{i}}">
            <div role="button" class="btn btn-outline-danger" (click)="deleteOpt(i)"><i class="bi bi-trash"></i></div>
          </div>
          <div class="input-group mb-1">
            <div role="button" class="btn btn-outline-success w-100" (click)="addOpt()"><i class="bi bi-plus"></i></div>
          </div>
        </div>
      </form>
    </app-modal>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: .4rem;
        padding: .4rem;
        padding-bottom: 4rem;
      }

      .add-btn {
        position: fixed;
        right: .4rem;
        bottom: 4rem;
      }

      .input-label {
        background-color: rgba(140, 133, 134, 0.05);
      }

      textarea {
        resize: none;
      }

      .form-control, .form-select {
        background-color: transparent;
      }

      .input-group {
        box-shadow: 0 4px 6px 2px rgba(0, 0, 0, 0.1);
        border-radius: .375rem;
        background-color: #fafafa;

        .input-label {
          display: block;
          min-width: 6.3rem;
          text-align: center;
        }
      }
    `
  ]
})
export class VehiclesComponent extends AbstractListComponent {
  private db: string = "cars"
  public energies = [
    { name: 'Essence', value: 'essence' },
    { name: 'Diésel', value: 'diesel' },
    { name: 'Electrique', value: 'electric' },
    { name: 'Hybride', value: 'hybride' },
  ]
  private optVals!: string[]

  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      this.list = res
    })

    this.formSet = new FormGroup({
      id: new FormControl(),
      year: new FormControl(new Date().getFullYear()),
      km: new FormControl(0),
      price: new FormControl(0),
      name: new FormControl(''),
      fuel: new FormControl(this.energies[0]),
      mainPicture: new FormControl(''),
      options: new FormArray([]),
      galerie: new FormArray([])
    })
    // this.formSub = this.formSet.valueChanges.subscribe(ev => {})

  }

  areEquals(i: number): boolean {
    const { init, current } = this.exportOptValues(i)
    switch (true) {
      case init.length == 0:
        return true
      case init == current?.value:
        return true
      default:
        return false
    }
  }

  exportOptValues(i: number) {
    const field = this.options.get(i.toString())
    if (!this.optVals) {
      const initField = this.list.find(e => e.id == this.patchedElement).options
      this.optVals = [ ...initField ]
    }

    return {
      init: this.optVals[i],
      current: field
    }
  }

  get options(): FormArray {
    return this.formSet.get('options') as FormArray
  }


  optChange($event: any, index: number) {
    const value = $event.target.value
    const initialValue = this.options.get(index.toString())
  }

  resetOpt(i: number) {
    const { init, current } = this.exportOptValues(i)
    current?.setValue(init)
  }

  deleteOpt(i: number) {
    this.options.removeAt(i)
    this.optVals.splice(i, 1)
  }

  addOpt() {
    this.optVals.push('')
    this.options.push(new FormControl(''))
  }
}
