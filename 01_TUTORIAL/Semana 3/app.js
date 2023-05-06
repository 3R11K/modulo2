const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require("sqlite3");
const { error } = require('console');
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


app.post('/insereFormacoes', function(req,res){
    const formacao = req.body.formacao;
    const dataInicio = req.body.dataInicio;
    const dataFinal = req.body.dataFinal;
    const instituicao = req.body.instituicao;
    db.run("INSERT INTO Formacao(FORMACAO, DataInicio, DataFinal, Instituicao) VALUES(?,?,?,?)", [formacao, dataInicio, dataFinal, instituicao], function(err){
        if(err){
            console.log("Error at the insert")
        }
        console.log("New data accepted")
    })
});

app.get('/listaFormacoes', function(req,res){
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    db.all("SELECT * FROM Formacao",[], (err,rows)=>{
        if(err){
            console.error(error.message)
        }
        res.json(rows)
    })
});


//Update end-points

app.get('/update_page', function(req,res){
    res.sendFile(__dirname+"/update.html")
});


app.get('/update/:id', function(req,res){
    const id = req.params.id;
    res.statusCode = 200;

    db.all('SELECT * FROM Formacao WHERE ID = ?',[id], function(err,rows){
        if(err){
            console.error(error.message);
            res.status(500).send("Erro interno(dado não encontrado)")
        };
        res.json(rows);
        console.log(rows)
    });
 
});


app.put('/updating/:id', function(req,res){

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
        console.error(err.message)
        }
        console.log("Data updated")
    });
});

//Delete end Points

app.get('/delete_page', function(req,res){
    res.sendFile(__dirname+"/delete.html")
});


app.post('/delete/:id', function(req,res){
    const id = req.params.id;

    db.run("DELETE FROM Formacao WHERE ID = ?",[id], function(err){
        if(err){
            console.error(err.message);
        };
        console.log("ID:",id," Deleted");
    })
});

app.listen(3031,()=>{
    console.log("Iniciado em http://127.0.0.1:3031/")
})
