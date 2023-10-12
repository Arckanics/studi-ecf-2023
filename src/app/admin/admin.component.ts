import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <div class="container-fluid overflow-hidden p-0 d-flex flex-column h-100">
      <header
        class="bg-white navbar border-bottom border-primary p-1 flex-shrink-0"
      >
        <ul class="nav justify-content-between w-100 p-1">
          <li class="nav-link p-0">
            <a class="btn nav-item"
               [ngClass]="{
                'btn-outline-primary': !rla.isActive,
                'btn-primary': rla.isActive
               }"
               routerLink="/admin" routerLinkActive #rla="routerLinkActive"
               [routerLinkActiveOptions]="{exact:true}">Accueil</a>
          </li>
          <li *ngFor="let item of list" class="nav-link p-0">
            <a class="btn nav-item"
               [ngClass]="{
                'btn-outline-primary': !rla.isActive,
                'btn-primary': rla.isActive
               }"
               [routerLink]="'/admin' + '/' + item.name" routerLinkActive #rla="routerLinkActive"
               [routerLinkActiveOptions]="{exact:true}">{{item.title}}</a>
          </li>
        </ul>
      </header>
      <section id="content" class="flex-grow-1">
        <router-outlet></router-outlet>
      </section>
      <footer
        id="footer"
        class="bg-white p-2 "
      >
        <span class="account-type">Role: {{getRole()}}</span>
      </footer>
    </div>

  `,
  styles: [
    `
      :host {
        display: block;
        box-sizing: border-box;
        height: 100dvh;
        width: 100vw;
        font-family: Barlow, sans-serif;
      }

      #content {
        position: relative;
      }

      .btn {
        font-weight: 500;
        font-family: Rajdhani, sans-serif;
      }

      .account-type {
        text-transform: capitalize;
      }
    `
  ]
})
export class AdminComponent {

  list: any
  private ls

  constructor() {
    this.ls = window.localStorage
    const initList = () => {
      const type: any = {
        user: [
          { name: 'vehicles', title: "Véhicules" },
          { name: 'comments', title: "Témoignages" }
        ],
        admin: [
          { name: 'services', url: 'services', title: "Services" },
          { name: 'hours', url: 'hours', title: "Hours" }
        ],
      }
      const user = this.ls.getItem('user_type') || "user"
      return type[user];
    }
    this.list = initList()
    console.log(this)
  }

  getRole() {
    const role = this.ls.getItem('user_type')

    return role === "admin" ? "administrateur" : "employé"
  }
}
