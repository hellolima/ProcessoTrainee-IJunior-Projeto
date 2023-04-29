 export class InvalidParamError extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "InvalidParamError";
    }
}