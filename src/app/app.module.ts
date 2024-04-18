  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { NZ_I18N } from 'ng-zorro-antd/i18n';
  import { zh_CN } from 'ng-zorro-antd/i18n';
  import { registerLocaleData } from '@angular/common';
  import zh from '@angular/common/locales/zh';
  import { FormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { LoginComponent } from './components/login/login.component';
  import { CitySearchComponent } from './components/city-search/city-search.component';
  import { SharedModule } from './shared/shared.module';
  import { NzPopoverModule } from 'ng-zorro-antd/popover';


  registerLocaleData(zh);

  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      CitySearchComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      SharedModule,
      NzPopoverModule
      
    ],
    providers: [
      { provide: NZ_I18N, useValue: zh_CN }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
