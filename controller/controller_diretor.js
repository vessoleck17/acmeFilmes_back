//Iport do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o banco de dados
const DiretorDAO = require('../model/DAO/diretor.js')
const { application } = require('express')

//função para validar e inserir um novo Diretor 
const setInserirNovoDiretor = async function(dadosDiretor, contentType){

    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            //cria o objeto JSON para devolver os dados criados na requisição
        let novoDiretorJson = {}
    
    
        //validação de campos obrigatórios ou com digitação inválida
        if(dadosDiretor.nome == ''                || dadosDiretor.nome == undefined              || dadosDiretor.nome == null             || dadosDiretor.nome.length > 100 ||
           dadosDiretor.data_nascimento == ''     || dadosDiretor.data_nascimento == undefined   || dadosDiretor.data_nascimento == null  || dadosDiretor.data_nascimento.length != 10 ||
           dadosDiretor.foto == ''                || dadosDiretor.foto == undefined              || dadosDiretor.foto == null             || dadosDiretor.foto.length > 200 ||
           dadosDiretor.biografia == ''           || dadosDiretor.biografia == undefined         || dadosDiretor.biografia == null        || dadosDiretor.biografia > 200 ||
           dadosDiretor.id_sexo == ''             ||  dadosDiretor.id_sexo == undefined          || dadosDiretor.id_sexo == null          || dadosDiretor.id-sexo > 3             
    
        ){
            
            return message.ERROR_REQUIRED_FIELDS //400
            
        }else{
    
            let validateStatus = false
    
    
            //validação da data de relançamento, já que ela não é obrigatória no BD
            if(dadosDiretor.data_falecimento != null && dadosDiretor.data_falecimento !='' && dadosDiretor.data_falecimento != undefined){
               
               
               //validação para verificar se a data esta com qtde de digitos corretos
                if(dadosDiretor.data_falecimento.length != 10){
                    
                     return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    validateStatus = true
                }
            }else{
                validateStatus = true
            }
    
            //validação para verificar se podemos encaminhar os dados para o DAO
            if (validateStatus ){
    
    
                //encaminha os dados do Diretor para o DAO inserir no BD
                let novoDiretor = await DiretorDAO.insertDiretor()
            
                
    
    
                //cria o json de retorno dos dados (201)
                 if(novoDiretor){
    
                    let idDiretor = await DiretorDAO.selectId()
                    dadosDiretor.id = idDiretor[0].id
    
                   
                    novoDiretorJson.Diretor = dadosDiretor
                    novoDiretorJson.status = message.SUCESS_CREATED_ITEM.status
                    novoDiretorJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoDiretorJson.message = message.SUCESS_CREATED_ITEM.message
    
                    return novoDiretorJson // 201
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB // 500
                    
                }
    
            }
     
        
        }
    
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    
    } catch (error){
        return message.ERROR_INTERNAL_SERVER // 500 erro na controller 
    }
    
    
        
    }
    
// função para validar e atualizar Diretor 
const setAtualizarDiretor = async function(id, dadosDiretor, contentType){
        try{
    
            let idDiretor = id
    
            if(idDiretor=='' || idDiretor == undefined || isNaN(idDiretor)){
                return message.ERROR_INVALID_ID
    
                    
                    }else{
    
                        if(String(contentType).toLowerCase() == 'application/json'){
                        let jsonUpdate = {}
                                        
                        if( dadosDiretor.nome == ''                || dadosDiretor.nome == undefined              || dadosDiretor.nome == null             || dadosDiretor.nome.length > 100 ||
                            dadosDiretor.data_nascimento == ''     || dadosDiretor.data_nascimento == undefined   || dadosDiretor.data_nascimento == null  || dadosDiretor.data_nascimento.length != 10 ||
                            dadosDiretor.foto == ''                || dadosDiretor.foto == undefined              || dadosDiretor.foto == null             || dadosDiretor.foto.length > 200 ||
                            dadosDiretor.biografia == ''           || dadosDiretor.biografia == undefined         || dadosDiretor.biografia == null        || dadosDiretor.biografia > 300 ||
                            dadosDiretor.id_sexo == ''             ||  dadosDiretor.id_sexo == undefined          || dadosDiretor.id_sexo == null          || dadosDiretor.id_sexo > 100             
                        
        ){
                                    
                          return message.ERROR_REQUIRED_FIELDS //400
                                    
                        }else{
                                    
                            let validateStatus = false
                            
                            if(dadosDiretor.data_falecimento != null && dadosDiretor.data_falecimento !='' && dadosDiretor.data_falecimento != undefined){
                                    
                                if(dadosDiretor.data_falecimento.length != 10){
                                            
                                     return message.ERROR_REQUIRED_FIELDS //400
                                }else{
                                    validateStatus = true
                                }
                            }else{
                                validateStatus = true
                            }
                            
                            let DiretorById = await DiretorDAO.selectByIdDiretor(idDiretor)
    
                                if(DiretorById.length>0){
                                        
                                    if (validateStatus ){
                            
                                        let updateDiretor = await DiretorDAO.updateDiretor(idDiretor, dadosDiretor)
    
                                            if(updateDiretor){
                                                jsonUpdate.Diretor = dadosDiretor
                                                jsonUpdate.status = message.SUCESS_CREATED_ITEM.status
                                                jsonUpdate.status_code = message.SUCESS_CREATED_ITEM.status_code
                                                jsonUpdate.message = message.SUCESS_CREATED_ITEM.message
    
                                                return jsonUpdate
                                            }else{
                                                return message.ERROR_INTERNAL_SERVER_DB
                                            }
                                    }
                                    }else{
                                        return message.ERROR_NOT_FOUND
                                    }
                            
                                }
                            
                        
                                
    
                                }else{
                                    return message.ERROR_CONTENT_TYPE
                                }
                            }
                    
                            
    
                            }catch(error){
                                return message.ERROR_INTERNAL_SERVER
                            }
    }
    
    
//função para excluir um Diretor 
const setExcluirDiretor = async function(id){
        try{
    
            let idDiretor = id
    
            if(idDiretor=='' || idDiretor == undefined || isNaN(idDiretor)){
                return message.ERROR_INVALID_ID
            }else{
            
                let DiretorById = await DiretorDAO.selectByIdDiretor(idDiretor)
    
                if(DiretorById.length>0){
                    
                    let deleteDiretor = await DiretorDAO.deleteDiretor(idDiretor)
    
                    if(deleteDiretor){
                        return message.SUCESS_DETELE_ITEM
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
    
                }
                
                return message.ERROR_NOT_FOUND
                    
            }
                
        }catch(error){
            return message.ERROR_INTERNAL_SERVER
        }
    }
    
//função para retornar todos osDiretor
const getListarDiretor = async function(){
    
        try{
            //cria o objeto json
        let DiretorJson = {}
    
        //chama a função do DAO para retornar os dados da tabela de Diretor
        let dadosDiretor = await DiretorDAO.selectAllDiretores();
    
    
        //verifica de o DAO retornou os dados
        if(dadosDiretor){
    
            //validação para verificar a  quantidade de itens retornados
            if(dadosDiretor.length > 0){
            
            
                //cria o json para retorno
           DiretorJson.Diretor = dadosDiretor
           DiretorJson.status_code = 200
    
            returnDiretorJson
            }else{
                return message.ERROR_NOT_FOUND //404
            }
    
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
        }catch(error){
            return message.ERROR_INTERNAL_SERVER 
        }
    
        
    }
    
//função para buscar Diretor pelo ID
const getBuscarDiretorById = async function(id){
    
        try{
            //recebe o id do Diretor
        let idDiretor = id
    
        //cria o objeto json
        let DiretorJson = {}
    
    
        //validação para verificar se o ID é válido
            //vazio, indefinido ou não numérico
        if(idDiretor=='' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
    
            //encaminha o ID para o DAO buscar o bd
            let dadosDiretor = await DiretorDAO.selectByIdDiretor(idDiretor)
    
            //verifica de o DAO retornou os dados
            if(dadosDiretor){
    
                //validação para verificar a  quantidade de itens retornados
                if(dadosDiretor.length > 0){
                
                
                    //cria o json para retorno
               DiretorJson.Diretor = dadosDiretor
               DiretorJson.status_code = 200
        
                return DiretorJson
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
    
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    
        }catch(error){
            return message.ERROR_INTERNAL_SERVER
        }
    
        
        
    }
    
    
    
    module.exports = {
        setInserirNovoDiretor,
        setAtualizarDiretor,
        setExcluirDiretor,
        getListarDiretor,
        getBuscarDiretorById
    }
