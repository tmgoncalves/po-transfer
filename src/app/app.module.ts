import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoButtonModule, PoContainerModule, PoDynamicModule, PoGaugeModule, PoListViewModule, PoLoadingModule, PoModule, PoStepperModule, PoWidgetModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoDynamicModule,
    PoButtonModule,
    HttpClientModule,
    PoStepperModule,
    PoListViewModule,
    PoContainerModule,
    PoLoadingModule,
    PoWidgetModule,
    PoGaugeModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
