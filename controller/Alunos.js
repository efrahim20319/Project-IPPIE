export default class Aluno {
    static async criarAluno(req, res, next) {
        const dados = req.body
        const { nome,
            numero_BI,
            endereco,
            data_nascimento,
            nome_pai,
            nome_mae,
            numero_telefone,
            email,
            provincia,
            curso
        } = dados
        const [BI_img, certificado_img, comprovativo_img] = req.files
        console.log(req.files);
        // console.log(dados, BI_img, certificado_img, comprovativo_img);
        res.end()
    }
}