const { json } = require('body-parser')
var AcmeFilmes = require ('../modulo/filmes')

const getListaFilmes = function(){
    let filmes = AcmeFilmes.filmes
    let arrayFilmes = []
    let status = false

       filmes.filmes.forEach((filme) => {
        
        let jsonFilmes = {
        id: filme.id,  
        nome: filme.nome,
        sinopse: filme.sinopse,
        duracao: filme.duracao,
        data_lancamento: filme.data_lancamento,
        data_relancamento: filme.data_relancamento,
        foto_capa: filme.foto_capa,
        valor_unitario: filme.valor_unitario
        }

        arrayFilmes.push(jsonFilmes)
        status = true
    })
    if(status)
    return arrayFilmes
    else
    return false
}

const getFilmeById = function(idFilme){
let jsonFilmes = {}
let filtro = idFilme
let status = false

AcmeFilmes.filmes.filmes.forEach(function(filmes){
    if(filtro == filmes.id){
        
        jsonFilmes.idFilme = filmes.id
        jsonFilmes.nome = filmes.nome
        jsonFilmes.sinopse = filmes.sinopse
        jsonFilmes.duracao = filmes.duracao
        jsonFilmes.data_lancamento = filmes.data_lancamento
        jsonFilmes.data_relancamento = filmes.data_relancamento
        jsonFilmes.foto_capa = filmes.foto_capa
        jsonFilmes.valor_unitario = filmes.valor_unitario

        status = true  
        
    }
})

if (status)
return jsonFilmes
else
return false

}




// console.log(getListaFilmes())
// console.log(getFilmeById())
module.exports = {
    getListaFilmes,
    getFilmeById
}