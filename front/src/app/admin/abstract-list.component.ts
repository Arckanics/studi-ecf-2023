import { Directive, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

@Directive()
export class AbstractListComponent implements OnInit, OnDestroy {
  public act: any
  list!: any[]
  protected sub!: Subscription
  protected formSub!: Subscription
  protected patchedElement!: number
  protected db!:string
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
    // @ts-ignore
    this.event !== 'delete' ? new bootstrap.Modal('#admin-modal').show() : null

    const pathData = () => {
      const data = this.list.find(e => e.id == act.id)
      if (this.event !== 'delete') {
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
      }
      this.patchedElement = act.id
      return this.event === 'edit' ? data : null
    }

    switch (true) {
      case this.event == 'edit':
        return pathData()
      case this.event == 'delete':
        return pathData()
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

  fileToUrl(file: any) {
    return URL.createObjectURL(file)
  }

  getTypeOf(v: any) {
    return typeof v
  }
}
