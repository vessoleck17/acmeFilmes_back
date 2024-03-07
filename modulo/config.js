/**************************************************************************
 * Objetivo: Arquivo responsável pela padronização de variáveis globais utilizadas no projeto
 * data: 22/02/24
 * autor: Paloma Vessoleck
 * versão: 1.0
 *************************************************************************/


/***********************  Mensagem de erro  ************************** */
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados os itens'}
const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possível processar a requisição devido a um problema na comunicação com o banco de dados. Contate o administrador da API'}
const ERROR_INVALID_NOME = {status: false, status_code: 400, message: 'O nome encaminhado na requisição não é válido'}
const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos, ou não atendem os critérios de digitação'}


/************************* Mensagens de sucesso ****************************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com suesso!!'}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_NOME,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM
}