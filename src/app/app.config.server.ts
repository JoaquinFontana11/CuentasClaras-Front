import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { logged } from './guards/logged';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), logged
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
