import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-vehicles',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-vehicle *ngFor="let v of list" [car]="v" (action)="getAction($event)"></app-vehicle>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Ajouter</div>
    <app-modal title="Véhicule"
               [ngClass]="{
                'd-none': !modalToggle
               }"
               [errorMsg]="errorMsg"
               (xhrSend)="submitForm(null)"
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
        <div class="mb-3" formArrayName="gallery">
          <label class="form-label">Photos</label>
          <div class="row w-auto g-2">
            <div class="col-6 p-1 gallery-input" *ngFor="let img of gallery.controls; let i=index">
              <div class="inner-img input-group overflow-hidden">
                <div class="img-inputs">
                  <div class="btn btn-secondary">
                    <input type="checkbox" class="form-check-input" [checked]="isMainPic(img)"
                           (click)="setMainPicture(i)">
                  </div>
                  <input type="file" class="d-none" (change)="setImg($event, i)" id="img-{{i}}"
                         [accept]="acceptFiles">

                  <div role="button" class="btn btn-outline-danger" (click)="gallery.removeAt(i)"><i class="bi bi-trash"></i></div>
                </div>
                <label class="img-input-wrap position-relative" for="img-{{i}}">
                  <img *ngIf="getTypeOf(img.value) == 'string'" [src]="URLFiles[i] || '/img/'+img.value" [alt]="URLFiles[i] || img.value"/>
                  <img *ngIf="getTypeOf(img.value) !== 'string'" [src]="URLFiles[i]" [alt]="URLFiles[i]"/>
                  <span class="img-overlay">
                    <span class="btn btn-light btn-sm">
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
        <div class="mb-3" formArrayName="options">
          <label class="form-label">Options</label>
          <div class="input-group mb-1" *ngFor="let opt of options.controls; let i=index">
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

      .gallery-input > .inner-img {
        position: relative;
        height: 185px;

        .img-inputs {
          z-index: 50;
          position: absolute;
          padding: .4rem;
          width: 100%;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: space-between;

          .btn {
            filter: drop-shadow(1px 1px 3px black);
          }
        }

        .img-input-wrap {
          z-index: 35;
          display: block;
          max-height: 100%;
          width: 100%;

          img {
            height: 100%;
          }

          .img-overlay {
            z-index: 40;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: 350ms ease;
            cursor: pointer;
            .btn {
              position: absolute;
              top: .4rem;
              right: .4rem;
              transition-delay: 0ms;
              transition: 200ms;
              opacity: 0;
              visibility: hidden;
              transform: translateY(-100%);
            }
            &:hover {
              background-color: rgba(0, 0, 0, 0.5);
              .btn {
                transition-delay: 200ms;
                visibility: visible;
                opacity: 1;
                transform: translateY(0%);
              }
            }
          }
        }
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
  acceptFiles: string = "image/png,image/jpeg,image/jpg,image/webp"
  URLFiles: string[] = []

  constructor(private bdd: DatabaseService, private http: HttpClient) {
    super()
    this.db = "cars"
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      let result = [...res];
      result = result.map((v) => {
        v.gallery = JSON.parse(v.gallery)
        v.options = JSON.parse(v.options)
        v.gallery.unshift(v.mainPicture)
        return v
      })
      this.list = result
    })
    this.resetForm()
  }

  override getAction(act: any): any | boolean {
    this.resetForm()
    if (act.action !== 'create') {
      this.URLFiles = []
    }
    super.getAction(act);
    if (act.action == 'delete') {
      this.submitForm(act)
    }
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

    if (!this.optVals) {
      const opts = this.list.find(e => e.id == this.patchedElement)
      this.optVals = []
      if (opts) {
        this.optVals = [...opts.options]
      }
    }

    const field = this.options.get(i.toString())

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

  deleteOpt(i: number) {
    this.options.removeAt(i)
    this.optVals.splice(i, 1)
  }

  addOpt() {
    if (!this.optVals) {
      this.optVals = []
    }
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
      fuel: new FormControl('essence'),
      mainPicture: new FormControl(null),
      options: new FormArray([]),
      gallery: new FormArray([])
    })
  }

  setMainPicture(i: number) {
    const img = this.getImgName(this.gallery.controls[i])
    this.formSet.controls['mainPicture'].setValue(img)
  }

  override closeModal() {
    this.optVals = [];
    super.closeModal();
  }

  override submitForm($event: any) {
    const fD = new FormData()
    if (this.event !== 'delete') {
      for (let control in this.formSet.controls) {
        switch (control) {
          case 'options':
            const opt = [...this.options.value]
            fD.append(control, JSON.stringify(opt))
            break
          case 'gallery':
            if (this.formSet.controls[control].value.length > 0) {
              this.gallery.controls.map((img,i) => {
                fD.append('gallery-'+i, img.value)
              })
            }
            break
          case 'mainPicture':
            if (this.formSet.controls[control].value !== null) {
              fD.append(control, this.formSet.controls[control].value)
            }
            break
          default:
            fD.append(control, this.formSet.controls[control].value)
        }
      }

    }
    const formatEntity = (car:any) => {
      car.options = JSON.parse(car.options)
      car.gallery = JSON.parse(car.gallery)
      car.gallery.unshift(car.mainPicture)
      return car;
    }
    switch (this.event) {
      case 'edit':
        const id = this.formSet.value.id
        this.http.post(`${this.db}`, fD, {headers: this.bdd.getHeaders()}).subscribe((e:any) => {
          let carIndex = this.list.length;
          this.list.find((c, i) => {
            carIndex = i
            return c.id == id
          })
          let car = {...e}
          this.list[carIndex] = formatEntity(car)
        })
        break
      case 'create':
        fD.delete('id');
        this.http.post(`${this.db}`, fD, {headers: this.bdd.getHeaders()}).subscribe((e:any) => {
          let car = {...e}

          this.list.push(formatEntity(car))
        })
        break
      default:
        this.bdd.delete(this.db, $event.id).subscribe((e) => {
          let carIndex = null;
          const car = this.list.find((car, index) => {
            carIndex = index
            car.id = $event.id
          })
          if (carIndex) {
            this.list.splice(carIndex,1)
          }

        })
    }
    this.closeModal();
  }

}
