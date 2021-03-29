import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkipToTargetComponent } from '@core/accessibility/skip-to-target/skip-to-target.component';

@NgModule({
  declarations: [
    AppComponent,
    SkipToTargetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
