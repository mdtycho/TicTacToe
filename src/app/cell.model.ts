export class Cell {
   private state:boolean = null;
   private winning_set:boolean = false;
   public col:number = null;
   public row:number = null;

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
 
   public get State() : boolean {
       return this.state;
   }

   public set winningSet(v : boolean) {
       this.winning_set = v;
   }

   
   public get winningSet() : boolean {
       return this.winning_set;
   }
   
   
   
   
}
