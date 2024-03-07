/*********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consistenciia de dados das requisições da API de Filme
 * Data: 01/02/2024
 * Autor: Paloma Vessoleck
 * Versão: 1.0
 *********************************************************************************************************************************/

//Iport do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo DAO quue fará a comunicação com o banco de dados
const filmeDAO = require('../model/DAO/filmes.js')

//função para validar e inserir um novo filme 
const setInserirNovoFilme = async function(dadosFilme){


    //cria o objeto JSON para devolver os dados criados na requisição
    let novoFilmeJson = {}


    //validação d ecampos obrigatórios ou com digitação inválida
    if(dadosFilme.nome == ''                || dadosFilme.nome == undefined              || dadosFilme.nome == null             || dadosFilme.nome.length > 80 ||
       dadosFilme.sinopse == ''             || dadosFilme.sinopse == undefined           || dadosFilme.sinopse == null          || dadosFilme.sinopse.length > 65000 ||
       dadosFilme.duracao == ''             || dadosFilme.duracao == undefined           || dadosFilme.duracao == null          || dadosFilme.duracao.length > 8 ||
       dadosFilme.data_lancamento == ''     || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento == null  || dadosFilme.data_lancamento.length != 10 ||
       dadosFilme.foto_capa == ''           || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa == null        || dadosFilme.foto_capa.length > 200 ||
       dadosFilme.valor_unitario.length > 6

    ){
        
        return message.ERROR_REQUIRED_FIELDS //400
        
    }else{

        let validateStatus = false


        //validação da data de relançamento, já que ela não é obrigatória no BD
        if(dadosFilme.data_relancamento != null && dadosFilme.data_relancamento !='' && dadosFilme.data_relancamento != undefined){
           
           
           //validação para verificar se a data esta com qtde de digitos corretos
            if(dadosFilme.data_relancamento.length != 10){
                
                 return message.ERROR_REQUIRED_FIELDS //400
            }else{
                validateStatus = true
            }
        }else{
            validateStatus = true
        }

        //validação para verificar se podemos encaminhar os dados para o DAO
        if (validateStatus ){


            //encaminha os dados do filme para o DAO inserir no BD
            let novoFilme = await filmeDAO.insertFilme(dadosFilme)
        
            


            //cria o json de retorno dos dados (201)
             if(novoFilme){

                let idFilme = await filmeDAO.selectId()
                dadosFilme.id = idFilme[0].id

               
                novoFilmeJson.filme = dadosFilme
                novoFilmeJson.status = message.SUCESS_CREATED_ITEM.status
                novoFilmeJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                novoFilmeJson.message = message.SUCESS_CREATED_ITEM.message

                return novoFilmeJson // 201
            }else{
                return message.ERROR_INTERNAL_SERVER_DB // 500
            }

        }

        

        
    
    }
}

//função para validar e atualizar filme 
const setAtualizarFilme = async function(){

}

//função para excluir um filme 
const setExcluirFilme = async function(){

}

//função para retornar todos os filmes
const getListarFilmes = async function(){


    //criia o objeto json
    let filmesJson = {}

    //chama a função do DAO para retornar os dados da tabela de filme
    let dadosFilmes = await filmeDAO.selectAllFilmes();


    //verifica de o DAO retornou os dados
    if(dadosFilmes){

        //validação para verificar a  quantidade de itens retornados
        if(dadosFilmes.length > 0){
        
        
            //cria o json para retorno
        filmesJson.filme = dadosFilmes
        filmesJson.status_code = 200

        return filmesJson
        }else{
            return message.ERROR_NOT_FOUND //404
        }

    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

//função para buscar filme pelo ID
const getBuscarFilme = async function(id){

    //recebe o id do filme
    let idFilme = id

    //cria o objeto json
    let filmesJson = {}


    //validação para verificar se o ID é válido
        //vazio, indefinido ou não numérico
    if(idFilme=='' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID
    }else{

        //encaminha o ID para o DAO buscar o bd
        let dadosFilmes = await filmeDAO.selectByIdFilme(idFilme)

        //verifica de o DAO retornou os dados
        if(dadosFilmes){

            //validação para verificar a  quantidade de itens retornados
            if(dadosFilmes.length > 0){
            
            
                //cria o json para retorno
            filmesJson.filme = dadosFilmes
            filmesJson.status_code = 200
    
            return filmesJson
            }else{
                return message.ERROR_NOT_FOUND //404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

    
    
}

const getFilmeByNome = async function(nome){
    let nomeFilme = nome
    let filmesJson = {}

   //validação para verificar se o nome é válido
        //vazio ou indefinido 
        if(nomeFilme=='' || nomeFilme == undefined){
            return message.ERROR_INVALID_NOME
        }else{
    
            //encaminha o ID para o DAO buscar o bd
            let dadosFilmes = await filmeDAO.selectByNomeFilme(nome)
    
            //verifica de o DAO retornou os dados
            if(dadosFilmes){
    
                //validação para verificar a  quantidade de itens retornados
                if(dadosFilmes.length > 0){
                
                
                    //cria o json para retorno
                filmesJson.filme = dadosFilmes
                filmesJson.status_code = 200
        
                return filmesJson
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
    
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
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