import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Quill from "quill";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

class Counter {
  private options: any;
  private quill: any;
  private container: any;
  constructor(quill:any, options:any) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on('text-change', this.update.bind(this));
    this.update();  // Account for initial contents
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit === 'word') {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length-1;
    }
  }

  update() {
    const length = this.calculate();
    let label = this.options.unit;
    if (length >= 1) {
      label += 's';
    }
    this.container.innerText = length + ' ' + "/5000";
  }
}

Quill.register('modules/counter', Counter);
