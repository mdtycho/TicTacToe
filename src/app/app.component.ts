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
    this.choose_service.RestartGame.subscribe((state)=>{this.restartGame(state)});
  }
  private choose_service:ChooseService;

  public isModalShown:boolean = true;

  modal_title:string = "Choose one of X or O";

  restartGame(state:string){
    if(state==="DRAW"){
      this.modal_title = "You have drawn,select X or O to start again";
    }else if(state==="AI"){
      this.modal_title = "You have lost :( ,select X or O to start again";
    }else{
      this.modal_title = "You have won :) , select X or O to start again";
    }
    this.isModalShown=true;
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  choseX():void{
    console.log('choose x');
    this.choose_service.ChooseOne.emit('X');
    this.autoShownModal.hide();
  }

  choseO():void{
    console.log('choose o');
    this.choose_service.ChooseOne.emit('O');
    this.autoShownModal.hide();
  }
  
}
