import { hash } from 'bcrypt';
import { Usuario, UsuarioInterface } from '../models/Usuario';
import { Attributes } from 'sequelize/types';
import { cargosUsuarios } from '../constants/cargosUsuarios';
import { NotAuthorizedError } from '../../../../errors/NotAuthorizedError';
import { PermissionError } from '../../../../errors/PermissionError';
import { QueryError } from '../../../../errors/QueryError';
import { PayloadParams } from '../types/PayloadParams';

class UsuarioServicesClass{
    /** @brief Criptografa a senha. */
    async criptografarSenha(senha){
        const saltRounds = 10;
        const senhaCriptografada = await hash(senha, saltRounds);

        return senhaCriptografada;
    }

    /** @brief Cria um usuário em que o cargo só pode ser user.*/
    async criar(body){
        if(body.cargo == cargoUsuario.ADMIN){
            throw new PermissionError('Não é possível criar um usuário com o cargo de administrador');
        };

        const usuario = await Usuario.findOne({where: {email: body.email}});

        if(usuario){
            throw new QueryError("E-mail já cadastrado");
        };
            
        if (body.cargo != 'user'){
            throw new QueryError("Cargo inválido");
        } else{
            const usuario = {
                nome: body.nome,
                email: body.email,
                senha: body.senha,
                cargo: body.cargo,
            };
    
            usuario.senha = await this.criptografarSenha(body.senha);
    
            await Usuario.create(usuario);
        }
    }
    /** @brief Atualiza um usuário já existente.*/
    async atualizar(id, body, usuarioLogado){
        const usuario = await this.getById(id);

        if(usuarioLogado.cargo != cargoUsuario.ADMIN && usuarioLogado.id != id){
            throw new PermissionError("Você não tem permisão para editar outro usuário!");
        } 
        if(body.cargo && usuarioLogado != cargoUsuario.ADMIN){
            throw new PermissionError("Você não tem permissão para editar seu cargo!");
        }
        if(body.senha){
            body.senha = await this.senhaCriptografada(body.senha);
        }

        await usuario.update(body);
    }

    /** @brief Remove um usuário.*/
    async remover(id){
        const usuario = await Usuario.findByPk(id);
        if(!usuario)
            throw new QueryError("Usuário não encontrado");

        await usuario.destroy();
    }
}

export const UsuarioServices = new UsuarioServicesClass();