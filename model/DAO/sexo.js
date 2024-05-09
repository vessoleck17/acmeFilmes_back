/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos os gets da tabela de sexo
 * Data: 07/05/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllSexo = async function(){
    try{
        
        let sql = 'select * from tbl_sexo'

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    }catch (error){
        return false
    }
}

const selectSexoById = async function(id){
    try{

       
        let sql = `select * from tbl_sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        return rsSexo
    }catch(error){
        return error
    }
}

module.exports = {
    selectAllSexo,
    selectSexoById
}
