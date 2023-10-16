import { Directive, OnInit } from "@angular/core";

@Directive()
export class AbstractListComponent implements OnInit {

  public act: any
  dataPut: any
  list!: any[]
  getAction(act:any) {
    if (act.dataType == "edit" || "create") {
      // @ts-ignore
      new bootstrap.Modal('#admin-modal').show()
      this.dataPut = this.list.filter(e => e.id == act.id)
    }
  }

  ngOnInit(): void {

  }
}
