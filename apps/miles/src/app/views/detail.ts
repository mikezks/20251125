import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-overview',
  template: `
    <h2>Your Miles Details</h2>

    <p>You earned 5000 miles for Flight {{ id() }}.</p>
  `
})
export class Detail {
  id = input.required<number, unknown>({ transform: numberAttribute });
}
