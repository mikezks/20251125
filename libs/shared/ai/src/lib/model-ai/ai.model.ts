import { LoadChildrenCallback } from "@angular/router";
import { NavigationConfig } from "@flight-demo/shared/navigation";


export type NavigationState = {
  navigationConfig: NavigationConfig;
  message: string;
};

export const initalNavigationConfig: NavigationState = {
  navigationConfig: [],
  message: ''
};

export type LazyFeatures = Record<string, LoadChildrenCallback>;
