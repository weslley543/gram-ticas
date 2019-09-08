var tabelaGramatica = [];

var tabela = $('#tabela')
var selecionado;
//regex
$('#teste').on('click', function(){
    var regex = new RegExp($('#exp').val());
    var ok = regex.exec($('#texto').val());
    if(ok){
        $('#texto').css('background', 'green');
        
    }else{
        $('#texto').css('background', 'tomato');
    }
});
$('#naoTerminal').val()
//funcao para adicionar os filhos e add no vetor de manipulação
$('#add').on('click', function(){
    var expNaoTerminal = $('#naoTerminal').val();
    var expTerminal = $('#terminal').val();
    $('#corpoTabela').append('<tr><td>'+expNaoTerminal+'</td><td>'+expTerminal+'</td></tr>');

    for(var i=0; i<tabelaGramatica.length; i++){
        if(tabelaGramatica[i].naoTerminal == expNaoTerminal){
            for (var j = 0; j < tabelaGramatica[i].expressao.length; j++) {
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
    
    var exp = $('#expTeste').val();
    var aux = resolver(tabelaGramatica[0].naoTerminal,tabelaGramatica[0].naoTerminal,exp)
    if(aux==true){
        $('#expTeste').css('background', 'green');
    }else{
        $('#expTeste').css('background', 'tomato');
    }
});

function resolver(exp, naoTerminal, entrada){ 
    //console.log(exp,naoTerminal, entrada);
    var tam = tabelaGramatica.length;
    if(exp == entrada && naoTerminal == "0") return true;
    if(exp.length > entrada.length){
        return false;
    }
    for (var i = 0; i < tam; i++) {
        if(tabelaGramatica[i].naoTerminal == naoTerminal){
            for(var j = 0; j<tabelaGramatica[i].expressao.length; j++){

                var der = tabelaGramatica[i].expressao[j];
                var naoTerminalDer = verificarDerivacao(der);
                var novoexp = exp.replace(naoTerminal, der);

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
    var tam = der.length-1;
    if(der.charCodeAt(tam)>=65 && der.charCodeAt(tam)<=90){
        return [der.charAt(tam),"GLD"];
    }
    return ["0","0"];
}

$('#naoTerminal').on('change', function(){
    $(this).val($(this).val().toUpperCase())
})

$('#tabela tbody').on('click', function() {
    console.log($(this).children())
})

$('#remove').on('click', function(){
    console.log('oi')
})