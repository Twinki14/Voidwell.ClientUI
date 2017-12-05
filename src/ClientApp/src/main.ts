﻿import * as $ from 'jquery';
window['$'] = window['jQuery'] = window['jquery'] = $;

import 'reflect-metadata';
import 'bootstrap';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { hmrBootstrap } from './hmr';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (module.hot) {
    hmrBootstrap(module, bootstrap);
} else {
    enableProdMode();
    bootstrap();
}