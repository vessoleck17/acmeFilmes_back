/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de ator
 * Data: 02/05/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//função para inserir um Ator no Banco de dados
const insertAtor = async function(dadosAtor){
    
    try{

        let sql 

        if(
           dadosAtor.data_falecimento != undefined && dadosAtor.data_falecimento !== '' 
        )
        {
            sql = `insert into tbl_ator (  nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
                
    ) values (
                '${dadosAtor.nome}',
                '${dadosAtor.data_nascimento}',
                '${dadosAtor.data_falecimento}',
                '${dadosAtor.biografia}',
                '${dadosAtor.foto}',
                '${dadosAtor.tbl_sexo_id}'
    
    );`
        } else {
            sql = `insert into tbl_ator (  nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
                
    ) values (
            '${dadosAtor.nome}',
            '${dadosAtor.data_nascimento}',
            null,
            '${dadosAtor.biografia}',
            '${dadosAtor.foto}',
            '${dadosAtor.tbl_sexo_id}'
    
    );`
        }


        


        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados 
        //(insert, update e dele)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (selects)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
        
            let idAtor = await selectId()
            for(let nacionalidade of dadosAtor.id_nacionalidade){
                sql = `insert into tbl_ator_nacionalidade(tbl_ator_id, tbl_nacionalidade_id)
                values (
                 ${idAtor[0].id},
                 ${nacionalidade}
                )`

                result = await prisma.$executeRawUnsafe(sql)

                if(result)
                return true
                else
                return false
            }
        }
        return !!result
       


            }catch(error){
                console.log(error)
                return false
            }
    
}

//função para atualizar um ator
const updateAtor = async function(id, dadosAtor){
    try{
        let sql 
        
        if(
            dadosAtor.data_falecimento!= null &&
            dadosAtor.data_falecimento != '' &&
            dadosAtor.data_falecimento != undefined
        ){
            sql = `update tbl_ator set
                                            
                                            nome = '${dadosAtor.nome}',
                                            data_nascimento = '${dadosAtor.data_nascimento}',
                                            data_falecimento = '${dadosAtor.data_falecimento}',
                                            biografia = '${dadosAtor.biografia}',
                                            foto = '${dadosAtor.foto}',
                                            tbl_sexo_id = '${dadosAtor.tbl_sexo_id}'
                
                 where id = ${id}`

        }else{
            sql = `update tbl_ator set 
                                            
            nome = '${dadosAtor.nome}',
            data_nascimento = '${dadosAtor.data_nascimento}',
            data_falecimento = null,
            biografia = '${dadosAtor.biografia}',
            foto = '${dadosAtor.foto}',
            tbl_sexo_id = '${dadosAtor.tbl_sexo_id}'

              where id = ${id}`
              
        }

        let result = await prisma.$executeRawUnsafe(sql)
        

        if(result){
            for(let nacionalidade of dadosAtor.tbl_nacionalidade_id){
                
                sql=`update tbl_ator_nacionalidade set tbl_nacionalidade_id =${nacionalidade} where tbl_ator_id =${idAtor}`
                
                let result=await prisma.$executeRawUnsafe(sql)

                if(result)
                    continue
                else
                    return false
            }

            return true
        }else
        return false

    }catch(error){
        console.log(error)
        return error
    } 
}

//função para deletar um Ator do banco de dados
const deleteAtor = async function(id){
    try{

        let sql = `delete from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$executeRawUnsafe(sql)

        return rsAtor

    }catch(error){
        return false
    }
}

//função para listar todos os Ator do banco de dados
const selectAllAtores = async function(){

    try{
        let sql = 'select * from tbl_ator';


        //$queryRawUnsafe(sql)
        //$queryRaw('select * from tbl_Ator')
    
        //Executa o script sql no banco de dados e recebe o retorno dos dados
        let rsAtor = await prisma.$queryRawUnsafe(sql);
        return rsAtor
    }catch(error){
        return false
    }
    

}

//função para buscar um Ator no banco de dados filtrando pelo id
const selectByIdAtor = async function(id){
    
    try{
    //script sql para filtrar pelo id
    let sql = `select * from tbl_ator where id = ${id}`

    //executa o sql no banco de dados
    let rsAtor = await prisma.$queryRawUnsafe(sql)

    return rsAtor

    }catch (error){
        return error
    }
}



//função para retornar o id do Ator
const selectId = async function(){
    try{

        //script sql para pegar o último id
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_ator limit 1`
        let rsAtor = await prisma.$queryRawUnsafe(sql)
        
    
        return rsAtor
    }catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor,
    selectId
}
