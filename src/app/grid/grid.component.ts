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
      console.log('smart move assignment');
      let smart_move:Cell = this.chooseMove();
      this.aiMakeMove(smart_move);
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

  /**
   * function for choosing the ai's moves
   * chooses the move that maximises it's own chance of winning but minimises the chance of the player winning
   * Returns a cell
   */
  chooseMove():Cell{
    console.log('empty cells assignment');
    var empty_cells = this.getEmptyCells();
    for(var i= 0;i<empty_cells.length;i++){
      console.log('entering main choose move for loop');
      // get cells on the same column
      var same_column =[];
      for(var j = 0;j<3;j++){
        if(j!==empty_cells[i].row){
          same_column.push(this.board[j][empty_cells[i].col]);
        }
      }

      // get cells on same row
      var same_row;
      console.log('testing!!');
      console.log(this.board[empty_cells[i].row]);
      console.log('1');
      console.log(empty_cells[i].col);
      console.log('2');
      console.log(this.board[empty_cells[i].row].filter((cell)=>{return cell.col!==empty_cells[i].col}));
      same_row=this.board[empty_cells[i].row].filter((cell)=>{return cell.col!==empty_cells[i].col});

      // get cells on same diagonal
      var same_diagonal = [];
      if(empty_cells[i].row===1 && empty_cells[i].col===1){
        same_diagonal.push(this.board[0][0]);
        same_diagonal.push(this.board[2][2]);
        same_diagonal.push(this.board[0][2]);
        same_diagonal.push(this.board[2][0]);
        console.log('middle cell diagonal');
        console.log(same_diagonal);
      }else if(empty_cells[i].row!==1 && empty_cells[i].col!==1){
        if(empty_cells[i].row===0){
          if(empty_cells[i].col===0){
            same_diagonal.push(this.board[1][1]);
            same_diagonal.push(this.board[2][2]);
          }else{
            same_diagonal.push(this.board[1][1]);
            same_diagonal.push(this.board[2][0]);
          }

        }else if(empty_cells[i].row===2){
          if(empty_cells[i].col===0){
            same_diagonal.push(this.board[1][1]);
            same_diagonal.push(this.board[0][2]);
          }else{
            same_diagonal.push(this.board[1][1]);
            same_diagonal.push(this.board[0][0]);
          }
        }
        console.log('side diagonals');
        console.log(same_diagonal);
      }

      // Return the empty cell if the rest of the cells in the column have been marked by the player

      if(this.player_choice==='X'){
        if(same_column[0].State===same_column[1].State && same_column[0].State===false){
          return empty_cells[i];
        }
      }else{
        if(same_column[0].State===same_column[1].State && same_column[0].State===true){
          return empty_cells[i];
        }
      }

      // Return the empty cell if the rest of the cells in the row have been marked by the player
      console.log('about to break?');
      console.log(same_row);
      if(this.player_choice==='X'){
        if(same_row[0].State===same_row[1].State && same_row[0].State===false){
          return empty_cells[i];
        }
      }else{
        if(same_row[0].State===same_row[1].State && same_row[0].State===true){
          return empty_cells[i];
        }
      }
      console.log('reached');

      // Return the empty cell if the rest of the cells in the diagonal have been marked by the player
      console.log('logic for diags');
      if(same_diagonal.length>0){
        if(this.player_choice==='X'){
        if(same_diagonal[0].State===same_diagonal[1].State && same_diagonal[0].State===false){
          return empty_cells[i];
        }
      }else{
        if(same_diagonal[0].State===same_diagonal[1].State && same_diagonal[0].State===true){
          return empty_cells[i];
        }
      }
      console.log('end of first diags');
      }
       
       if(same_diagonal.length===4){
         if(this.player_choice==='X'){
          if(same_diagonal[2].State===same_diagonal[3].State && same_diagonal[2].State===false){
            return empty_cells[i];
          }
      }else{
        if(same_diagonal[2].State===same_diagonal[3].State && same_diagonal[2].State===true){
          return empty_cells[i];
        }
      }
       }

       console.log('end of 2nd diags');

       // PLAYING  TO WIN

       // Return the empty cell if the rest of the cells in the column have been marked by the computer

      if(this.player_choice==='X'){
        if(same_column[0].State===same_column[1].State && same_column[0].State===true){
          return empty_cells[i];
        }
      }else{
        if(same_column[0].State===same_column[1].State && same_column[0].State===false){
          return empty_cells[i];
        }
      }

      // Return the empty cell if the rest of the cells in the row have been marked by the computer

      if(this.player_choice==='X'){
        if(same_row[0].State===same_row[1].State && same_row[0].State===true){
          return empty_cells[i];
        }
      }else{
        if(same_row[0].State===same_row[1].State && same_row[0].State===false){
          return empty_cells[i];
        }
      }

      // Return the empty cell if the rest of the cells in the diagonal have been marked by the ai
      if(same_diagonal.length>0){
        if(this.player_choice==='X'){
        if(same_diagonal[0].State===same_diagonal[1].State && same_diagonal[0].State===true){
          return empty_cells[i];
        }
      }else{
        if(same_diagonal[0].State===same_diagonal[1].State && same_diagonal[0].State===false){
          return empty_cells[i];
        }
      }
      }
       
       if(same_diagonal.length===4){
         if(this.player_choice==='X'){
          if(same_diagonal[2].State===same_diagonal[3].State && same_diagonal[2].State===true){
            return empty_cells[i];
          }
      }else{
        if(same_diagonal[2].State===same_diagonal[3].State && same_diagonal[2].State===false){
          return empty_cells[i];
        }
      }
       }
       
    }

    
    // Return a random cell if all rules fail
    return empty_cells[Math.floor(Math.random()*empty_cells.length)];
  }

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
        cell.row = i;
        cell.col = j;
        this.board[i].push(cell);
      }
    }
    console.log(this.board);
  }

}
