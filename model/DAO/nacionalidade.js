/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de nacionalidade
 * Data: 07/05/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/


const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllNacionalidades = async function(){
    try{
        let sql = 'select * from tbl_nacionalidade'

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade
    }catch (error){
        return false
    }
}

const selectNacionalidadeById = async function(id){
    try{
        let sql = `select * from tbl_nacionalidade where id = ${id}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        return rsNacionalidade
    }catch (error){
        return false
    }
}

module.exports = {
    selectAllNacionalidades,
    selectNacionalidadeById
}
