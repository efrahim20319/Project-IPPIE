import crypto from "crypto"
import moment from "moment";
import path from "path";
const multer = require("multer");

const configuracoesDestination = {
    async matricula(req, file, cb) {
        cb(null, "./public/uploads")
    },
    async comprovativo(req, file, cb) {
        cb(null, "./public/uploads/comprovativos") 
    }
}

const configuracoesFilename = {
    async matricula(req, file, cb) {
        try {
            const dados_aluno = req.body
            const imagem = file.originalname
            const extensao = path.extname(imagem)
            const imagem_final = GeraNomeImagem(dados_aluno, imagem, extensao);
            cb(null, imagem_final)
        } catch (error) {
            cb(error)
        }
    },
    async comprovativo(_req, file, cb) {
        try {
            const imagem = file.originalname
            const extensao = path.extname(imagem)
            const imagem_final = `${crypto.randomUUID()}${extensao}`
            cb(null, imagem_final)
        } catch (error) {
            cb(error)
        }
    }
}

function GeraNomeImagem(dados_aluno, imagem, extensao) {
    let imagem_final = '';
    const { numero_BI, nome } = dados_aluno
    imagem_final = `${moment().format('YYYYMMDDHHmmss')} - ${crypto.randomUUID()} - ${numero_BI} - ${nome.split(' ')[0]} - ${imagem[0]}${extensao}`;
    return imagem_final;
}

const carregaImagem = {
    matricula(numeroArquivos) {
        const upload = multer({ storage: multer.diskStorage({
            destination: configuracoesDestination.matricula,
            filename: configuracoesFilename.matricula
        }) })
        return upload.array('files', numeroArquivos)
    },
    comprovativo(numeroArquivos) {
        const upload = multer({ storage: multer.diskStorage({
            destination: configuracoesDestination.comprovativo,
            filename: configuracoesFilename.comprovativo
        }) })
        return upload.array('files', numeroArquivos)
    }
    
}
export default carregaImagem