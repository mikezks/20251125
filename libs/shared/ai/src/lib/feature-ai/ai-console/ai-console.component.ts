import { Component, effect, inject } from '@angular/core';
import { NonNullableFormBuilder, PristineChangeEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '@flight-demo/shared/navigation';
import { filter } from 'rxjs';
import { AiService } from '../../logic-ai';
import { injectConfigToRoutes } from '../../logic-ai/config/ai.provider';
import { NavigationState } from '../../model-ai/ai.model';


const DEFAULT_PROMPT = [
  `add a view to lookup flights, but only if flights can be removed.`,
  `i wanna have the checkin domain added.`,
  `boarding is not needed.`,
].join('\n');

const REMOVE_PROMPT = [
  `remove all views.`,
].join('\n');


@Component({
  selector: 'app-ai-console',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ai-console.component.html',
  styleUrl: './ai-console.component.scss'
})
export class AiConsoleComponent {
  protected aiService = inject(AiService);
  protected router = inject(Router);
  protected nav = inject(NavigationService);
  private transformConfigToRoutes = injectConfigToRoutes();

  protected describeForm = inject(NonNullableFormBuilder).group({
    describe: ['', [
      Validators.required
    ]]
  });
  protected structureForm = inject(NonNullableFormBuilder).group({
    config: ['', [
      Validators.required
    ]]
  });

  constructor() {
    effect(() => this.describeForm.controls.describe.setValue(
      this.aiService.aiPrompt()
    ));
    effect(() => this.structureForm.controls.config.setValue(
      JSON.stringify(this.aiService.formConfig(), null, ' ')
    ));
    this.structureForm.events.pipe(
      filter(event => event instanceof PristineChangeEvent)
    ).subscribe(() => this.aiService.dirtyConfig.set(true));
  }

  setDemoPrompt(): void {
    this.describeForm.controls.describe.setValue(DEFAULT_PROMPT);
  }

  setRemovePrompt(): void {
    this.describeForm.controls.describe.setValue(REMOVE_PROMPT);
  }

  submit(): void {
    if (this.describeForm.controls.describe.value === this.aiService.aiPrompt()) {
      this.aiService.aiResource.reload();
    } else {
      this.aiService.aiPrompt.set(this.describeForm.controls.describe.value);
    }
  }

  updateFormConfig(): void {
    const config: NavigationState = JSON.parse(this.structureForm.controls.config.value);
    this.nav.state.set([
      {
        route: 'home',
        label: 'Home',
        icon: 'home'
      },
      ...config.navigationConfig
    ]);
    const routes = this.transformConfigToRoutes(config.navigationConfig);
    this.router.resetConfig(routes);
    this.aiService.aiResource.set(config);
    this.structureForm.markAsPristine();
    this.aiService.dirtyConfig.set(false);
  }
}
