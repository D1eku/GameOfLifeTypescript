import { Cell } from "./Cell";

export class GameState{
    grill: Cell[][];
    iterationLevel: number; 

    constructor(grillState: Cell[][], iteration: number){
        this.grill = grillState;
        this.iterationLevel = iteration;
    }
}