import { renderListaMensagem } from "./tabelaMensagem.js";
import { renderListaAluno } from "./tableAlunos.js";

document.addEventListener('DOMContentLoaded', async function () {
    await renderListaAluno()
    await renderListaMensagem()
    new DataTable('#table_students');
    new DataTable('#table-msg')
});

