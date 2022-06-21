export class Instruction {
  id: number;
  code: string;
  description: string;
  descriptionAux:string;
  rev: string;

  getDescription():string {
    return this.rev + " - " + this.description
  }
}
