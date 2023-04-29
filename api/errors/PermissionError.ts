export class PermissionError extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "PermissionError";
    }
}
