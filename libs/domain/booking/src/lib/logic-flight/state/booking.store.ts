import {patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
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
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
  }))
);
