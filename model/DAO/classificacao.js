/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de classificação
 * Data: 18/04/2024
 * Autor: Paaloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

//listar todas as classificações
const selectAllClassificacoes = async function(){
    try{
        let sql = 'select * from tbl_classificacao'

        let rsClassificaco = await prisma.$queryRawUnsafe(sql)

        return rsClassificaco
    }catch(error){
        return false
    }
}
//deletar uma classificação do banco de dados
const deleteClassificacao = async function(id){
    try{
        let sql = `delete from tbl_classificacao where id = ${id}`
        let rsClassificaco = await prisma.$executeRawUnsafe(sql)
        return rsClassificaco
    } catch(error){;
        return false
    }
}
//inserir nova classificação
const insertClassificacao = async function(dadosClassificacao){
    try{
        let sql = `insert into tbl_classificacao (
            icon, 
            nome, 
            descricao
        ) values (
            '${dadosClassificacao.icon}',
            '${dadosClassificacao.nome}',
            '${dadosClassificacao.descricao}'
            )`

        let rsClassificaco = await prisma.$executeRawUnsafe(sql)
        return rsClassificaco

    }catch(error){
    return false
    }
}
//atualizar classificação no banco
const updateClassificacao = async function(id, dadosClassificacao){
    try{
        let sql = `update tbl_classificacao set 
                                            icon = '${dadosClassificacao.icon}',
                                            nome = '${dadosClassificacao.nome}',
                                            descricao = '${dadosClassificacao.descricao}'
                                            
                                            where id = ${id}`

        let rsClassificaco = await prisma.$executeRawUnsafe(sql)

        return rsClassificaco
    }catch(error){
        return false
    }
}
// selecionar classificação pelo id
const selectClassificacaoById = async function(id){
    try{
        let sql = `select * from tbl_classificacao where id = ${id}`

        let rsClassificaco = await prisma.$queryRawUnsafe(sql)

        return rsClassificaco

    }catch(error){
        return false
    }
}

//função para pegar o id da classificacao
const selectId = async function(){
    try{
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1`
        let rsClassificaco = await prisma.$queryRawUnsafe(sql)

        return rsClassificaco
    }catch(error){
        return false
    }
}

module.exports = {
    selectAllClassificacoes,
    deleteClassificacao,
    insertClassificacao,
    updateClassificacao,
    selectClassificacaoById,
    selectId
}