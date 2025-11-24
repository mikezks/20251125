import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideDynamicNavigation } from '@flight-demo/shared/ai';
import { provideRouterFeature } from '@flight-demo/shared/state';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { lazyFeatures } from './lazy.features';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideRouter([],
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        defaultQueryParamsHandling: 'merge'
      }),
    ),
    provideDynamicNavigation(
      './api/navigation/config',
      APP_ROUTES,
      lazyFeatures
    ),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
  ]
};
