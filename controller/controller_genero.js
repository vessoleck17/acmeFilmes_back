/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistenciia de dados das requisições da API de Filme
 * Data: 18/04/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/


//import do arquivo de configurações 
const message = require ('../modulo/config.js')

//import do arquivo DAO para comunicação com o banco de dados 
const generoDAO = require('../model/DAO/generos.js')
const {application} = require ('express')


//função para validar e inserir novo genero no banco de dados
const setInserirNovoGenero = async function(dadosGenero, contentType){
    try{
        if (String(contentType).toLowerCase() == 'application/json'){

            let novoGeneroJson = {}

            //validação de campos obrigatórios ou com digitação inválida
            if(dadosGenero.nome == ''                || dadosFilme.nome == undefined              || dadosFilme.nome == null             || dadosFilme.nome.length > 45){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{

                let novoGenero = await generoDAO.insertGenero(dadosGenero)

                if(novoGenero){
                    let idGenero = await generoDAO.selectId()
                    dadosGenero.id = idGenero[0].id

                    novoGeneroJson.genero = dadosGenero
                    novoGeneroJson.status = message.SUCESS_CREATED_ITEM.status
                    novoGeneroJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoGeneroJson.message = message.SUCESS_CREATED_ITEM.message

                    return novoGeneroJson

                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
       
        } else {
            return message.ERROR_CONTENT_TYPE
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}
//validação e atualização de um genero
const setAtualizarGenero = async function(id, dadosGenero, contentType){
    try{
        let idGenero = id

        if(idGenero=='' || idGenero==undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{
            if(String(contentType).toLowerCase() == 'application/json'){
                let jsonUpdate = {}

                if(dadosGenero.nome == ''                || dadosFilme.nome == undefined              || dadosFilme.nome == null             || dadosFilme.nome.length > 45){
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    let generoById = await generoDAO.selectGeneroById(idGenero)

                    if(generoById.length>0){
                        let updateGenero = await generoDAO.updateGenero(idGenero, dadosGenero)

                        if(updateGenero){
                            jsonUpdate.genero = dadosGenero
                            jsonUpdate.status = message.SUCESS_CREATED_ITEM.status
                            jsonUpdate.status_code = message.SUCESS_CREATED_ITEM.status_code
                            jsonUpdate.message = message.SUCESS_CREATED_ITEM.message

                            return jsonUpdate
                        }else{
                            return message.ERROR_NOT_FOUND
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}
//excluir genero
const setExcluirGenero = async function(id){

    try{
        let idGenero = id 

        if(idGenero=='' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{
            let generoById = await generoDAO.selectGeneroById(idGenero)

            if(generoById.length>0){
                let deleteGenero = await generoDAO.deleteGenero(idGenero)

                if(deleteGenero){
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
//listar todos os gêneros 
const getListarGeneros = async function(){
    
    try{
        let generosJson = {}

        let allGeneros = await generoDAO.selectAllgeneros()

        if(allGeneros){

            if(allGeneros.length>0){
                generosJson.genero = allGeneros
                generosJson.status_code = 200

                return generosJson
            }else{
                return message.ERROR_NOT_FOUND
            }
            
        }else{
            return message.ERROR_INTERNAL_SERVER_DB

        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}
//função para buscar o genero pelo id
const getBuscarById = async function(id){
    try{

        let idGenero = id
        let generoJson = {}

        if(idGenero=='' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{

            let dadosGenero = await generoDAO.selectGeneroById(idGenero)

            if(dadosGenero){

                if(dadosGenero.length>0){
                    generoJson.genero = dadosGenero
                    generoJson.status_code = 200

                    return generoJson
                }else{
                    return message.ERROR_NOT_FOUND
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_DB
            }

        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGeneros,
    getBuscarById
}