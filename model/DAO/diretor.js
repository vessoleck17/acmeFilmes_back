/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de diretor
 * Data: 07/05/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//função para inserir um Ator no Banco de dados
const insertDiretor = async function(dadosDiretor){
    
    try{

        let sql 

        if(
            dadosDiretor.data_falecimento!= null &&
            dadosDiretor.data_falecimento != '' &&
            dadosDiretor.data_falecimento != undefined
        )
        {
            sql = `insert into tbl_diretor (  nome,
                data_nascimento,
                biografia,
                foto,
                id_sexo
                
    ) values (
                '${dadosDiretor.nome}',
                '${dadosDiretor.data_nascimento}',
                '${dadosDiretor.biografia}',
                '${dadosDiretor.foto},
                '${dadosDiretor.id_sexo}'
    
    )`;
        } else {
            sql = `insert into tbl_diretor (  nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                id_sexo
                
    ) values (
            '${dadosDiretor.nome}',
            '${dadosDiretor.data_nascimento}',
            '${dadosDiretor.data_falecimento},
            '${dadosDiretor.biografia}',
            '${dadosDiretor.foto},
            '${dadosDiretor.id_sexo}'
    
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

//função para listar todos os Ator
const updateDiretor = async function(id, dadosDiretor){
    try{
        let sql 
        
        if(
            dadosDiretor.data_falecimento!= null &&
            dadosDiretor.data_falecimento != '' &&
            dadosDiretor.data_falecimento != undefined
        ){
            sql = `update tbl_diretor set
                                            
                                            nome = '${dadosDiretor.nome}',
                                            data_nascimento = '${dadosDiretor.data_nascimento}',
                                            biografia = '${dadosDiretor.biografia},
                                            foto = '${dadosDiretor.foto}',
                                            id_sexo = '${dadosDiretor.id_sexo}'
                
                 where id = ${id}`

        }else{
            sql = `update tbl_diretor set 
                                            
            nome = '${dadosDiretor.nome}',
            data_nascimento = '${dadosDiretor.data_nascimento}',
            data_falecimento = '${dadosDiretor.data_falecimento}',
            biografia = '${dadosDiretor.biografia},
            foto = '${dadosDiretor.foto}',
            id_sexo = '${dadosDiretor.id_sexo}'

              where id = ${id}`
              
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
        return true
        else 
        return false

    }catch(error){
    
        return false
    } 
}

//função para deletar um diretor do banco de dados
const deleteDiretor = async function(id){
    try{

        let sql = `delete from tbl_diretor where id = ${id}`

        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        return rsDiretor

    }catch(error){
        return false
    }
}

//função para listar todos os diretores do banco de dados
const selectAllDiretores = async function(){

    try{
        let sql = 'select * from tbl_Diretor';


        
    
        //Executa o script sql no banco de dados e recebe o retorno dos dados
        let rsDiretor = await prisma.$queryRawUnsafe(sql);
        return rsDiretor
    }catch(error){
        return false
    }
    

}

//função para buscar um diretor no banco de dados filtrando pelo id
const selectByIdDiretor = async function(id){
    
    try{
    //script sql para filtrar pelo id
    let sql = `select * from tbl_diretor where id = ${id}`

    //executa o sql no banco de dados
    let rsDiretor = await prisma.$queryRawUnsafe(sql)

    return rsDiretor

    }catch (error){
        return false
    }
}


//função para retornar o id do diretor
const selectId = async function(dadosDiretor){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_diretor limit 1`
        let rsDiretor = await prisma.$queryRawUnsafe(sql)
        
    
        return rsDiretor
    }catch(error){
        return false
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectId
}