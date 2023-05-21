function listaFormacoes(){//http request para as formações
    var url = "http://127.0.0.1:3031/listaFormacoes";
    var resposta;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",url,true);
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status == 200){
            resposta = JSON.parse(this.responseText);
            for(var i = 0; i < resposta.length;i++){
                var Formacao = document.createElement('div');
                Formacao.id = "descriptionCard";
                Formacao.innerHTML = resposta[i].FORMACAO;
                document.getElementById("Curso").appendChild(Formacao);

                var instituicao = document.createElement('div');
                instituicao.id = "descriptionCard";
                instituicao.innerHTML = resposta[i].Instituicao;
                document.getElementById("Instituicao").appendChild(instituicao);

                var dataInicio = document.createElement('div');
                dataInicio.id = "descriptionCard";
                dataInicio.innerHTML = resposta[i].DataInicioFormacao;
                document.getElementById("DataInicioFormacao").appendChild(dataInicio);

                var dataFinal = document.createElement('div');
                dataFinal.id = "descriptionCard";
                dataFinal.innerHTML = resposta[i].DataFinalFormacao;
                document.getElementById("DataFinalFormacao").appendChild(dataFinal);
            }
        }
    }
    xhttp.send();
};

function ADDformacao(){//http request para adcionar formações pegando valores de inputs no html
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
            var resposta = JSON.parse(xhttp.responseText)
            for(var i = 0; i < resposta.length;i++){
                var Formacao = document.createElement('div');
                Formacao.id = "descriptionCard";
                Formacao.innerHTML = resposta[i].FORMACAO;
                document.getElementById("Curso").appendChild(Formacao);

                var instituicao = document.createElement('div');
                instituicao.id = "descriptionCard";
                instituicao.innerHTML = resposta[i].Instituicao;
                document.getElementById("Instituicao").appendChild(instituicao);

                var dataInicio = document.createElement('div');
                dataInicio.id = "descriptionCard";
                dataInicio.innerHTML = resposta[i].DataInicioFormacao;
                document.getElementById("DataInicioFormacao").appendChild(dataInicio);

                var dataFinal = document.createElement('div');
                dataFinal.id = "descriptionCard";
                dataFinal.innerHTML = resposta[i].DataFinalFormacao;
                document.getElementById("DataFinalFormacao").appendChild(dataFinal);
            }
            
        }
    };
    xhttp.send(json);

};

function where(){//funcão para selecionar apenas uma linha das formações
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

function update(){//função para update de formação
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

function deleting(){//deletar formação
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
    
async function curriculo(){//função chamada assim que a pagina inicial inicia e carrega todas as informações(usei fetch para aprender, pois tinha primeiramente aprendido no método acima)
    fetch('/curriculo',{
        method: 'GET',
        headers: {
			'Content-Type': 'application/json'
		  },
    }).then(response=>{
        return response.json()
    }).then(json => {
        var curriculo = document.getElementById("curriculo");
        var Dados = json;
    
        for (var i = 0; i < Dados.length; i++) {
            if (Dados[i].DADOSPESSOAIS) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].DADOSPESSOAIS;
                document.getElementById("DadosPessoais").appendChild(info);
            }
    
            if (Dados[i].FORMACAO) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].FORMACAO;
                document.getElementById("Curso").appendChild(info);
            }
    
            if (Dados[i].HABILIDADE) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].HABILIDADE;
                document.getElementById("Habilidades").appendChild(info);
            }
    
            if (Dados[i].PERSONALIDADE) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].PERSONALIDADE;
                document.getElementById("Personalidade").appendChild(info);
            }
    
            if (Dados[i].Instituicao) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].Instituicao;
                document.getElementById("Instituicao").appendChild(info);
            }
    
            if (Dados[i].DataInicioFormacao) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].DataInicioFormacao;
                document.getElementById("DataInicioFormacao").appendChild(info);
            }
    
            if (Dados[i].DataFinalFormacao) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].DataFinalFormacao;
                document.getElementById("DataFinalFormacao").appendChild(info);
            }
    
            if (Dados[i].PROJETOS) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].PROJETOS;
                document.getElementById("PROJETOS").appendChild(info);
            }
    
            if (Dados[i].DataInicioProjetos) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].DataInicioProjetos;
                document.getElementById("DataInicioProjetos").appendChild(info);
            }
    
            if (Dados[i].DataFimProjetos) {
                var info = document.createElement('div');
                info.id = "descriptionCard";
                info.innerHTML = Dados[i].DataFimProjetos;
                document.getElementById("DataFinalProjetos").appendChild(info);
            }
        }
    })}