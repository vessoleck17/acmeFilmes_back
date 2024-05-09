//Iport do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO que fará a comunicação com o banco de dados
const diretorDAO = require('../model/DAO/diretor.js')
const sexoDAO = require ('../model/DAO/sexo.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidade.js')
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
           dadosDiretor.biografia == ''           || dadosDiretor.biografia == undefined         || dadosDiretor.biografia == null        || dadosDiretor.biografia.length > 300 ||
           dadosDiretor.tbl_sexo_id == ''             ||  dadosDiretor.tbl_sexo_id == undefined          || dadosDiretor.tbl_sexo_id == null          || dadosDiretor.tbl_sexo_id.length > 3             
    
        ){
            console.log(dadosDiretor)
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
            if (validateStatus){
    
    
                //encaminha os dados do Diretor para o DAO inserir no BD
                let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)
            
                
    
    
                //cria o json de retorno dos dados (201)
                 if(novoDiretor){
    
                    let idDiretor = await diretorDAO.selectId()
                    dadosDiretor.id = idDiretor[0].id
    
                   
                    novoDiretorJson.diretor = dadosDiretor
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
        console.log(error)
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
                            dadosDiretor.biografia == ''           || dadosDiretor.biografia == undefined         || dadosDiretor.biografia == null        || dadosDiretor.biografia.length > 300 ||
                            dadosDiretor.tbl_sexo_id == ''             ||  dadosDiretor.tbl_sexo_id == undefined          || dadosDiretor.tbl_sexo_id == null          || dadosDiretor.tbl_sexo_id.length > 100             
                        
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
                            
                            let diretorById = await diretorDAO.selectByIdDiretor(idDiretor)
    
                                if(diretorById.length>0){
                                        
                                    if (validateStatus = true ){
                            
                                        let updateDiretor = await diretorDAO.updateDiretor(idDiretor, dadosDiretor)
    
                                            if(updateDiretor){
                                                jsonUpdate.diretor = dadosDiretor
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
            
                let diretorById = await diretorDAO.selectByIdDiretor(idDiretor)
    
                if(diretorById.length>0){
                    
                    let deleteDiretor = await diretorDAO.deleteDiretor(idDiretor)
    
                    if(deleteDiretor){
                        return message.SUCESS_DETELE_ITEM
                    }else{
                
                        return message.ERROR_NOT_FOUND
                    }
    
                } else{
                    return message.ERROR_NOT_FOUND
                }
                
                
                    
            }
                
        }catch(error){
            return message.ERROR_INTERNAL_SERVER
        }
    }
    
//função para retornar todos osDiretor
const getListarDiretor = async function(){
    
        try{
            //cria o objeto json
        let diretorJson = {}
    
        //chama a função do DAO para retornar os dados da tabela de Diretor
        let dadosDiretor = await diretorDAO.selectAllDiretores();
    
    
        //verifica de o DAO retornou os dados
        if(dadosDiretor){
    
            //validação para verificar a  quantidade de itens retornados
            if(dadosDiretor.length > 0){

                for(let diretores of dadosDiretor){
                    let sexoDiretor = await sexoDAO.selectSexoById(diretores.tbl_sexo_id)
                    let nacionalidadeDiretor = await nacionalidadeDAO.selectNacionalidadeDiretor(diretores.id)
                    delete diretores.tbl_sexo_id
                    diretores.sexo = sexoDiretor
                    diretores.nacionalidade = nacionalidadeDiretor
                }
            
            
                //cria o json para retorno
           diretorJson.diretor = dadosDiretor
           diretorJson.quantidade = dadosDiretor
           diretorJson.status_code = 200
    
            return diretorJson
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
        let diretorJson = {}
    
    
        //validação para verificar se o ID é válido
            //vazio, indefinido ou não numérico
        if(idDiretor=='' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
    
            //encaminha o ID para o DAO buscar o bd
            let dadosDiretor = await diretorDAO.selectByIdDiretor(idDiretor)
    
            //verifica de o DAO retornou os dados
            if(dadosDiretor){
    
                //validação para verificar a  quantidade de itens retornados
                if(dadosDiretor.length > 0){

                    for(let diretores of dadosDiretor){
                        let sexoDiretor = await sexoDAO.selectSexoById(diretores.tbl_sexo_id)
                        let nacionalidadeDiretor = await nacionalidadeDAO.selectNacionalidadeDiretor(diretores.id)
                        delete diretores.tbl_sexo_id
                        diretores.sexo = sexoDiretor
                        diretores.nacionalidade = nacionalidadeDiretor
                    }
                
                
                    //cria o json para retorno
               diretorJson.diretor = dadosDiretor
               diretorJson.status_code = 200
        
                return diretorJson
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
    
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    
        }catch(error){
            console.log(error)
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
