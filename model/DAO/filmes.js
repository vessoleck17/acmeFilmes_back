/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de filmes
 * Data: 01/02/2024
 * Autor: Plaloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripts SQL
const { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//função para inserir um filme no Banco de dados
const insertFilme = async function (dadosFilme) {

    let statusCadastro = false


    try {

        let sql

        if (
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != undefined
        ) {
            sql = `insert into tbl_filme (  nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                id_classificacao
                
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}',
                '${dadosFilme.id_classificacao}'
    
    )`;
        } else {
            sql = `insert into tbl_filme (  nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                id_classificacao
                
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}',
                '${dadosFilme.id_classificacao}'
    
    )`;
        }





        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados 
        //(insert, update e dele)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (selects)
        let result = await prisma.$executeRawUnsafe(sql)
        


        if (result) {
            let idFilme = await selectId()

    
            // for (let genero of dadosFilme.generos) {
                

            //     sql = `insert into tbl_filme_genero (
            //         id_filme,
            //         id_genero
            //     )values(
            //         ${idFilme[0].id},
            //         ${genero}
            //     )`

            //     let result = await prisma.$executeRawUnsafe(sql)
               
                
            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }

            // for (let ator of dadosFilme.atores) {
            //     sql = `insert into tbl_filme_ator(
            //         tbl_filme_id,
            //         tbl_ator_id
            //     )values(
            //         ${idFilme[0].id},
            //         ${ator}
            //     )`

            //     let result = await prisma.$executeRawUnsafe(sql)

            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }

            // for (let diretor of dadosFilme.diretores) {
            //     sql = `insert into tbl_filme_diretor(
            //         id_filme,
            //         id_diretor
            //     )values(
            //         ${idFilme[0].id},
            //         ${diretor}
            //     )`

            //     let result = await prisma.$executeRawUnsafe(sql)

            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }

            return result
        } else {
            return false
        }


    } catch (error) {
        console.log(error)
        return false
    }

}


//função para atualizar um filme no banco de dados
const updateFilmes = async function (id, dadosFilme) {

    let statusCadastro = false
    try {

       

        let sql

        if (
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != undefined
        ) {
            sql = `update tbl_filme set
                                            
                                            nome = '${dadosFilme.nome}',
                                            sinopse = '${dadosFilme.sinopse}',
                                            duracao = '${dadosFilme.duracao}',
                                            data_lancamento = '${dadosFilme.data_lancamento}',
                                            data_relancamento = '${dadosFilme.data_relancamento}',
                                            foto_capa = '${dadosFilme.foto_capa}',
                                            valor_unitario = '${dadosFilme.valor_unitario}',
                                            id_classificacao = '${dadosFilme.id_classificacao}'
                
                 where id = ${id}`

            console.log(sql)
        } else {
            sql = `update tbl_filme set 
                                            
                nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = null,
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario = '${dadosFilme.valor_unitario}',
                id_classificacao = '${dadosFilme.id_classificacao}'

              where id = ${id}`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        // if (result) {

        //     let rsFilme =  awa
            // sql = `delete from tbl_filme_genero where id_filme=${id}`

            // result = await prisma.$executeRawUnsafe(sql)

            // for (let genero of dadosFilme.generos) {
            //     sql`insert into tbl_filme_genero(
            //         id_filme,
            //         id_genero
            //     )values(
            //         ${id},
            //         ${genero}
            //     )`

            //     let result = await prisma.$executeRawUnsafe(sql)

            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }

            // sql = `delete from tbl_filme_ator where tbl_filme_id = ${id}`
            // result = await prisma.$executeRawUnsafe(sql)

            // for (let ator of dadosFilme.atores) {
            //     sql = `insert into tbl_filme_ator(
            //         tbl_filme_id,
            //         tbl_filme_ator
            //     )values(
            //         ${id},
            //         ${ator}
            //     )`

            //     result = await prisma.$executeRawUnsafe(sql)
            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }

            // sql = `delete from tbl_filme_diretor where id_filme = ${id}`
            // result = await prisma.$executeRawUnsafe(sql)

            // for (let diretor of dadosFilme.diretores) {
            //     sql = `insert into tbl_filme_diretor(
            //         id_filme,
            //         id_diretor
            //     )values(
            //         ${id},
            //         ${diretor}
            //     )`

            //     result = await prisma.$executeRawUnsafe(sql)
            //     if (result)
            //         statusCadastro = true
            //     else
            //         statusCadastro = false
            // }


       
            return result


    } catch (error) {
        console.log(error);
    }
}

//função para deletar um filme do banco de dados
const deleteFilme = async function (id) {


    try {
        let sql = `delete from tbl_filme where id = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        
        return rsFilme
    } catch (error) {
        return false
    }
}

//função para listar todos os filmes do banco de dados
const selectAllFilmes = async function () {

    try {
        let sql = 'select id, nome, sinopse, time_format(duracao, "%H:%i:%S") as duracao, date_format(data_lancamento, "%Y-%m-%d") as data_lancamento, date_format(data_relancamento, "%Y-%m-%d") as data_relancamento, foto_capa, valor_unitario, id_classificacao from tbl_filme';


        //$queryRawUnsafe(sql)
        //$queryRaw('select * from tbl_filme')

        //Executa o script sql no banco de dados e recebe o retorno dos dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
    } catch (error) {
        return false
    }


}

//função para buscar um filme no banco de dados filtrando pelo id
const selectByIdFilme = async function (id) {

    try {
        //script sql para filtrar pelo id
        let sql = `select * from tbl_filme where id = ${id}`

        //executa o sql no banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    } catch (error) {
        return false
    }
}


//função para retornar o id do filme
const selectId = async function () {
    try {

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1`
        let rsFilme = await prisma.$queryRawUnsafe(sql)


        return rsFilme
    } catch (error) {
        return false
    }
}

const selectGeneros = async function (id) {
    try {

        let sql = `select g.nome, id from tbl_filme_genero as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_genero as g on i.id_genero = g.id
        where f.id = ${id}`

        let rsGenero = await prisma.$executeRawUnsafe(sql)

        console.log(rsGenero)

        return rsGenero

    } catch (error) {
        return false
    }

}

const selectDiretores = async function (id) {
    try {
        let sql = `select d.nome from tbl_filme_diretor as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_diretor as d on i.id_diretor = d.id
        where f.id = ${id}`

        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        
        return rsDiretor

    } catch (error) {
        return false
    }
}
const selectAtores = async function (id) {
    try {
        let sql = `select a.nome from tbl_filme_ator as i
        join tbl_filme as f on i.tbl_filme_id=f.id
        join tbl_ator as a on i.tbl_ator_id = a.id
        where f.ia = ${id}`

        let rsAtor = await prisma.$executeRawUnsafe(sql)

        console.log(rsAtor)
        return rsAtor

    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilmes,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectId,
    selectGeneros,
    selectAtores,
    selectDiretores,
}
