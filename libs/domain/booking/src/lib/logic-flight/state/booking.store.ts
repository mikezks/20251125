import { inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';
import { FlightService } from '../data-access/flight.service';
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'London',
      to: 'New York',
      urgent: false
    },
    basket: {
      3: true,
      5: true,
    } as Record<number, boolean>,
    flights: [] as Flight[],
  }),
  withComputed(store => ({
    delayedFlights: () => store.flights().filter(flight => flight.delayed),
  })),
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
    updateBasket: (id: number, selected: boolean) => patchState(store, state => ({
      basket: {
        ...state.basket,
        [id]: selected
      }
    })),
    loadFlights: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to, filter.urgent
      ).pipe(
        tapResponse({
          next: flights => patchState(store, { flights }),
          error: err => console.error(err)
        }),
      )),      
    ))
  })),
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter),
  }))
);
