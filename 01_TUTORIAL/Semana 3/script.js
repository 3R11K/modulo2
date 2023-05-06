const { stringify } = require("querystring");

function listaFormacoes(){
    var url = "http://127.0.0.1:3031/listaFormacoes";
    var resposta;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status == 200){
            resposta = JSON.parse(this.responseText);
            document.getElementById('formacaoLista').append(JSON.stringify(resposta))
        }
    }
    xhttp.send();
};

function ADDformacao(){
    var formacao = document.getElementById("formacao").value;
    var instituicao = document.getElementById("instituicao").value;

    var mesInicio = document.getElementById("mesInicio").value;
    var anoInicio = document.getElementById("anoInicio").value;
    var dataInicio = mesInicio + "/" + anoInicio

    var mesFinal = document.getElementById("mesFinal").value;
    var anoFinal = document.getElementById("anoFinal").value;
    var dataFinal = mesFinal + "/" + anoFinal

    const Data = {
        formacao: formacao,
        dataInicio: dataInicio,
        dataFinal: dataFinal,
        instituicao: instituicao
    };

    const json = JSON.stringify(Data);

    const xhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:3031/insereFormacoes"

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            const resposta = JSON.parse(xhttp.responseText);
            console.log(resposta)
        }
    };
    xhttp.send(json);

};

function where(){
    var id = document.getElementById("ID_FORMACAO").value;


    const xhttp = new XMLHttpRequest();
    var url = 'http://127.0.0.1:3031/update/' + id

    xhttp.open("GET",url,true);
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            const resposta = JSON.stringify(xhttp.responseText);
            console.log(resposta);
            document.getElementById("selectedLine").append(resposta)
        }
    }
    xhttp.send();

};

function update(){
    var id = document.getElementById("ID_FORMACAO").value;
    var formacao = document.getElementById("formacao").value;

    var mesInicio = document.getElementById("mesInicio").value;
    var anoInicio = document.getElementById("anoInicio").value;
    var dataInicio = mesInicio+"/"+anoInicio;

    var mesFinal = document.getElementById("mesFinal").value;
    var anoFinal = document.getElementById("anoFinal").value;
    var dataFinal = mesFinal+"/"+anoFinal;

    var instituicao = document.getElementById("instituicao").value;

    var data = {
        formacao: formacao,
        dataInicio: dataInicio,
        dataFinal: dataFinal,
        instituicao: instituicao
    };

    var json = JSON.stringify(data)

    const xhttp = new XMLHttpRequest();
    var url = 'http://127.0.0.1:3031/updating/' + id

    xhttp.open("PUT",url,true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log("Update success")
        };
    };
    xhttp.send(json);
};

function deleting(){
    var id = document.getElementById("ID_FORMACAO").value

    const xhttp = new XMLHttpRequest();
    var url = 'http://127.0.0.1:3031/delete/' + id

    xhttp.open("POST",url,true);
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log("Deleted ID ",id, "information")
        }
    }
    xhttp.send()
};
    
