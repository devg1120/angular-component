export interface CControl{
    width?: number;
    height?: number;
    index?: number;
  }
  
  export class CardControl implements CControl{
    constructor(
      public width?: number,
      public height?: number,
      public index?: number
    ){}
  }