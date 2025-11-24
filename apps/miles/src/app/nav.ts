import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav',
  imports: [
    RouterLink, RouterOutlet
  ],
  template: `
    <ul>
      <li>
        <a routerLink="overview">Overview</a>
      </li>
      <li>
        <a routerLink="detail/3">Detail</a>
      </li>
    </ul>

    <router-outlet />
  `,
  styles: `
    a {
      &:link, &:visited, &:active {
        color: darkblue;
      }
    }
  `
})
export class Nav {
  protected readonly title = signal('miles');
}

export default Nav;
