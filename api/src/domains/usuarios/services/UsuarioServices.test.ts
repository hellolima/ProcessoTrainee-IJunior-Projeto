import { Usuario } from "../models/Usuario";
import { UsuarioServices } from "./UsuarioServices";
import { UsuarioInterface } from "../models/Usuario";
import { QueryError } from "sequelize";
import {expect, jest, test, describe} from "@jest/globals";
import { beforeEach } from "node:test";

jest.mock("../models/Usuario", () => {
    return{
        create: jest.fn(),
        findByPk: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn()
    };
});

describe("criar", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Recebe um objeto com valores do usuário => Cria um usuário no banco", async () => {
        const mockBodyUsuario = {
            nome: "teste",
            email: "teste",
            senha: "teste",
            cargo: "teste"
        } as UsuarioInterface;

        (Usuario.create as jest.MockedFunction<typeof Usuario.create>).mockResolvedValue({});

        await UsuarioServices.criar(mockBodyUsuario);

        expect(Usuario.create).toHaveBeenCalledWith(mockBodyUsuario);
        expect(Usuario.create).toBeCalledTimes(1);
    });
});

describe("remover", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Recebe um Id => Remove o Usuário do banco", async () => {
        const id = "1";

        const usuario = {
            nome: "teste",
            email: "teste",
            senha: "teste",
            cargo: "teste"
        }as UsuarioInterface;

        (Usuario.findByPk as any).mockResolvedValue(usuario);
        (Usuario.destroy as any).mockResolvedValue({});
    
        await UsuarioServices.remover(id);
    
        expect(Usuario.findByPk).toHaveBeenCalledTimes(1);
        expect(Usuario.destroy).toBeCalledTimes(1);
    });
});