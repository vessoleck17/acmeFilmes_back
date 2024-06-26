0/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistenciia de dados das requisições da API de Filme
 * Data: 01/02/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Iport do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO quue fará a comunicação com o banco de dados
const filmeDAO = require('../model/DAO/filmes.js')
const classificacaoDAO = require('../model/DAO/classificacao.js')
const { application } = require('express')

//função para validar e inserir um novo filme 
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            //cria o objeto JSON para devolver os dados criados na requisição
            let novoFilmeJson = {}


            //validação de campos obrigatórios ou com digitação inválida
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 300 ||
                dadosFilme.valor_unitario.length > 6

            ) {

                return message.ERROR_REQUIRED_FIELDS //400

            } else {

                let validateStatus = false


                //validação da data de relançamento, já que ela não é obrigatória no BD
                if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined) {


                    //validação para verificar se a data esta com qtde de digitos corretos
                    if (dadosFilme.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //validação para verificar se podemos encaminhar os dados para o DAO
                if (validateStatus) {

                    //encaminha os dados do filme para o DAO inserir no BD
                    let novoFilme = await filmeDAO.insertFilme(dadosFilme)

                    //cria o json de retorno dos dados (201)
                    if (novoFilme) {

                        let idFilme = await filmeDAO.selectId()
                        dadosFilme.id = idFilme[0].id

                        novoFilmeJson.filme = dadosFilme
                        novoFilmeJson.status = message.SUCESS_CREATED_ITEM.status
                        novoFilmeJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoFilmeJson.message = message.SUCESS_CREATED_ITEM.message

                        return novoFilmeJson // 201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500
                    }
                }
            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 erro na controller 
    }
}

// função para validar e atualizar filme 
const setAtualizarFilme = async function (id, dadosFilme, contentType) {
    try {

        let idFilme = id

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID

        } else {

            if (String(contentType).toLowerCase() == 'application/json') {
                let jsonUpdate = {}

                if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                    dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                    dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                    dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                    dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 300 ||
                    dadosFilme.valor_unitario.length > 6

                ) {
                    return message.ERROR_REQUIRED_FIELDS //400
                } else {

                    let validateStatus = false
                    if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined) {

                        if (dadosFilme.data_relancamento.length != 10) {

                            return message.ERROR_REQUIRED_FIELDS //400
                        } else {
                            validateStatus = true
                        }
                    } else {
                        validateStatus = true
                    }

                    let filmeById = await filmeDAO.selectByIdFilme(idFilme)
                    if (filmeById.length > 0) {

                        if (validateStatus) {

                            let updateFilme = await filmeDAO.updateFilmes(id, dadosFilme)

                            console.log(updateFilme)

                            if (updateFilme) {
                                jsonUpdate.filme = dadosFilme
                                jsonUpdate.status = message.SUCESS_CREATED_ITEM.status
                                jsonUpdate.status_code = message.SUCESS_CREATED_ITEM.status_code
                                jsonUpdate.message = message.SUCESS_CREATED_ITEM.message

                                return jsonUpdate
                            } else {

                                return message.ERROR_INTERNAL_SERVER_DB
                            }
                        }
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                }
            } else {
                return message.ERROR_CONTENT_TYPE
            }
        }
    } catch (error) {

        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}


//função para excluir um filme 
const setExcluirFilme = async function (id) {
    try {

        let idFilme = id

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            let filmeById = await filmeDAO.selectByIdFilme(idFilme)
            if (filmeById.length > 0) {

                let deleteFilme = await filmeDAO.deleteFilme(idFilme)

                if (deleteFilme) {
                    return message.SUCESS_DETELE_ITEM
                } else {
                    return message.ERROR_NOT_FOUND
                }
            }
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//função para retornar todos os filmes
const getListarFilmes = async function () {

    try {
        //criia o objeto json
        let filmesJson = {}

        //chama a função do DAO para retornar os dados da tabela de filme
        let dadosFilmes = await filmeDAO.selectAllFilmes();



        //verifica de o DAO retornou os dados
        if (dadosFilmes) {

            //validação para verificar a  quantidade de itens retornados
            if (dadosFilmes.length > 0) {

                for (let filme of dadosFilmes) {
                    filme.classificacao = await classificacaoDAO.selectClassificacaoById(filme.id_classificacao)
                    filme.atores = await filmeDAO.selectAtores(filme.id)
                    filme.diretores = await filmeDAO.selectDiretores(filme.id)
                    filme.generos = await filmeDAO.selectGeneros(filme.id)
                }

                

                //cria o json para retorno
                filmesJson.filme = dadosFilmes
                filmesJson.status_code = 200


                return filmesJson

                
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

//função para buscar filme pelo ID
const getBuscarFilme = async function (id) {

    try {
        //recebe o id do filme
        let idFilme = id

        //cria o objeto json
        let filmesJson = {}


        //validação para verificar se o ID é válido
        //vazio, indefinido ou não numérico
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            //encaminha o ID para o DAO buscar o bd
            let dadosFilmes = await filmeDAO.selectByIdFilme(idFilme)

            //verifica de o DAO retornou os dados
            if (dadosFilmes) {

                //validação para verificar a  quantidade de itens retornados
                if (dadosFilmes.length > 0) {

                    for (let filme of dadosFilmes) {
                        filme.classificacao = await classificacaoDAO.selectClassificacaoById(filme.id_classificacao)
                        delete filme.id_classificacao
                        filme.atores = await filmeDAO.selectAtores(filme.id)
                        filme.diretores = await filmeDAO.selectDiretores(filme.id)
                        filme.generos = await filmeDAO.selectGeneros(filme.id)
                    }


                    //cria o json para retorno
                    filmesJson.filme = dadosFilmes
                    filmesJson.status_code = 200

                    return filmesJson
                } else {
                    return message.ERROR_NOT_FOUND //404
                }

            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }



}

const getFilmeByNome = async function (nome) {

    try {
        let nomeFilme = nome
        let filmesJson = {}

        //validação para verificar se o nome é válido
        //vazio ou indefinido 
        if (nomeFilme == '' || nomeFilme == undefined) {
            return message.ERROR_INVALID_NOME
        } else {

            //encaminha o ID para o DAO buscar o bd
            let dadosFilmes = await filmeDAO.selectByNomeFilme(nome)

            //verifica de o DAO retornou os dados
            if (dadosFilmes) {

                //validação para verificar a  quantidade de itens retornados
                if (dadosFilmes.length > 0) {

                    for (let filme of dadosFilmes) {
                        filme.classificacao = await classificacaoDAO.selectClassificacaoById(filme.id_classificacao)
                        delete filme.id_classificacao
                        filme.atores = await filmeDAO.selectAtores(filme.id)
                        filme.diretores = await filmeDAO.selectDiretores(filme.id)
                        filme.generos = await filmeDAO.selectGeneros(filme.id)
                    }


                    //cria o json para retorno
                    filmesJson.filme = dadosFilmes
                    filmesJson.status_code = 200

                    return filmesJson
                } else {
                    return message.ERROR_NOT_FOUND //404
                }

            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }



}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeByNome
}
