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

  // mapping X and O to booleans

  map_XO = {
    'X':false,
    'O':true
  }

  // milliseconds to wait before showing modal
  static MTW:number = 1000;

  // handler for cell click events
  changeStuff(row:number,col:number){
    if( this.board[row][col].State===null){
      if(this.player_choice==='X'){
      this.board[row][col].State = false;
    }else{
      this.board[row][col].State = true;
    }
    if(this.getEmptyCells().length===0){
      if(this.scorer()===null){
        setTimeout(()=>{this.restartGame("DRAW")},GridComponent.MTW);
      }else{
        setTimeout(()=>{this.restartGame("PLAYER")},GridComponent.MTW);
      }
      return;
    }else if(this.scorer()!==null){
      setTimeout(()=>{this.restartGame("PLAYER")},GridComponent.MTW);
    }else{
      let arr = this.getEmptyCells();
      let rand = arr[Math.floor(Math.random()*arr.length)];
      this.aiMakeMove(rand);
      if(this.scorer()!==null){
        setTimeout(()=>{this.restartGame("AI")},GridComponent.MTW);
        return;
      }
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
  restartGame(state:string):void{
    for(var i = 0;i<3;i++){
      for(var j=0;j<3;j++){
        this.board[i][j].State = null;
        this.board[i][j].winningSet = false;
      }
    }
    this.choose_service.RestartGame.emit(state);
  }

  // AI makes a move

  aiMakeMove(cell:Cell){
    cell.State = this.player_choice==='X'?true:false;
  }

  // Minmax algorithm for generating smart ai moves

  minimax(){}

  // Scoring function
  scorer():boolean{
    // Score rows

    let x:boolean= this.board[0][0].State,y:boolean=this.board[0][1].State,z:boolean =this.board[0][2].State;
    if(x==true && (y===true && z === true)){
      this.board[0][0].winningSet = true;
      this.board[0][1].winningSet = true;
      this.board[0][2].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][0].winningSet = true;
      this.board[0][1].winningSet = true;
      this.board[0][2].winningSet = true;
      return false;
    }

    x= this.board[1][0].State,y=this.board[1][1].State,z =this.board[1][2].State;
    if(x==true && (y===true && z === true)){
      this.board[1][0].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[1][2].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[1][0].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[1][2].winningSet = true;
      return false;
    }

    x= this.board[2][0].State,y=this.board[2][1].State,z =this.board[2][2].State;
    if(x==true && (y===true && z === true)){
      this.board[2][0].winningSet = true;
      this.board[2][1].winningSet = true;
      this.board[2][2].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[2][0].winningSet = true;
      this.board[2][1].winningSet = true;
      this.board[2][2].winningSet = true;
      return false;
    }

    // score columns

    x= this.board[0][0].State,y=this.board[1][0].State,z =this.board[2][0].State;
    if(x==true && (y===true && z === true)){
      this.board[0][0].winningSet = true;
      this.board[1][0].winningSet = true;
      this.board[2][0].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][0].winningSet = true;
      this.board[1][0].winningSet = true;
      this.board[2][0].winningSet = true;
      return false;
    }

    x= this.board[0][1].State,y=this.board[1][1].State,z =this.board[2][1].State;
    if(x==true && (y===true && z === true)){
      this.board[0][1].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][1].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][1].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][1].winningSet = true;
      return false;
    }

    x= this.board[0][2].State,y=this.board[1][2].State,z =this.board[2][2].State;
    if(x==true && (y===true && z === true)){
      this.board[0][2].winningSet = true;
      this.board[1][2].winningSet = true;
      this.board[2][2].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][2].winningSet = true;
      this.board[1][2].winningSet = true;
      this.board[2][2].winningSet = true;
      return false;
    }
    // Diagonals

    x= this.board[0][0].State,y=this.board[1][1].State,z =this.board[2][2].State;
    if(x==true && (y===true && z === true)){
      this.board[0][0].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][2].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][0].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][2].winningSet = true;
      return false;
    }

    x= this.board[0][2].State,y=this.board[1][1].State,z =this.board[2][0].State;
    if(x==true && (y===true && z === true)){
      this.board[0][2].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][0].winningSet = true;
      return true;
    }else if(x==false && (y===false && z === false)){
      this.board[0][2].winningSet = true;
      this.board[1][1].winningSet = true;
      this.board[2][0].winningSet = true;
      return false;
    }
    return null;
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
