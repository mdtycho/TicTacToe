import { Component,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ChooseService} from './services/choose.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;

  constructor(choose_service:ChooseService){
    this.choose_service = choose_service;
  }
  private choose_service:ChooseService;

  public isModalShown:boolean = true;

  public onHidden():void {
    this.isModalShown = false;
  }

  choseX():void{
    this.choose_service.ChooseOne.emit('X');
  }

  choseO():void{
    this.choose_service.ChooseOne.emit('O');
  }
  
}
