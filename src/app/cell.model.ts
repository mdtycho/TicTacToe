export class Cell {
   private state:boolean = null;

   displayCell():string{
       if(this.state===null){
           return "";
       }else if(this.state===false){
           return "X";
       }else{
           return "O";
       }
   }
   public set State(v : boolean) {
       this.state = v;
   }
   
}
