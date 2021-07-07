import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbsenceManagerComponent } from './absence-manager/absence-manager.component';
import { HeaderModule } from "./header/header.module";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    AbsenceManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
