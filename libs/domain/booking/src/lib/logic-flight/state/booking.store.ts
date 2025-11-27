import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { entityConfig, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { FlightService } from '../data-access/flight.service';
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';


export interface BookingState {
  filter: FlightFilter;
  basket: Record<number, boolean>;
}

export const initalBookingState: BookingState = {
  filter: {
    from: 'London',
    to: 'New York',
    urgent: false
  },
  basket: {
    3: true,
    5: true,
  },
};

export const flightConfig = entityConfig({
  entity: type<Flight>(),
  collection: 'flight',
  // selectId: flight => flight.id,
});


export const BookingStore = signalStore(
  { providedIn: 'root' },
  // State
  withState(initalBookingState),
  withEntities(flightConfig),
  withComputed(store => ({
    delayedFlights: () => store.flightEntities ().filter(flight => flight.delayed),
  })),
  withProps(() => ({
    _flightService: inject(FlightService)
  })),
  // Updater
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, 
      setAllEntities(flights, flightConfig)
    ),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
  })),
  // Side-Effects
  withMethods(store => ({
    loadFlights: rxMethod<FlightFilter>(pipe(
      switchMap(filter => store._flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => store.setFlights(flights),
          error: err => console.error(err)
        }),
      )),      
    )),
    loadFlightById: rxMethod<number>(pipe(
      // TODO: implements loading topic
    )),
  })),
  // Store Lifecycle Hooks
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter),
  }))
);
