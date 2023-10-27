import { Directive, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { catchError, Subscription } from "rxjs";

@Directive()
export class AbstractListComponent implements OnInit, OnDestroy {
  public act: any
  list!: any[]
  protected sub!: Subscription
  protected formSub!: Subscription
  protected patchedElement!: number
  protected db!: string
  public modalToggle: boolean = false
  errorMsg!: string
  formSet!: FormGroup
  event: string = ''
  createAction = {
    action: "create",
  }

  fillLoop(qty: number) {
    return new Array(qty).fill(0).map((v, i) => i + 1)
  }

  getAction(act: any) {

    this.event = act.action
    this.act = {...act}
    // @ts-ignore
    // this.event !== 'delete' ? new bootstrap.Modal('#admin-modal').show() : null


    this.modalToggle = (this.event !== 'delete')
    const pathData = () => {
      const data = this.list.find(e => e.id == act.id)
        Object.entries(data).map(([ k, v ]) => {
          const control: any = this.formSet.controls[k]
          if (Array.isArray(v)) {
            v.map(value => {
              (control as FormArray).push(new FormControl(value))
            })
          } else {
            control.setValue(v)
          }
        })
      this.patchedElement = act.id
      return this.event === 'edit' ? data : null
    }

    switch (this.event) {
      case 'edit':
        return pathData()
      case 'delete':
        return act
      default:
        return false
    }
  }

  prevSubmit($event: any) {
    if ($event && typeof $event !== "string") {
      $event.preventDefault()
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    if (this.formSub) {
      this.formSub.unsubscribe()
    }
  }

  closeModal() {
    this.modalToggle = false
    this.errorMsg = ""
  }

  fileToUrl(file: any) {
    return URL.createObjectURL(file)
  }

  getTypeOf(v: any) {
    return typeof v
  }


  submitForm($event: any, bdd: any = null) {
    this.prevSubmit($event);
    const { event } = this
    let request:any;
    const errorMsg = (err:any) => {
      this.errorMsg = `Erreur : ${err.status}`
      return err
    }
    switch (true) {
      case event == 'create':
        request = bdd.post(this.db, this.formSet.value)
          .pipe(catchError(errorMsg))
          .subscribe((e: any) => {
            request.unsubscribe()
            if (e.status == 200) {
              const data: any = { ...e.body }
              this.list.push({...data})
              this.closeModal()
              return true
            }

            return false
          })
        break
      case event == 'edit':
        request = bdd.put(this.db, this.formSet.value)
          .pipe(catchError(errorMsg))
          .subscribe((e: any) => {
            request.unsubscribe()
            if (e.status == 200) {
              const data: any = { ...e.body }
              let i = this.list.find((item) => item.id === data.id)
              if (i) {
                Object.entries(i).map(([ k, v ]) => i[k] = data[k]);
              }
              this.closeModal()
              return true
            }

            return false

          })
        break;
        case event == 'delete':
        request = bdd.delete(this.db, this.act.id)
          .pipe(catchError(errorMsg))
          .subscribe((e: any) => {
            request.unsubscribe()
            if (e.status == 200) {
              let itemIndex;
              let i = this.list.find((item, index) => {
                itemIndex = index
                return item.id === this.act.id
              })

              if (itemIndex) {
                this.list.splice(itemIndex,1)
              }
              return true
            }

            return false

          })
        break;
      default:
        break;
    }

  }
}
