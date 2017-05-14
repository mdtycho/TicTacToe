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

   // An array of Cell[] representing our board
  public board:Array<Array<Cell>> = new Array<Array<Cell>>();

  // player's choice
  player_choice:string = "";

  // handler for cell click events
  changeStuff(row:number,col:number){
    if( this.board[row][col].State===null){
      if(this.player_choice==='X'){
      this.board[row][col].State = false;
    }else{
      this.board[row][col].State = true;
    }
    if(this.getEmptyCells().length===0){
      this.restartGame();
      return;
    }
    }
  }

  // start the game
  startGame():number{
    var c:number = 0;
    while(c<200){
      if(this.getEmptyCells().length===0){
        this.restartGame();
        return 200;
      }else{
        c++;
      }
    }
  }

  // check which cells are empty and return an array with those cells
  getEmptyCells():Array<Cell>{
    var empty_cells:Array<Cell> = [];
    for(var i = 0;i<3;i++){
      for(var j=0;j<3;j++){
        if(this.board[i][j].State===null){
          empty_cells.push(this.board[i][j]);
        }
      }
    }

    return empty_cells;
  }

  // refresh the board and start again
  restartGame():void{
    for(var i = 0;i<3;i++){
      for(var j=0;j<3;j++){
        this.board[i][j].State = null;
      }
    }
    this.choose_service.RestartGame.emit(null);
  }


  ngOnInit() {
    for(var i=0;i<3;i++){
      this.board.push([]);
      for(var j=0;j<3;j++){
        let cell:Cell = new Cell();
        this.board[i].push(cell);
      }
    }
    //this.startGame();
    console.log(this.board);
  }

}
