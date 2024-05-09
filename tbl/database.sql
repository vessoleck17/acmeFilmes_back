create database db_acme_filmes_turma_bb;
use db_acme_filmes_turma_bb;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(400) not null,
    valor_unitario float not null,
    id_classificacao int not null,
	index fk_tbl_filme_tbl_classificacao (id_classificacao asc),
    constraint fk_tbl_filme_tbl_classificacao
    foreign key (id_classificacao)
    references tbl_classificacao(id)
);

desc table tbl_filme;

CREATE TABLE tbl_classificacao(
id int not null auto_increment primary key,
icon VARCHAR (150),
nome varchar (50),
descricao TEXT,
UNIQUE KEY(id)
);

insert into tbl_classificacao (icon, nome, descricao) value (
'https://img.odcdn.com.br/wp-content/uploads/2022/02/L-AUTO.jpg',
'Livre',
'Não expõe crianças a conteúdos potencialmente prejudiciais'
),

('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR10-AUTO.jpg',
'Não recomendado para menores de 10 anos',
'Conteúdo violento ou linguagem inapropriada para crianças, mesmo em menor intensidade'
),

('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR12-AUTO.jpg',
'Não recomendado para menores de 12 anos',
'As cenas podem conter agressão física, consumo de drogas e insinuação sexual'
),

('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR14-AUTO.jpg',
'Não recomendado para menores de 14 anos',
'Conteúdos mais violentos e/ou de linguagem sexual mais acentuada'
),

('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR16-AUTO.jpg',
'Não recomendado para menores de 16 anos',
'Conteúdos mais violentos ou com conteúdo sexual mais intenso, com cenas de tortura, suicidio, estupro ou nudez total'
),

('https://img.odcdn.com.br/wp-content/uploads/2022/02/NR18-AUTO.jpg',
'Não recomendado para menores de 18 anos',
'Conteúdos violentos e sexuais extremos. Cenas de sexo, incesto ou atos repetidos de tortura, mutilação ou abuso sexual.'
);



create table tbl_genero (
	id int not null auto_increment,
    nome varchar(45) not null,
    primary key(id)
);

create table tbl_nacionalidade(
	id int not null auto_increment,
    nome varchar(50) not null,
	primary key(id)
);

create table tbl_sexo (
	id int not null auto_increment primary key,
    sigla varchar(3) not null,
    nome varchar(45) not null
);

create table tbl_diretor (
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text null,
    foto varchar(300),
	tbl_sexo_id int not null,
    index fk_tbl_diretor_tbl_sexo1_sexo1_idx(tbl_sexo_id asc),
    constraint fk_tbl_diretor_tbl_sexo1
    foreign key(tbl_sexo_id)
    references tbl_sexo(id)
);


create table tbl_ator(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text not null,
    foto varchar(300) not null,
    tbl_sexo_id int not null,
    index fk_tbl_ator_sexo1_idx(tbl_sexo_id asc),
    constraint fk_tbl_ator_tbl_sexo1
    foreign key(tbl_sexo_id)
    references tbl_sexo(id)
);




create table tbl_filme_ator (
	id int not null auto_increment primary key,
    tbl_filme_id int not null,
    tbl_ator_id int not null,
    index fk_tbl_tbl_ator_tbl_filme1_idx(tbl_filme_id asc),
    index fk_tbl_filme_ator_tbl_ator1_idx(tbl_ator_id asc),
    constraint fk_tbl_filme_ator_tbl_filme
    foreign key(tbl_filme_id)
    references tbl_filme(id),
    constraint fk_tbl_filme_ator_tbl_ator
    foreign key(tbl_ator_id)
    references tbl_ator (id)
);

create table tbl_ator_nacionalidade (
	id int not null auto_increment,
    tbl_nacionalidade int not null,
    tbl_ator_id int not null,
    primary key(id),
    index fk_tbl_ator_nacionalidade_tbl_nacionalidade1_idx(tbl_nacionalidade asc),
    index fk_tbl_ator_nacionalidade_tbl_ator1_idx(tbl_ator_id asc),
    constraint fk_tbl_ator_nacionalidade_tbl_nacionalidade1
    foreign key(tbl_nacionalidade)
    references tbl_nacionalidade(id),
    constraint fk_tbl_ator_nacionalidade_tbl_ator1
    foreign key(tbl_ator_id)
    references tbl_ator(id)
);

create table tbl_diretor_nacionalidade(
    id int not null auto_increment,
    tbl_nacionalidade_id int not null,
    tbl_diretor_id int not null,
    primary key(id),
    index fk_tbl_diretor_nacionalidade_tbl_nacionalidade1_idx(tbl_nacionalidade_id asc),
    index fk_tbl_diretor_nacionalidade_tbl_diretor1_idx(tbl_diretor_id asc),
    constraint fk_tbl_diretor_nacionalidade_tbl_nacionalidade1
    foreign key(tbl_nacionalidade_id)
    references tbl_nacionalidade(id),
    constraint fk_tbl_diretor_nacionalidade_tbl_diretor1
    foreign key (tbl_diretor_id)
    references tbl_diretor(id)
);

create table tbl_filme_diretor(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_diretor int not null,
    
    constraint FK_DIRETOR_FILMEDIRETOR
    foreign key(id_diretor)
    references tbl_diretor(id),
    
    constraint FK_FILME_FILMEDIRETOR
    foreign key(id_filme)
    references tbl_filme(id)
);

create table tbl_filme_genero(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_genero int not null,
    
    constraint FK_GENERO_FILMEGENERO
    foreign key(id_genero)
    references tbl_genero(id),
    
    constraint FK_FILME_FILMEGENERO
    foreign key(id_filme)
    references tbl_filme(id)
);

desc tbl_classificacao;



desc tbl_filme;

insert into tbl_filme(nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario, id_classificacao)values
('Kung Fu Panda 4',
 'Depois de três aventuras arriscando sua própria vida para derrotar os mais poderosos vilões, Po, o Grande Dragão Guerreiro( Jack Black) é escolhido para se tornar o Líder Espiritual do Vale da Paz. A escolha em si já problemática ao colocar o mestre de kung fu mais improvável do mundo em um cargo como esse e além disso, ele precisa encontrar e treinar um novo Dragão Guerreiro antes de assumir a honrada posição e a pessoa certa parece ser Zhen (Awkwafina) uma raposa com muitas habilidades, mas que não gosta muito da ideia de ser treinada. Como se os desafios já não fossem o bastante, a Camaleoa (Viola Davis), uma feiticeira perversa, tenta trazer de volta todos os vilões derrotados por Po do reino espiritual.',
 '01:34:00',
 '2024-03-21',
 null,
 'https://br.web.img2.acsta.net/c_310_420/pictures/23/12/13/18/13/4592801.jpg',
 '50.00',
 1),
 
 ('Donzela',
 'Estrelada por Mille Bobby-Brown, o filme Donzela segue a personagem Elodie (Bobby Brown), uma princesa de um reino, que concorda em se casar com um lindo príncipe de outro lugar. Mas o que ela não sabe, é que este conto de fadas é na realidade, um grande engano. A realeza pretende sacrificá-la. Enganada pelo rei, a princesa se torna o sacrifício de uma antiga dívida. Agora, presa em uma caverna de dragão e sabendo que ninguém vem resgatá-la, ela precisará usar sua astúcia, inteligência e perseverança para escapar com vida - tudo isso, sem a ajuda de nenhum príncipe encantado.',
 '01:47:00',
 '2024-03-08',
 null,
 'https://br.web.img3.acsta.net/c_310_420/pictures/24/03/08/21/30/1025903.jpg',
 '45.00',
 3),
 
 ('Os Farofeiros 2',
 'Em Os Farofeiros 2, acompanhamos um novo capítulo da história dos amigos Alexandre (Antônio Fragoso), Lima (Maurício Manfrini), Rocha (Charles Paraventi) e Diguinho (Nilton Bicudo). Quando Alexandre é reconhecido como o melhor gerente de vendas na empresa em que trabalha, ele ganha como recompensa por seus esforços uma viagem para a Bahia com toda a família. Porém, os outros três amigos não estão muito felizes com a forma como Alexandre comanda as coisas. Para tentar amolecer o coração dos amigos e garantir sua tão esperada promoção, ele resolve levar todos - acompanhados das esposas e dos filhos - para a viagem ao Nordeste.',
 '01:44:00',
 '2024-03-07',
 null,
 'https://br.web.img3.acsta.net/c_310_420/pictures/24/02/23/15/44/3187051.png',
 '48.00',
 3)
 ;

desc tbl_sexo;
insert into tbl_sexo(sigla, nome) values (
	"F",
    "Feminino"
), 
(
	"M",
    "Masculino"
);

insert into tbl_ator(nome, data_nascimento, data_falecimento, biografia, foto, tbl_sexo_id)values
(	'Ezra Miller',
	'1992-09-30',
    '200-09-30',
	'Ezra Matthew Miller é um ator estadunidense que trabalha como intérprete de artes cênicas, cancionista, musicista e modelo.',
    'https://pt.wikipedia.org/wiki/Ficheiro:Ezra_Miller_by_Gage_Skidmore_2.jpg',
    2
),
(	'Maribel Verdú',
	'1970-10-2',
    '200-03-12',
	'Maribel Verdú é uma atriz espanhola.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Premios_Goya_2018_-_Maribel_Verd%C3%BA.jpg/200px-Premios_Goya_2018_-_Maribel_Verd%C3%BA.jpg',
    1
),
(	'Ron Livingston',
	'1967-06-05',
    null,
	'Ronald Joseph "Ron" Livingston é um ator norte-americano. Seus papéis incluem um empregado descontente no filme Office Space, um escritor sarcástico em uma relação com Carrie Bradshaw na série de TV Sex and the City e Capitão Lewis Nixon na minissérie Band of Brothers.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/RonLivingstonMay10.jpg/230px-RonLivingstonMay10.jpg',
    2
),
(	'Ben Affleck',
	'1972-05-15',
    null,
	'Benjamin Géza "Ben" Affleck-Boldt é um ator, diretor, roteirista e produtor norte-americano. Começou sua carreira como ator mirim, protagonista na série educativa The Voyage of the Mimi e The Second Voyage of the Mimi da PBS.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/200px-Ben_Affleck_by_Gage_Skidmore_3.jpg',
    2
);

insert into tbl_nacionalidade(nome)values
(
"Brasileiro"
),
(
"Estadunidense"
),
(	
"Espanhol"
),
(
"Argentino"
);

select * from tbl_diretor;
ALTER TABLE tbl_diretor
add column foto varchar (300);

delete from tbl_diretor where id=1;

insert into tbl_diretor(
	nome,
    data_nascimento,
    data_falecimento,
    biografia,
    foto,
    tbl_sexo_id
)values(
	'Sam adi',
	'1976-05-02',
    '2023-02-10',
	'Samuel Henry John "Sam" Worthington é um ator australiano nascido na Inglaterra. Se tornou conhecido principalmente por seus papéis no cinema como Jake Sully no premiado Avatar, Marcus Wright em Terminator Salvation e como Perseu no remake de 2010 Clash of the Titans.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg/220px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Sam_Worthington_%2852563252594%29_%28cropped%29.jpg',
    2
);
   

insert into tbl_genero(
	nome
)values(
	'Terror'
),(
	'Suspense'
),(
	'Comédia'
),(
	'Romance'
),(
	'Ação'
),(
	'Ficcção Científica'
),(
	'Documentário'
),(
	'Musical'
),(
	'Aventura'
),(
	'Guerra'
),(
	'Thriller'
),(
	'Animação'
),(
	'Mistério'
),(
	'Drama'
),(
	'Filme Policial'
);

insert into tbl_ator_nacionalidade(
	tbl_nacionalidade,
    tbl_ator_id
)values(
	2,
    1
);

insert into tbl_diretor_nacionalidade(
	tbl_nacionalidade_id,
    tbl_diretor_id
)values(
	4,
    1
);

insert into tbl_filme_diretor(
	id_filme,
    id_diretor
)values(
	1,
    1
);

insert into tbl_filme_ator(
	tbl_filme_id,
    tbl_ator_id
)values(
	1,
    1
);

insert into tbl_filme_genero(
	id_filme,
    id_genero
)values(
	1,
    5
);

 select * from tbl_filme;
 
 desc tbl_ator;
 
 show tables;