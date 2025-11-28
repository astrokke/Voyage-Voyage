import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { travelFeatureKey, travelReducer } from './state/travel/travel.reducer';
import { notificationFeatureKey, notificationReducer } from './state/notification/notification.reducer';
import { TravelEffects } from './state/travel/travel.effects';
import { NotificationEffects } from './state/notification/notification.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      [travelFeatureKey]: travelReducer,
      [notificationFeatureKey]: notificationReducer
    }),
    provideEffects([TravelEffects, NotificationEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
