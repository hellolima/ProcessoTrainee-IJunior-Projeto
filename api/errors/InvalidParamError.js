class InvalidParamError extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "InvalidParamError";
    }
}

module.exports = InvalidParamError;