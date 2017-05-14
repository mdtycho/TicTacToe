import { Component, OnInit } from '@angular/core';
import {Cell} from '../cell.model';

// Services
import {ChooseService} from '../services/choose.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private choose_service:ChooseService) {
    console.log("wooo");
    this.choose_service.ChooseOne.subscribe((choice)=>{this.player_choice=choice})
   }

  public board:Array<Array<Cell>> = new Array<Array<Cell>>();

  // player's choice
  player_choice:string = "";

  changeStuff(row:number,col:number){
    if(this.player_choice==='X'){
      this.board[row][col].State = false;
    }else{
      this.board[0][0].State = true;
    }
  }


  ngOnInit() {
    for(var i=0;i<3;i++){
      this.board.push([]);
      for(var j=0;j<3;j++){
        let cell:Cell = new Cell();
        this.board[i].push(cell);
      }
    }
    console.log(this.board);
  }

}
