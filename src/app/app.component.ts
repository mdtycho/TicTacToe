import { Component,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;

  public isModalShown:boolean = true;

  public onHidden():void {
    this.isModalShown = false;
  }
  
}
