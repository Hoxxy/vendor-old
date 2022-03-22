import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<p>404 Page Not Found</p>`,
  styles: [`
  p {
    text-align: center;
    font-size: x-large;
    font-weight: bolder;
    padding: 200px;
  }
`]
})
export class NotFoundComponent {
  constructor() { }
}