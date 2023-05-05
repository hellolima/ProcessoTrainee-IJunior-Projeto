export class PermissionError extends Error{
    constructor(mensagem: string){
        super(mensagem);
        this.name = "PermissionError";
    }
}
