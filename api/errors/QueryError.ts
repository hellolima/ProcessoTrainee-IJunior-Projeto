export class QueryError extends Error{
    constructor(mensagem: string){
        super(mensagem);
        this.name = "QueryError";
    }
}