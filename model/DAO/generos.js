/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de generos
 * Data: 18/04/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Import biblioteca para manipular scripts SQL
const {PrismaClient} = require('@prisma/client')

//instancia da classe PrismaClient
const prisma = new PrismaClient()


//inserir genero no banco de dados
const insertGenero = async function(dadosGenero){
    try {
        let sql = `insert into tbl_genero (nome) values 
        ('${dadosGenero.nome})`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
        else 
        return false
        
    }catch (error){
        return false
    }
}
// atualizar genero no banco de dados
const updateGenero = async function(id, dadosGenero){
    try{
        let idGenero = id
        let sql = `update tbl_genero set nome = '${dadosGenero.nome} where id = ${idGenero}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true 
        else 
        return false
    }catch(error){
        return false
    }
}
//deletar genero no bnaco de dados
const deleteGenero = async function(id){

    try{

        let sql = `delete from tbl_genero where id = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)

        return rsGenero

    }catch(error){
        return false
    }
}
//trazer todos os generos do bnaco de dados
const selectAllgeneros = async function(){

    try{
        const sql = `select * from tbl_genero`

        let rsGenero = await prisma.$queryRawUnsafe (sql)

        return rsGenero
    }catch(error){
        return false
    }
    
}
//trazer genero pelo id
const selectGeneroById = async function(id){
    try{
        let sql = `select * from tbl_genero where id = ${id}`
        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero
    }catch(error){
        return false
    }
}
//função para retornar o id do genero
const selectId = async function(){
    try{

        let sql = `select cast(last_insert>id() AS DECIMAL) as id from tbl_genero limit 1`
        let rsGenero = await prisma.$queryRawUnsafe(sql)

        return rsGenero
    }catch(error){
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllgeneros,
    selectGeneroById,
    selectId
}