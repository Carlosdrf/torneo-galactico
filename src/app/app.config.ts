import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FORMLY_CONFIG, provideFormlyCore } from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useValue: { formFieldAppearance: 'fill' },
    },
    provideFormlyCore([
      ...withFormlyMaterial(),
      {
        validationMessages: [
          {
            name: 'required',
            message: 'Este campo es obligatorio',
          },
          {
            name: 'integer',
            message: 'Este campo solo admite numeros enteros',
          },
        ],
      },
    ]),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
