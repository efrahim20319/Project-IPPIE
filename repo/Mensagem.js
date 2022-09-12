import executaQuery from "../database/executaQuery";

export default class RepositorioMensagem {
    static async adicionarMensagem(dados) {
        const query = 'INSERT INTO Mensagem SET ?'
        await executaQuery(query, dados)
    }


}