import executaQuery from "./executaQuery";

export default class Tabelas {
    static async init() {
        await this.criarTbUsuario()
    }

    static async criarTbUsuario() {
        const query = `
            create table if not exists Usuario (
                codigo INT PRIMARY KEY AUTO_INCREMENT,
                nome varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                numero_telefone varchar(50) NOT NULL,
                emailVerificado TINYINT,
                data_criacao timestamp default current_timestamp,
                data_atualizacao timestamp default current_timestamp on update current_timestamp
            );
        `
        await executaQuery(query)
    }
}