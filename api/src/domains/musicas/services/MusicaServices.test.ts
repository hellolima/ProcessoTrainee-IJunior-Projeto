import { Musica } from "../models/Musica";
import { MusicaInterface } from "../models/Musica";
import { MusicaServices } from "./MusicaServices";
import { QueryError } from "../../../../errors/QueryError";
import {expect, jest, test, describe} from "@jest/globals";
import { beforeEach } from "node:test";

jest.mock("../models/Musica", () => {
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

    test("Recebe um objeto com valores da música => Cria uma Música no banco", async () => {
        const mockBodyMusica = {
            titulo: "Rave",
            foto: "teste",
            categoria: "Phonk",
            artistaId: "1"
        } as MusicaInterface;
    
        (Musica.create as jest.MockedFunction<typeof Musica.create>).mockResolvedValue({});
    
        await MusicaServices.criar(mockBodyMusica);
    
        expect(Musica.create).toHaveBeenCalledWith(mockBodyMusica);
        expect(Musica.create).toHaveBeenCalledTimes(1);
    });
});



describe("listarTodas", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test("Método é chamado => Lista todas as músicas no banco", async () => {
        const musicas_mock = [
            {
                id: "1",
                titulo: "Rave",
                foto: "teste2",
                categoria: "Phonk",
                artistaId: "1"
            } as MusicaInterface,
            {
                id: "2",
                titulo: "Face in The Dark",
                foto: "teste2",
                categoria: "seila kk",
                artistaId: "2"
            } as MusicaInterface
        ];
    
        (Musica.findAll as jest.MockedFunction<typeof Musica.findAll>).mockResolvedValue(musicas_mock);
    
        const musicas = await Musica.findAll();
        expect(Musica.findAll).toHaveBeenCalledTimes(1);
        expect(musicas).toEqual(musicas_mock);
    });
    
    test("Método é chamado => Não há músicas no banco", async () => {
        (Musica.findAll as any).mockResolvedValue(null);
    
        await expect(MusicaServices.listarTodas()).rejects.toThrow(new QueryError("Nenhuma música encontrada no banco de dados"));
    });
});

describe("filtrarID", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    test("Método recebe um Id => Retorna a música correspondente", async () => {
        const id = '1';
    
        const musica_mock = {
        id: '1',
        titulo: 'Teste',
        foto: 'Teste',
        artistaId: 'Teste',
        categoria: 'Teste',
        } as MusicaInterface;
    
        (Musica.findByPk as jest.MockedFunction<typeof Musica.findByPk>).mockResolvedValue(musica_mock);
    
        const result = await MusicaServices.filtrarID(id);
    
        expect(result).toEqual(musica_mock);
        expect(Musica.findByPk).toHaveBeenCalledTimes(1);    
    });
      
    test("Método recebe um Id que não existe => Retorna erro", async () => {
        const id = '1';
    
        (Musica.findByPk as jest.MockedFunction<typeof Musica.findByPk>).mockResolvedValue(null);
    
        await expect(MusicaServices.filtrarID(id)).rejects.toThrow(new QueryError("Música não encontrada"));
    });
});
  
describe("atualizar", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    test("Método recebe um Id e informações => Atualiza a música correspondente no banco de dados", async () => {
        const body_mock = {
        id: "1",
        titulo: 'Teste',
        foto: 'Teste',
        artistaId: 'Teste',
        categoria: 'Teste'
        } as MusicaInterface;
    
        const musica = {
        id: '1',
        titulo: 'Teste',
        foto: 'Teste',
        artistaId: 'Teste',
        categoria: 'Teste'
        };
    
        (Musica.findByPk as any).mockResolvedValue(musica);
        (Musica.update as any).mockResolvedValue({});
        
        await MusicaServices.atualizar(body_mock);
    
        expect(Musica.findByPk).toHaveBeenCalledTimes(1);
        expect(Musica.update).toHaveBeenCalledTimes(1);
        expect(Musica.update).toHaveBeenCalledWith(body_mock);
    });
});

describe("remover", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    test("Método recebe um Id => Remove a música do banco de dados", async () => {
        const id = "1";
    
        const musica = {
            id: '1',
            titulo: 'Teste',
            foto: 'Teste',
            artistaId: 'Teste',
            categoria: 'Teste'
        };
    
        (Musica.findByPk as any).mockResolvedValue(musica);
        (Musica.destroy as any).mockResolvedValue({});
    
        await MusicaServices.remover(id);
    
        expect(Musica.findByPk).toHaveBeenCalledTimes(1);
        expect(Musica.destroy).toBeCalledTimes(1);
    });
});