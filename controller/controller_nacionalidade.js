const nacionalidadeDAO = require('../model/DAO/nacionalidade')

const {application} = require ('express')

const message = require('../modulo/config')

const getListarNacionalidades = async function(){

    try{
        let nacionalidadeJson = {}
        let dadosNacionalidade = await nacionalidadeDAO.selectAllNacionalidades()

        if(dadosNacionalidade){
            if(dadosNacionalidade.length > 0){
                nacionalidadeJson.nacionalidade = dadosNacionalidade
                nacionalidadeJson.quantidade = dadosNacionalidade.length
                nacionalidadeJson.status_code = 200

                return nacionalidadeJson
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER
        }

    }catch(error){
        return message.ERROR_INTERNAL_SERVER_DB
    }
    
}

const getNacionalidadeById = async function (id){
    try{
        let idNacionalidade = id
        let nacionalidadeJson = {}

        if (idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)) {
            return message.ERROR_INVALID_ID
        } else {

          let dadosNacionalidade = await nacionalidadeDAO.selectNacionalidadeById(idNacionalidade)
          
          console.log(dadosNacionalidade)
          if(dadosNacionalidade){

            if (dadosNacionalidade.length > 0) {
                nacionalidadeJson.nacionalidade = dadosNacionalidade
                nacionalidadeJson.status_code = 200

                return nacionalidadeJson
            } else {
                return message.ERROR_NOT_FOUND
            }
          }else{
            return message.ERROR_INTERNAL_SERVER
          }

    }
    
}catch(error){
        return message.ERROR_INTERNAL_SERVER_DB
    }
}


module.exports = {
    getListarNacionalidades,
    getNacionalidadeById
}
