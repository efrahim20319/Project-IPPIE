import utils from "../../infrastructure/utils";
it('Deve unir as queries corretamente', () => {
    const query = `select sum(Total) as Total from 
    (select Cursos.nome, sum(Cursos.preco) as Total
    from Alunos
    inner join Matriculas on Alunos.id = Matriculas.aluno_id
    inner join Cursos on Alunos.curso_id = Cursos.id
    where Matriculas.createdAt like '+*+*' and Matriculas.status = 'confirmado'
    group by Cursos.nome) as TotalMatriculasCurso`
    const queryFinal = utils.unificadorQueries(7, query)
    console.log(queryFinal);
});
