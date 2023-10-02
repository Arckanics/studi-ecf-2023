import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid p-0">
        <div class="navbar-brand ">
          <img src="/assets/logo.png" height="80" alt="logo"/>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navMenu">
          <ul class="navbar-nav flex-row justify-content-between gap-md-3 py-md-4 py-2 gap-2">
            <li *ngFor="let nav of navs" class="nav-item flex-grow-1 w-100">
              <a routerLink="{{nav.url}}" class="btn d-block" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" [ngClass]="{
                'btn-dark': rla.isActive, 'btn-outline-dark': !rla.isActive
            }" routerLinkActive #rla="routerLinkActive" [routerLinkActiveOptions]="{exact:true}">{{nav.name}}</a>
            </li>
          </ul>
        </div>
      </div>

    </nav>

  `,
  styles: [
  ]
})
export class NavigationComponent {

  public navs: { url:string, name:string }[] = [
    {url: "/", name: "Accueil"},
    {url: "/vehicles", name: "Nos véhicules"},
  ]
}
