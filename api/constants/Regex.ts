const Regex = {
    FOTO: /^https?:\/\/\S+\.(jpg|png|gif)$/i,
    CATEGORIA: /^[a-zA-ZÀ-ÿ -]*$/,
    NACIONALIDADE: /^[a-zA-Z]+$/,
    EMAIL: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
    NOME: /^[a-zA-Z0-9]{1,12}$/,
    SENHA: /^.{1,20}$/
};

module.exports = Regex;