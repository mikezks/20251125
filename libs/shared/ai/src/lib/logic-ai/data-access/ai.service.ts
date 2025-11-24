import { httpResource } from "@angular/common/http";
import { computed, inject, Injectable, linkedSignal, signal } from "@angular/core";
import { AI_BACKEND_URL } from "../config/ai.provider";
import { initalNavigationConfig, NavigationState } from "../../model-ai/ai.model";


@Injectable({
  providedIn: 'root'
})
export class AiService {
  private aiBackendUrl = inject(AI_BACKEND_URL);
  aiPrompt = signal('');
  aiResource = httpResource<NavigationState>(() => this.aiPrompt() === '' ? undefined : ({
    url: this.aiBackendUrl,
    params: {
      describe: this.aiPrompt()
    }
  }), {
    defaultValue: initalNavigationConfig
  });
  formConfig = computed(() => this.aiResource.hasValue()
    ? this.aiResource.value()
    : initalNavigationConfig
  );
  dirtyConfig = linkedSignal(({
    source: this.aiResource.status,
    computation: () => true
  }));
}
