export class QueryError extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "QueryError";
    }
}