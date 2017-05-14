import { Component, OnInit } from '@angular/core';
import {Cell} from '../cell.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() {
    console.log("wooo");
   }

  public board:Array<Array<Cell>> = new Array<Array<Cell>>();



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
