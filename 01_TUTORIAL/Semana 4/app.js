const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require("sqlite3");
const { error, Console } = require('console');
const db = new sqlite3.Database('CURRICULO.db', (err) =>{
    if(err){
        console.error(err)
    }
    console.log("conectado à CURRICULO")
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static("./"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"index.html")
});

//end points para formações

app.get('/Formacoes', (req,res)=>{
    res.sendFile(__dirname+"/MostrarFormacao.html")
})

app.get('/AddPage', (req,res) =>{
    res.sendFile(__dirname+"/ADDFormacao.html")
})

app.post('/insereFormacoes', function(req,res){
    const formacao = req.body.formacao;
    const dataInicio = req.body.dataInicio;
    const dataFinal = req.body.dataFinal;
    const instituicao = req.body.instituicao;
    db.run("INSERT INTO Formacao(FORMACAO, DataInicioFormacao, DataFinalFormacao, Instituicao) VALUES(?,?,?,?)", [formacao, dataInicio, dataFinal, instituicao], function(err){
        if(err){
            throw err
        }
        else{
            var sql = `SELECT * FROM Formacao WHERE FORMACAO = '${formacao}' AND DataInicioFormacao = '${dataInicio}' AND DataFinalFormacao = '${dataFinal}' AND Instituicao = '${instituicao}'`
            db.all(sql, (err,rows)=>{
                if(err){
                    throw err
                }
                else{//era para retornar a linha que foi inserida, ja sendo uma maneira de checar se a linha foi inserida, mas não funcionou
                    console.log(rows)
                    res.json(rows)
                }
            })
        }
    })
});

app.get('/listaFormacoes', function(req,res){
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    db.all("SELECT * FROM Formacao",[], (err,rows)=>{
        if(err){
            throw err
        }
        res.json(rows)
    })
});


//Update end-points

app.get('/update_page', function(req,res){//Página de update
    res.sendFile(__dirname+"/update.html")
});


app.get('/update/:id', function(req,res){//selecionando a linha a ser atualizada usando id como parametro
    const id = req.params.id;
    res.statusCode = 200;

    db.all('SELECT * FROM Formacao WHERE ID = ?',[id], function(err,rows){
        if(err){
            res.status(500).send("Erro interno(dado não encontrado)")
            throw err
        };
        res.json(rows);
    });
 
});


app.put('/updating/:id', function(req,res){  //atualizando tendo id como parametro e utilizando o corpo da requisição para atualizar os dados

    const id = req.params.id;
    req.statusCode = 200;

    const formacao = req.body.formacao;
    const dataInicio = req.body.dataInicio;
    const dataFinal = req.body.dataFinal;
    const instituicao = req.body.instituicao;

    var values = [];

    var sqliteCode = "UPDATE Formacao SET "

    if(formacao){
        sqliteCode += "FORMACAO= ?, "   
        values.push(formacao); 
    };

    if(dataInicio){
        if(dataInicio.length < 6 || dataInicio.length > 7 ){
            sqliteCode += "DataInicio = ?, ";
            values.push(dataInicio);
        };
    };

    if(dataFinal){
        if(dataFinal.length < 6 || dataFinal.length > 7 ){
            sqliteCode += "DataFinal = ?, ";
            values.push(dataFinal);
        }
    };

    if(instituicao){
            sqliteCode += "instituicao = ?, "
            values.push(instituicao)
    };


    values.push(id)
    sqliteCode = sqliteCode.slice(0,-2);
    sqliteCode += ' WHERE ID = ?'


    console.log(sqliteCode)
    console.log(values)

    db.run(sqliteCode,values,function(err){
        if(err){
            throw err
        }
        console.log("Data updated")
    });
});

//Delete end Points

app.get('/delete_page', function(req,res){//pagina para o delete
    res.sendFile(__dirname+"/delete.html")
});


app.post('/delete/:id', function(req,res){//deletando apartir do id
    const id = req.params.id;

    db.run("DELETE FROM Formacao WHERE ID = ?",[id], function(err){
        if(err){
            throw err
        };
        res.send("ID:",id," Deleted");
    })
});

//end point read tabelas + criação do curriculo na pag inicial

app.get("/curriculo", (req,res)=>{//mostrando todos os dados na pagina inicial
    db.all("SELECT * FROM CURRICULO LEFT JOIN DadosPessoais ON CURRICULO.DadosPessoais_ID = DadosPessoais.ID LEFT JOIN Formacao ON CURRICULO.Formacao_ID = Formacao.ID LEFT JOIN Habilidades ON Habilidades.ID = CURRICULO.Habilidades_ID LEFT JOIN Personalidade ON Personalidade.ID = CURRICULO.Personalidade_ID LEFT JOIN Projetos ON CURRICULO.Projetos_ID = Projetos.ID", function(err,rows){
        if(err){
            throw err
        }
        else if(rows){
            res.json(rows);
            console.log("eyyeeyyey")
        };
    })
})

app.listen(3031,()=>{
    console.log("Iniciado em http://127.0.0.1:3031/")
})
