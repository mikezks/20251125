import { Routes } from "@angular/router";
import { NavigationConfig } from "@flight-demo/shared/navigation";
import { loadRemoteModule } from "@angular-architects/native-federation";
import { LazyFeatures } from "../model-ai/ai.model";


export function transformConfigToRoutes(
  config: NavigationConfig,
  staticRoutes: Routes,
  lazyFeatures: LazyFeatures,
  insertAtIndex = 2
): Routes {
  const dynRoutes = config
    .map(item => {
      return lazyFeatures[item.route]
        ? {
          path: item.route,
          loadChildren: lazyFeatures[item.route]
        } : {
          path: item.route,
          loadChildren: () => loadRemoteModule(
            item.route, './routes'
          )
        };
    }
    )
  const routes = [
    ...staticRoutes.slice(0, insertAtIndex),
    ...dynRoutes,
    ...staticRoutes.slice(insertAtIndex)
  ];
  
  return routes;
}
