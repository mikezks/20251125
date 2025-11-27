import { httpResource } from '@angular/common/http';
import { Component, effect, input, model, numberAttribute } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { customError, Field, form, required, schema, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { initialPassenger, Passenger } from '../../logic-passenger/model/passenger';


// (3) Field Logic: disabled, readonly, hidden, default validators, custom validator functions
export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name, {
    when: ({ valueOf }) => valueOf(passengerPath.firstName) === 'Mary'
  });
  validate(passengerPath.passengerStatus, ({ value, valueOf }) => {
    const id = valueOf(passengerPath.id);
    console.log(id);
    const validPassengerStatus = ['A', 'C'];
    if (!validPassengerStatus.includes(value())) {
      return customError({
        kind: 'passengerStatus',
        message: 'Passenger Status is invalid - please enter one of the following options: '
          + validPassengerStatus.join(', ')
      });
    }
    return null;
  });
  
});


@Component({
  selector: 'app-passenger-edit',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    // (4) Field: Directive for Template Bindings
    Field
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  readonly id = input(0, { transform: numberAttribute });
  readonly isRequired = model(true);

  // (1) Data Model: Writable Signal
  protected readonly passengerResource = httpResource<Passenger>(() => ({
    url: 'https://demo.angulararchitects.io/api/passenger',
    params: { id: this.id() }
  }), { defaultValue: initialPassenger });

  // (2) Field State: value, valid, dirty, touched, readonly, hidden, etc.
  protected readonly editForm = form(this.passengerResource.value, passengerPath => {
    required(passengerPath.name, {
      when: () => this.isRequired() !== false
    });
  });

  constructor() {
    setTimeout(() => this.isRequired.set(false), 5_000);
    setTimeout(() => this.isRequired.set(true), 10_000);
    effect(() => console.log({ isRequired: this.isRequired() }));
  }

  protected save(): void {
    console.log(this.passengerResource.value());
  }
}
