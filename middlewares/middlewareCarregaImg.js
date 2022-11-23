import crypto from "crypto"
import moment from "moment";
import path from "path";
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: async function (req, file, cb) {
        try {
            const dados_aluno = req.body
            const imagem = file.originalname
            const extensao = path.extname(imagem)
            const imagem_final = GeraNomeImagem(dados_aluno, imagem, extensao);
            cb(null, imagem_final)
        } catch (error) {
            cb(error)
        }
    }
})

function GeraNomeImagem(dados_aluno, imagem, extensao) {
    let imagem_final = '';
    imagem_final = `${moment().format('YYYYMMDDHHmmss')} - ${crypto.randomUUID()} - ${dados_aluno.numero_BI} - ${dados_aluno.nome.split(' ')[0]} - ${imagem[0]}${extensao}`;
    return imagem_final;
}

export default function carregaImagem() {
    const upload = multer({ storage: storage })
    return upload.array('files', 4)
}