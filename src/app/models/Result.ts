export class Result {
    id? : string;
    numero: number;
    resultado: any[] = [];
    color: string;

    constructor(numero: number, color: string) {
        this.numero = numero;
        this.color = color;
    } 
}