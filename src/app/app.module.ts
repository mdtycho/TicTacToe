import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Services
import {ChooseService} from './services/choose.service'

import { AppComponent } from './app.component';

import { GridComponent } from './grid/grid.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [ChooseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
