var tabelaGramatica = [];

var tabela = $('#tabela')
var selecionado;
//regex
$('#teste').on('click', function(){
    let regex = new RegExp($('#exp').val());
    let ok = regex.exec($('#texto').val());
    if(ok){
        $('#texto').css('background', 'green');
        
    }else{
        $('#texto').css('background', 'tomato');
    }
});
$('#naoTerminal').focusout(function(){
    let aux = $(this).val().toUpperCase();
    $(this).val(aux);
});
//funcao para adicionar os filhos e add no vetor de manipulação
$('#add').on('click', function(){
    var expNaoTerminal = $('#naoTerminal').val();
    var expTerminal = $('#terminal').val();
    if($('#terminal').val() ==""){
        expTerminal = '$';
    }
    $('#corpoTabela').append('<tr><td>'+expNaoTerminal+'</td><td>'+expTerminal+'</td></tr>');

    for(let i=0; i<tabelaGramatica.length; i++){
        if(tabelaGramatica[i].naoTerminal == expNaoTerminal){
            for (let j = 0; j < tabelaGramatica[i].expressao.length; j++) {
                if(tabelaGramatica[i].expressao[j] == expTerminal){
                    return true;
                }
            }
            tabelaGramatica[i].expressao.push(expTerminal);
            return false;
        }
    }

    tabelaGramatica.push({
        naoTerminal: expNaoTerminal,
        expressao: [expTerminal],
    });
    return false;
});

$('#testeGrammar').on('click', function(){
    
    let exp = $('#expTeste').val();
    let aux = resolver(tabelaGramatica[0].naoTerminal,tabelaGramatica[0].naoTerminal,exp)
    if(aux==true){
        
        $('#expTeste').css('background', 'green');
    }else{
        $('#expTeste').css('background', 'tomato');
    }
});

function resolver(exp, naoTerminal, entrada){ 
    //console.log(exp,naoTerminal, entrada);
    let tam = tabelaGramatica.length;
    if(exp == entrada && naoTerminal == "0") return true;
    if(exp.length > entrada.length){
        return false;
    }
    for (let i = 0; i < tam; i++) {
        if(tabelaGramatica[i].naoTerminal == naoTerminal){
            for(let j = 0; j<tabelaGramatica[i].expressao.length; j++){

                let der = tabelaGramatica[i].expressao[j];
                let naoTerminalDer = verificarDerivacao(der);
                let novoexp = exp.replace(naoTerminal, der);

                if(naoTerminalDer[0]=="0"){
                    if(resolver(novoexp, naoTerminalDer[0], entrada)){
                        return true;
                    }
                }else{ 
                    if(resolver(novoexp, naoTerminalDer[0], entrada)){
                        return true;    
                    }
                }
            }
        }
    }
    return false;
}

function verificarDerivacao(der){
    let tam = der.length-1;
    if(der.charCodeAt(tam)>=65 && der.charCodeAt(tam)<=90){
        return [der.charAt(tam),"GLD"];
    }
    return ["0","0"];
}