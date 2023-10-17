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
    <app-modal (xhrSend)="prevSubmit($event)" title="Véhicule" (close)="resetForm()">
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
        <div class="mb-3" formArrayName="galerie">
          <label class="form-label">Photos</label>
          <div class="row w-auto g-2">
            <div class="col-6 p-1 galerie-input" *ngFor="let img of galerie.controls; let i=index">
              <div class="inner-img input-group overflow-hidden">
                <div class="img-inputs p-0">
                  <div class="btn btn-secondary">
                    <input type="checkbox" class="form-check-input" [checked]="isMainPic(img)"
                           (click)="setMainPicture(i)">
                  </div>
                  <input type="file" class="d-none" (change)="setImg($event, i)" id="img-{{i}}"
                         [accept]="acceptFiles">

                  <div role="button" class="btn btn-outline-danger" (click)="galerie.removeAt(i)"><i class="bi bi-trash"></i></div>
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
            <div class="col-6 p-1 galerie-input">
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

      .galerie-input {
        height: 128px;
        .img-inputs {
          display: flex;
          height: 128px;
          flex-shrink: 0;
          flex-direction: column;
          width: fit-content;
          justify-content: stretch;

          i {
            display: block;
            margin: auto;
          }

          .btn {
            width: fit-content;
            flex-grow: 0;
            flex-shrink: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            &:first-child {
              border-radius: .375rem 0 0 0;
            }

            &:last-child {
              border-radius: 0 0 0 .375rem;
            }
          }
        }

        .inner-img {
          flex-wrap: nowrap;
          outline: 1px solid gray;
        }

        .img-input-wrap {
          flex-shrink: 1;
          max-height: 128px;
          width: 100%;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;

          img {
            display: block;
            max-width: 100%;
            margin: auto;
            box-shadow: 0 2px 12px 4px rgba(0, 0, 0, 0.2);
          }

          .img-overlay {
            position: absolute;
            visibility: hidden;
            opacity: 0;
            transition: 300ms ease;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;

            .btn {
              transition-delay: 0ms;
              transition: 150ms ease;
              opacity: 0;
              visibility: hidden;
              transform: translateY(200%);
            }
          }

          &:hover {
            .img-overlay {
              visibility: visible;
              opacity: 1;

              .btn {
                transition-delay: 100ms;
                opacity: 1;
                visibility: visible;
                transform: translateY(0%);
              }
            }
          }
        }

      }

      .add-img {
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
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
  createAction = {
    action: "create",
    dataType: "vehicle"
  }
  private optVals!: string[]
  acceptFiles: string = "image/png,image/jpeg,image/jpg"
  URLFiles: string[] = []

  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      this.list = res
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

  get galerie(): FormArray {
    return this.formSet.get('galerie') as FormArray
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
    const control = this.galerie.controls[i]
    this.URLFiles[i] = this.fileToUrl(file)
    control.setValue(file)
  }

  addImg() {
    this.galerie.push(new FormControl(''))
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
      galerie: new FormArray([])
    })
    // this.formSub = this.formSet.valueChanges.subscribe(ev => {
    //   console.log('update')})
  }

  setMainPicture(i: number) {
    const img = this.getImgName(this.galerie.controls[i])
    this.formSet.controls['mainPicture'].setValue(img)
  }

}
