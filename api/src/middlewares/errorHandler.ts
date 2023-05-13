import { Request, Response, NextFunction} from 'express';

export function errorHandler(erro: Error, req: Request, res: Response, next: NextFunction){
    if(erro.name === "QueryError"){
        res.status(400).json({erro: erro.message});
    } 
    if(erro.name === "PermissionError"){
        res.status(401).json({erro: erro.message})
    }
    if(erro.name === "InvalidParamError"){
        res.status(400).json({erro: erro.message})
    }
    else
        res.status(500).json({erro: "Erro no servidor"});
}