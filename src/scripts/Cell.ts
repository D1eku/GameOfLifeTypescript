export class Cell {
    posX: number;
    posY: number;
    isLive: Boolean;

    constructor(posX: number, posY: number){
        this.posX = posX;
        this.posY = posY;
        this.isLive = false;
    }
}

