/***************************************************************************
 * Objetivo: Desenvolver um projeto para a empresa ACME filmes
 * Autor: Paloma Vessoleck
 * Data: 25/01/24
 * Versão: 1.0
 *************************************************************************/

/*
    Para realizar o acesso a Banco de Dados precisamos instalar algumas bibliotecas:
        - SEQUELIZE  - uma biblioteca mais antiga
        - PRISMA ORM - umaa biblioteca mais atual (será utilizada no projeto)
        - FASTFY ORM - uma biblioteca mais atual
 */


/*
    Para criar uma API podemos utilizar o EXPRESS;
        npm install express --save -> É a biblioteca que vai gerenciar as aquisições da API;
        npm install body-parser --save -> É a biblioteca que vai manipular dados do corpo da aquisição (POST, PUT);
        npm install cors --save -> É responsavel pelas permissões (HEADER) de acesso das aquisições;
*/

/*
    Para instalar o PRISMA:
        - npm install prisma --save (irá realizar a conexão com o banco de dados)
        - npm install @prisma/client --save (responsavel por executar os scripts SQL no banco de dados)
        
        Após a instalação das bibliotecas, devemos inicializara o prisma no projeto
        - npx prisma init (inicializa o prisma)
*/

// Import das biblioteca para criar a API
 const express = require('express')
 const bodyParser = require('body-parser')
 const cors = require('cors')


 // Criando um objeto para manipular as requisições da API
 const app = express()


 // Request -> Entrada de algum dado na API
// Response -> Saida (return) de algum dado na API
// Next -> 

// Função para manipular as restrições da API
app.use((request, response, next) =>{

    // Permite especificar quem podera acessar a API ('*' = Liberar acesso público, 'IP' = Liberar acesso apenas para aquela maquina);
    response.header('Access-Control-Allow-Origin', '*')

    // Permite especificar como a API, sera requisitada ('GET', 'POST', 'PUT' e 'DELETE')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    // Ativa as confgurações de cors
    app.use(cors())


    next()
})

/************************* Import dos arquivos da controller do projeto **************************** */
const controllerFilmes = require('./controller/controller_filmes')
const controllerGenero = require('./controller/controller_genero')
const controllerClassificacao = require('./controller/controller_classificacao')
const controllerAtor = require('./controller/controller_ator')

/************************************************************************************ */

// criando um objeto para controlar a chegada dos dados da requisição em formato json
const bodyParserJson = bodyParser.json()


//endPoints


//endpoint versão 1.0 - retorna todos os filmes do arquivo filmes.js
    //periodo de funcionamento: 01/24 até 02/24
app.get('/v1/ACME_FILMES/filmes', cors(), async function(request, response){
    let controleAcmeFilmes = require('./controller/function')
    let ListaFilmes = controleAcmeFilmes.getListaFilmes()

    if(ListaFilmes){
        response.json(ListaFilmes)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro:'Item não encontrado'})
    }
})

app.get('/v1/ACME_FILMES/filme/:id', cors(), async function(request, response){
    let controleAcmeFilmes = require('./controller/function')
    let idFilme = request.params.idFilme
    let filmeById = controleAcmeFilmes.getFilmeById(idFilme)
    

    if(filmeById){
        response.json(filmeById)
        response.status(200)
    }else{
        response.status(404)
        response.json({erro:'Item não encontrado'})
    }
})

//endpoint versão 2.0 - retorna tods os filmes do banco de dados
    //periodo de fucionamento: 02/24
app.get('/v2/ACME_FILMES/filmes', cors(), async function(request, response){

    //chama a função da controller para retornar oos fimes
    let dadosFilmes = await controllerFilmes.getListarFilmes();


    //validação para retornar o JSON dos filmes ou retornar 404
    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404)
    }
})

//endPoint: retorna o filme filtrando pelo id
app.get('/v2/ACME_FILMES/filme/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJson, async function(request, response){

    //Recebe o content-type com o tipo de dados encaminhado na requisição
    let contentType = request.headers['content-type']


    //recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//endPoint: retorna o filme filtrando pelo nome
app.get('/v1/ACME_FILMES/filmes/filtro', cors(), async function(request, response){
    
    //recebe o nome da requisição
    let nomeFilme = request.query.nome

    //encaminha o nome para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getFilmeByNome(nomeFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.delete('/v2/ACME_FILMES/deleteFilme/:id', cors(), async function(request,response){
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.put('/v2/ACME_FILMES/updateFilme/:id', cors(), bodyParserJson,  async function(request,response){
    let idFilme = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoFilme = await controllerFilmes.setAtualizarFilme(idFilme,dadosBody, contentType)

    response.status(atualizacaoFilme.status_code)
    response.json(atualizacaoFilme)

})


/**************************************** Gêneros  *****************************************/

app.get('/v2/ACME_FILMES/generos', cors(), async function(request, response){
    let dadosGenero = await controllerGenero.getListarGeneros()

    if(dadosGenero){
        response.json(dadosGenero)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrdao'})
        response.status(404)
    }
})

app.get('/v2/ACME_FILMES/genero/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idGenero = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosGenero = await controllerGenero.getBuscarGeneroById(idGenero)


    if(dadosGenero){
        response.json(dadosGenero)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

app.post('/v2/acmefilmes/genero', cors(), bodyParserJson, async function(request, response){

    //Recebe o content-type com o tipo de dados encaminhado na requisição
    let contentType = request.headers['content-type']


    //recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoGenero = await controllerGenero.setInserirNovoGenero(dadosBody, contentType)

    response.status(200)
    response.json(resultDadosNovoGenero)
})

app.delete('/v2/ACME_FILMES/deleteGenero/:id', cors(), async function(request,response){
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.put('/v2/ACME_FILMES/updateGenero/:id', cors(), bodyParserJson,  async function(request,response){
    let idGenero = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoGenero = await controllerGenero.setAtualizarGenero(idGenero,dadosBody, contentType)

    response.status(atualizacaoGenero.status_code)
    response.json(atualizacaoGenero)

})

/************************************** Classificação **************************************/

app.get('/v2/ACME_FILMES/classificacao', cors(), async function(request, response){
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao()

    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrdao'})
        response.status(404)
    }
})

app.get('/v2/ACME_FILMES/classificacao/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idClassificacao = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacaoById(idClassificacao)


    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

app.post('/v2/acme_filmes/classificacao', cors(), bodyParserJson, async function(request, response){

    //Recebe o content-type com o tipo de dados encaminhado na requisição
    let contentType = request.headers['content-type']


    //recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminha os dados para a controller enviar para o DAO
    let resultDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDadosNovaClassificacao.status_code)
    response.json(resultDadosNovaClassificacao)
})

app.delete('/v2/ACME_FILMES/deleteClassificacao/:id', cors(), async function(request,response){
    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.put('/v2/ACME_FILMES/updateClassificacao/:id', cors(), bodyParserJson,  async function(request,response){
    let idClassificacao = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoClassificacao = await controllerClassificacao.setAtualizarClassificacao(idClassificacao,dadosBody, contentType)

    response.status(atualizacaoClassificacao.status_code)
    response.json(atualizacaoClassificacao)

})

/*************************************  ATOR *********************************/

app.get('/v2/ACME_FILMES/ator', cors(), async function(request, response){
    let dadosAtor = await controllerAtor.getListaA()

    if(dadosAtor){
        response.json(dadosAtor)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado'})
        response.status(404)
    }
})

app.post('/v2/acme_filmes/ator', cors(), bodyParserJson, async function(request, response){

    //Recebe o content-type com o tipo de dados encaminhado na requisição
    let contentType = request.headers['content-type']


    //recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminha os dados para a controller enviar para o DAO
    let resultDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType)

    response.status(resultDadosNovaClassificacao.status_code)
    response.json(resultDadosNovaClassificacao)
})

app.get('/v2/ACME_FILMES/ator/:id', cors(), async function(request, response){
    
    //recebe o id da requisição
    let idAtor = request.params.id

    //encaminha o id para a controller buscar o filme
    let dadosAtor = await controllerAtor.getBuscarAtorById(idAtor)


    if(dadosAtor){
        response.json(dadosAtor)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro foi encontrado!'})
        response.status(404)
    }
    
    
})

app.delete('/v2/ACME_FILMES/deleteAtor/:id', cors(), async function(request,response){
    let idAtor = request.params.id

    let dadosAtor = await controllerAtor.setExcluirAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

app.put('/v2/ACME_FILMES/updateAtor/:id', cors(), bodyParserJson,  async function(request,response){
    let idAtor = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let atualizacaoAtor = await controllerAtor.setAtualizarAtor(idAtor,dadosBody, contentType)

    response.status(atualizacaoAtor.status_code)
    response.json(atualizacaoAtor)

})



app.listen('8080', function(){
    console.log('API funcionando!!')
})