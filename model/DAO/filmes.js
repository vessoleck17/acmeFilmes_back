/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de filmes
 * Data: 01/02/2024
 * Autor: Plaloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//função para inserir um filme no Banco de dados
const insertFilme = async function(dadosFilme){


    
    try{

        let sql 

        if(
            dadosFilme.data_relancamento!= null &&
            dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != undefined
        )
        {
            sql = `insert into tbl_filme (  nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
                
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
    
    )`;
        } else {
            sql = `insert into tbl_filme (  nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
                
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                null,
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
    
    )`;
        }


        


        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados 
        //(insert, update e dele)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (selects)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
        else 
        return false


            }catch(error){
                return false
            }
    
}

//função para atualizar um filme no banco de dados
const updateFilmes = async function(){

}

//função para deletar um filme do banco de dados
const deleteFilme = async function(){

}

//função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){

    try{
        let sql = 'select * from tbl_filme';


        //$queryRawUnsafe(sql)
        //$queryRaw('select * from tbl_filme')
    
        //Executa o script sql no banco de dados e recebe o retorno dos dados
        let rsFilmes = await prisma.$queryRawUnsafe(sql);
        return rsFilmes
    }catch(error){
        return false
    }
    

}

//função para buscar um filme no banco de dados filtrando pelo id
const selectByIdFilme = async function(id){
    
    try{
    //script sql para filtrar pelo id
    let sql = `select * from tbl_filme where id = ${id}`

    //executa o sql no banco de dados
    let rsFilme = await prisma.$queryRawUnsafe(sql)

    return rsFilme

    }catch (error){
        return false
    }
}

//função para buscar um filme no banco de dados filtrando pelo nome
const selectByNomeFilme = async function (nome){

    try{
        //script sql para filtrar pelo nome
        let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
        //executa o sql no banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    }catch(error){
        return false
    }
}

//finção para retornar o id do filme
const selectId = async function (){
    try{

        //script sql para pegar o últim id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1`
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        
    
        return rsFilme
    }catch(error){
        return false
    }
}

module.exports = {
    insertFilme, 
    updateFilmes, 
    deleteFilme, 
    selectAllFilmes, 
    selectByIdFilme,
    selectByNomeFilme,
    selectId
}