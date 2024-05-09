//Iport do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO quue fará a comunicação com o banco de dados
const atorDAO = require('../model/DAO/ator.js')
const sexoDAO = require ('../model/DAO/sexo.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidade.js')
const { application } = require('express')

//função para validar e inserir um novo Ator 
const setInserirNovoAtor = async function(dadosAtor, contentType){

    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            //cria o objeto JSON para devolver os dados criados na requisição
        let novoAtorJson = {}
    
    
        //validação de campos obrigatórios ou com digitação inválida
        if(dadosAtor.nome == ''                || dadosAtor.nome == undefined              || dadosAtor.nome == null             || dadosAtor.nome.length > 100 ||
           dadosAtor.data_nascimento == ''     || dadosAtor.data_nascimento == undefined   || dadosAtor.data_nascimento == null  || dadosAtor.data_nascimento.length != 10 ||
           dadosAtor.biografia == ''           || dadosAtor.biografia == undefined         || dadosAtor.biografia == null        || dadosAtor.biografia.length > 65000 ||
           dadosAtor.foto == ''                || dadosAtor.foto == undefined              || dadosAtor.foto == null             || dadosAtor.foto.length > 300 ||
           dadosAtor.tbl_sexo_id == ''             ||  dadosAtor.tbl_sexo_id == undefined          || dadosAtor.tbl_sexo_id == null          || dadosAtor.tbl_sexo_id.length > 2             
    
        ){
           
            return message.ERROR_REQUIRED_FIELDS //400
            
        }else{
    
            let validateStatus = false
    
    
            //validação da data de relançamento, já que ela não é obrigatória no BD
            if(dadosAtor.data_falecimento != null && dadosAtor.data_falecimento !='' && dadosAtor.data_falecimento != undefined){
               
               
               //validação para verificar se a data esta com qtde de digitos corretos
                if(dadosAtor.data_falecimento.length != 10){
                    
                     return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    validateStatus = true
                }
            }else{
                validateStatus = true
            }
    
            //validação para verificar se podemos encaminhar os dados para o DAO
            if (validateStatus=true){
    
    
                //encaminha os dados do Ator para o DAO inserir no BD
                let novoAtor = await atorDAO.insertAtor(dadosAtor)
            
                
    
    
                //cria o json de retorno dos dados (201)
                 if(novoAtor){
    
                    let idAtor = await atorDAO.selectId()
                    dadosAtor.id = Number(idAtor[0].id)
    
                   
                    novoAtorJson.ator = dadosAtor
                    novoAtorJson.status = message.SUCESS_CREATED_ITEM.status
                    novoAtorJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoAtorJson.message = message.SUCESS_CREATED_ITEM.message
    
                    return novoAtorJson // 201
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
    
// função para validar e atualizar Ator 
const setAtualizarAtor = async function(id, dadosAtor, contentType){
        try{
    
            let idAtor = id
    
            if(idAtor=='' || idAtor == undefined || isNaN(idAtor)){
                return message.ERROR_INVALID_ID
    
                    
                    }else{
    
                        if(String(contentType).toLowerCase() == 'application/json'){
                        let jsonUpdate = {}
                                        
                        if( dadosAtor.nome == ''                || dadosAtor.nome == undefined              || dadosAtor.nome == null             || dadosAtor.nome.length > 100 ||
                            dadosAtor.data_nascimento == ''     || dadosAtor.data_nascimento == undefined   || dadosAtor.data_nascimento == null  || dadosAtor.data_nascimento.length != 10 ||
                            dadosAtor.biografia == ''           || dadosAtor.biografia == undefined         || dadosAtor.biografia == null        || dadosAtor.biografia.length > 300 ||
                            dadosAtor.foto == ''                || dadosAtor.foto == undefined              || dadosAtor.foto == null             || dadosAtor.foto.length > 300 ||
                            dadosAtor.tbl_sexo_id == ''             ||  dadosAtor.tbl_sexo_id == undefined          || dadosAtor.tbl_sexo_id == null          || dadosAtor.tbl_sexo_id.length > 2             
                        
        ){
                        
                          return message.ERROR_REQUIRED_FIELDS //400
                                    
                        }else{
                                    
                            let validateStatus = false
                            
                            if(dadosAtor.data_falecimento != null && dadosAtor.data_falecimento !='' && dadosAtor.data_falecimento != undefined){
                                    
                                if(dadosAtor.data_falecimento.length != 10){
                                            
                                     return message.ERROR_REQUIRED_FIELDS //400
                                }else{
                                    validateStatus = true
                                }
                            }else{
                                validateStatus = true
                            }
                            
                            
    
                                if(atorById.length>0){
                                        
                                    if (validateStatus){
                            
                                        let novoAtor = await atorDAO.updateAtor(dadosAtor, idAtor)
                                        
    
                                        if(novoAtor){
                                            let idAtor = await atorDAO.selectId()
                                            dadosAtor.id = Number(idAtor[0].id)
                                        }
                                        if(novoAtor){

                                                jsonUpdate.ator = dadosAtor
                                                jsonUpdate.status = message.SUCESS_CREATED_ITEM.status
                                                jsonUpdate.status_code = message.SUCESS_CREATED_ITEM.status_code
                                                jsonUpdate.message = message.SUCESS_CREATED_ITEM.message
    
                                                return jsonUpdate
                                        }else
                                        
                                                
                                                return message.ERROR_INTERNAL_SERVER_DB
                                            
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
                                console.log(error)
                                return message.ERROR_INTERNAL_SERVER
                            }
    }
    
    
//função para excluir um Ator 
const setExcluirAtor = async function(id){
        try{
    
            let idAtor = id
    
            if(idAtor=='' || idAtor == undefined || isNaN(idAtor)){
                return message.ERROR_INVALID_ID
            }else{
            
                let atorById = await atorDAO.selectByIdAtor(idAtor)
    
                if(atorById.length>0){
                    
                    let deleteAtor = await atorDAO.deleteAtor(idAtor)
    
                    if(deleteAtor){
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
    
//função para retornar todos osator
const getListarAtor = async function(){
    
        try{
            //cria o objeto json
        let atorJson = {}
    
        //chama a função do DAO para retornar os dados da tabela de Ator
        let dadosAtor = await atorDAO.selectAllAtores();
    
    
        //verifica de o DAO retornou os dados
        if(dadosAtor){
    
            //validação para verificar a  quantidade de itens retornados
            if(dadosAtor.length > 0){
            
                for(let atores of dadosAtor){
                    let sexoAtor = await sexoDAO.selectSexoById(atores.tbl_sexo_id)
                    let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtor(atores.id)
                    delete atores.tbl_sexo_id
                    atores.sexo = sexoAtor
                    atores.nacionalidade = nacionalidadeAtor
                }
    
                //cria o json para retorno
           atorJson.Ator = dadosAtor
           atorJson.quantidade = dadosAtor.length
           atorJson.status_code = 200
    
            return atorJson
            }else{
                return message.ERROR_NOT_FOUND //404
            }
    
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
        }catch(error){
            console.log(error)
            return message.ERROR_INTERNAL_SERVER 
        }
    
        
    }
    
//função para buscar Ator pelo ID
const getBuscarAtorById = async function(id){
    
        try{
            //recebe o id do Ator
        let idAtor = id
    
        //cria o objeto json
        let atorJson = {}
    
    
        //validação para verificar se o ID é válido
            //vazio, indefinido ou não numérico
        if(idAtor=='' || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
    
            //encaminha o ID para o DAO buscar o bd
            let dadosAtor = await atorDAO.selectByIdAtor(idAtor)
    
            //verifica de o DAO retornou os dados
            if(dadosAtor){
    
                //validação para verificar a  quantidade de itens retornados
                if(dadosAtor.length > 0){

                    for(let atores of dadosAtor){
                        let sexoAtor = await sexoDAO.selectSexoById(atores.tbl_sexo_id)
                        let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtor(atores.id_ator)
                        delete atores.tbl_sexo_id
                        atores.sexo = sexoAtor
                        atores.nacionalidade = nacionalidadeAtor
                    }
                
                
                    //cria o json para retorno
               atorJson.ator = dadosAtor
               atorJson.status_code = 200
        
                return atorJson
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
        setInserirNovoAtor,
        setAtualizarAtor,
        setExcluirAtor,
        getListarAtor,
        getBuscarAtorById
    }
