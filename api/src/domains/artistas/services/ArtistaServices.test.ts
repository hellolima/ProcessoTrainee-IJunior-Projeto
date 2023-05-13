import { Artista } from "../models/Artista";
import { ArtistaServices } from "./ArtistaServices";
import { ArtistaInterface } from "../models/Artista";
import { QueryError } from "sequelize";
import {expect, jest, test, describe} from "@jest/globals";
import { beforeEach } from "node:test";

jest.mock("../models/Artista", () => {
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

    test("Recebe um objeto => Cria um Artista no banco", async () => {
        const mockBodyArtista = {
            nome: "teste",
            nacionalidade: "brasileiro",
            foto: "testee"
        } as ArtistaInterface;

        (Artista.create as jest.MockedFunction<typeof Artista.create>).mockResolvedValue({});

        await ArtistaServices.criar(mockBodyArtista);

        expect(Artista.create).toHaveBeenCalledWith(mockBodyArtista);
        expect(Artista.create).toHaveBeenCalledTimes(1);
    });
});

describe("remover", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Recebe um Id => Remove o Artista do banco", async () => {
        const id = "1";

        const artista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "testee"
        };

        (Artista.findByPk as any).mockResolvedValue(artista);
        (Artista.destroy as any).mockResolvedValue({});

        await ArtistaServices.remover(id);

        expect(Artista.findByPk).toHaveBeenCalledTimes(1);
        expect(Artista.destroy).toHaveBeenCalledTimes(1);
    });
});

describe("atualizar", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    test("Método recebe um Id e informações => Atualiza o artista correspondente no banco de dados", async () => {
        const body_mock = {
        id: "1",
        nome: 'Teste',
        nacionalidade: 'Teste',
        foto: 'Teste',
        } as ArtistaInterface;
    
        const artista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "testee"
        };
    
        (Artista.findByPk as any).mockResolvedValue(artista);
        (Artista.update as any).mockResolvedValue({});
        
        await ArtistaServices.atualizar(body_mock);
    
        expect(Artista.findByPk).toHaveBeenCalledTimes(1);
        expect(Artista.update).toHaveBeenCalledTimes(1);
        expect(Artista.update).toHaveBeenCalledWith(body_mock);
    });
});