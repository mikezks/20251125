import { HttpClient } from "@angular/common/http";
import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer, Type } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { AbstractNavigationService, DEFAULT_SERVICE, NavigationConfig, NavigationService } from "@flight-demo/shared/navigation";
import { map, tap } from "rxjs";
import { transformConfigToRoutes } from "../../util-ai/ai.util";
import { LazyFeatures } from "../../model-ai/ai.model";


export const AI_BACKEND_URL = new InjectionToken<string>('AI_BACKEND_URL', {
  providedIn: 'root',
  factory: () => './api/openai/navigation'
});

export const LAZY_FEATURES = new InjectionToken<LazyFeatures>('LAZY_FEATURES');

export const STATIC_ROUTES = new InjectionToken<Routes>('STATIC_ROUTES');

export function injectConfigToRoutes(): (
  config: NavigationConfig,
  insertAtIndex?: number
) => Routes {
  const staticRoutes = inject(STATIC_ROUTES);
  const lazyFeatures = inject(LAZY_FEATURES);

  return (
    config: NavigationConfig,
    insertAtIndex = 2
  ) => transformConfigToRoutes(
    config, staticRoutes, lazyFeatures, insertAtIndex
  );
}

export function provideDynamicNavigation(
  path: string,
  staticRoutes: Routes,
  lazyFeatures: LazyFeatures,
  insertAtIndex = 2,
  navService: Type<AbstractNavigationService> = DEFAULT_SERVICE
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NavigationService,
      useClass: navService
    },
    {
      provide: STATIC_ROUTES,
      useValue: staticRoutes
    },
    {
      provide: LAZY_FEATURES,
      useValue: lazyFeatures
    },
    provideAppInitializer((
      http = inject(HttpClient),
      router = inject(Router),
      nav = inject(NavigationService),
      transformConfigToRoutes = injectConfigToRoutes()
    ) => http.get<NavigationConfig>(path).pipe(
      map(config => config.slice(0, 1)),
      tap(config => {
        nav.state.set(config);
        const routes = transformConfigToRoutes(config, insertAtIndex);
        router.resetConfig(routes);
        router.initialNavigation();
      })
    ))
  ]);
}
