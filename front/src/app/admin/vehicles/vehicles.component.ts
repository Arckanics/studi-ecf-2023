import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-vehicles',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-vehicle *ngFor="let v of list" [car]="v" (action)="getAction($event)"></app-vehicle>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Ajouter</div>
    <app-modal (xhrSend)="prevSubmit($event)" title="Véhicule" [ngClass]="{
        'd-none' : !modalToggle
    }"
               [errorMsg]="errorMsg"
               (submit)="submitForm($event)"
               (close)="closeModal()">
      <form [formGroup]="formSet" (submit)="prevSubmit($event)" *ngIf="event !== 'delete'" class="admin-form">
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
            <div role="button" class="btn btn-secondary" (click)="resetOpt(i)" *ngIf="!areOptEquals(i)"><i
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
        <div class="mb-3" formArrayName="gallery">
          <label class="form-label">Photos</label>
          <div class="row w-auto g-2">
            <div class="col-6 p-1 gallery-input" *ngFor="let img of gallery.controls; let i=index">
              <div class="inner-img input-group overflow-hidden">
                <div class="img-inputs p-0">
                  <div class="btn btn-secondary">
                    <input type="checkbox" class="form-check-input" [checked]="isMainPic(img)"
                           (click)="setMainPicture(i)">
                  </div>
                  <input type="file" class="d-none" (change)="setImg($event, i)" id="img-{{i}}"
                         [accept]="acceptFiles">

                  <div role="button" class="btn btn-outline-danger" (click)="gallery.removeAt(i)"><i class="bi bi-trash"></i></div>
                </div>
                <label class="img-input-wrap position-relative" for="img-{{i}}">
                  <img *ngIf="getTypeOf(img.value) == 'string'" [src]="URLFiles[i] || img.value" [alt]="URLFiles[i] || img.value"/>
                  <img *ngIf="getTypeOf(img.value) !== 'string'" [src]="URLFiles[i]" [alt]="URLFiles[i]"/>
                  <span class="img-overlay">
                    <span class="btn btn-dark">
                      <i class="bi bi-image" ></i>
                      <span class="fs-6 small"> &lt;Img/&gt;</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="col-6 p-1 gallery-input">
                <div role="button" class="btn btn-outline-success w-100 add-img btn-lg" (click)="addImg()">
                  <i class="bi bi-plus-lg"></i>
                </div>
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
        flex-direction: column;
        position: relative;
        gap: .4rem;
        padding: .4rem;
        padding-bottom: 4rem;
      }
    `
  ]
})
export class VehiclesComponent extends AbstractListComponent {
  public energies = [
    { name: 'Essence', value: 'essence' },
    { name: 'Diésel', value: 'diesel' },
    { name: 'Electrique', value: 'electric' },
    { name: 'Hybride', value: 'hybride' },
  ]
  private optVals!: string[]
  acceptFiles: string = "image/png,image/jpeg,image/jpg"
  URLFiles: string[] = []

  constructor(private bdd: DatabaseService) {
    super()
    this.db = "cars"
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      let result = [...res];
      result = result.map((v) => {
        v.gallery = JSON.parse(v.gallery)
        v.options = JSON.parse(v.options)
        return v
      })
      this.list = result
    })
    this.resetForm()
  }

  override getAction(act: any): any | boolean {
    if (act.action == 'create') {
      this.optVals = []
      this.URLFiles = []
    }
    return super.getAction(act);
  }

  areOptEquals(i: number): boolean {
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

  getImgName(field: any) {
    return this.getTypeOf(field.value) === "string" ? field.value : field.value.name
  }

  isMainPic(src: any) {
    const current = this.formSet.controls['mainPicture'].value
    const value = this.getImgName(src)
    return current == value
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

  get gallery(): FormArray {
    return this.formSet.get('gallery') as FormArray
  }

  override ngOnInit() {
    super.ngOnInit();
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

  setImg($event: any, i: number) {
    const file = $event.target.files[0]
    const control = this.gallery.controls[i]
    this.URLFiles[i] = this.fileToUrl(file)
    control.setValue(file)
  }

  addImg() {
    this.gallery.push(new FormControl(''))
  }


  resetForm() {

    this.formSet = new FormGroup({
      id: new FormControl(),
      year: new FormControl(new Date().getFullYear()),
      km: new FormControl(0),
      price: new FormControl(0),
      name: new FormControl(''),
      fuel: new FormControl(this.energies[0]),
      mainPicture: new FormControl(''),
      options: new FormArray([]),
      gallery: new FormArray([])
    })
    // this.formSub = this.formSet.valueChanges.subscribe(ev => {
    //   console.log('update')})
  }

  setMainPicture(i: number) {
    const img = this.getImgName(this.gallery.controls[i])
    this.formSet.controls['mainPicture'].setValue(img)
  }

}
