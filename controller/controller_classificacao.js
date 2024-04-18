/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistenciia de dados das requisições da API de Filme
 * Data: 18/04/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//arquivo de configuração
const message = require('../modulo/config.js')

//arquivo DAO
const classificacaoDAO = require('../model/DAO/classificacao.js')
const {application} = require('express')

//validar e inserir nova classificação
const setInserirNovaClassificacao = async function (dadosClassificacao, contentType){
    try{

        if(String(contentType).toLocaleUpperCase() == 'application/json'){
            let classificacaoJson = {}

            if(
                dadosClassificacao.icon == null || dadosClassificacao.icon == undefined || dadosClassificacao.icon == '' || dadosClassificacao.icon>150 ||
                dadosClassificacao.nome == null || dadosClassificacao.nome == undefined || dadosClassificacao.nome == '' || dadosClassificacao.nome>50  ||
                dadosClassificacao.descricao == null || dadosClassificacao.descricao == undefined || dadosClassificacao.descricao == '' || dadosClassificacao.descricao>100
            ){
                return message.ERROR_REQUIRED_FIELDS

            }else{

                let novaClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao)

                if(novaClassificacao){

                    //armazenando o último id
                    let idClassificacao = await classificacaoDAO.selectId()

                    dadosClassificacao.id = idClassificacao[0].id

                    classificacaoJson.classificacao = dadosClassificacao
                    classificacaoJson.status = message.SUCESS_CREATED_ITEM.status
                    classificacaoJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    classificacaoJson.message = message.SUCESS_CREATED_ITEM.message

                    return classificacaoJson
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}
//validar e atualizar classificação
const setAtualizarClassificacao = async function (id, dadosClassificacao, contentType){
    try{
        let idClassificacao = id

        if(idClassificacao == '' || idClassificacao == null || idClassificacao == undefined){
            return message.ERROR_INVALID_ID

        }else{

            if(String(contentType).toLowerCase() == 'application/json'){
                let jsonUpdate = {}

                if(dadosClassificacao.icon == ''                || dadosClassificacao.icon == undefined              || dadosClassificacao.icon == null             || dadosClassificacao.icon.length > 150 ||
                    dadosClassificacao.nome == ''             || dadosClassificacao.nome == undefined           || dadosClassificacao.nome == null          || dadosClassificacao.nomedadosFilme.nome.length > 50 ||
                    dadosClassificacao.descricao == ''             || dadosClassificacao.descricao == undefined           || dadosClassificacao.descricao == null          || dadosClassificacao.descricao.length > 200
                ){

                    return message.ERROR_REQUIRED_FIELDS
                }else{

                    let classificacaoById = await classificacaoDAO.selectClassificacaoById(idClassificacao)
                    
                    if(classificacaoById.length>0){
                
                            let updateClassificacao = await classificacaoDAO.updateClassificacao(idClassificacao, dadosClassificacao)

                                if(updateClassificacao){
                                    jsonUpdate.classificacao = dadosClassificacao
                                    jsonUpdate.status = message.SUCESS_CREATED_ITEM.status
                                    jsonUpdate.status_code = message.SUCESS_CREATED_ITEM.status_code
                                    jsonUpdate.message = message.SUCESS_CREATED_ITEM.message

                                    return jsonUpdate
                                }else{
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
        return message.ERROR_INTERNAL_SERVER

    }
}
//excluir classificação
const setExcluirClassificacao = async function (id){
    try{
        let idClassificacao = id

        if(idClassificacao == '' || idClassificacao == null || idClassificacao == undefined){
            return message.ERROR_INVALID_ID
        }else{
            let classificacaoById = await classificacaoDAO.selectClassificacaoById(idClassificacao)

            if(classificacaoById.length>0){
                let deleteClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao)

                if(deleteClassificacao){
                    return message.SUCESS_DETELE_ITEM
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER
    }
}
//retornar todas as classificações
const getListarClassificacao = async function(){
    
    try{
        let classificacaoJson = {}

        let allClassificacoes = await classificacaoDAO.selectAllClassificacoes()

        if(allClassificacoes){

            if(allClassificacoes.length>0){
                classificacaoJson.classificacao = allClassificacoes
                classificacaoJson.status_code = 200

                return classificacaoJson
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
//buscar classificação pelo id
const getBuscarById = async function(id){
    try{

        let idClassificacao = id
        let classificacaoJson = {}

        if(idClassificacao=='' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID
        }else{

            let dadosClassificacao = await classificacaoDAO.selectClassificacaoById(idClassificacao)

            if(dadosClassificacao){

                if(dadosClassificacao.length>0){
                    classificacaoJson.genero = dadosGenero
                    classificacaoJson.status_code = 200

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
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacao,
    getBuscarById

}