export class InvalidParamError extends Error{
    constructor(mensagem: string){
        super(mensagem);
        this.name = "InvalidParamError";
    }
}