function addTask() { 
	row = wdkAddChild('listaAtividade');			
}

function fnCustomDelete(oElement){ 
	// Chamada a funcao padrao, NAO RETIRAR    
	fnWdkRemoveChild(oElement);
	totalizaValor(); 
}

function altera(){
    var list = document.getElementsByClassName('nomeCadCli');
    var n;
    var nomeCadCliValor = document.getElementById("nomeCadCli2").value; 
        for (n = 0; n < list.length; ++n) {
            list[n].value=nomeCadCliValor;	
        }
    }

    $(document).ready(function() {
        var clientes = []; 
        var datasetReturned = DatasetFactory.getDataset("dsNovoCliente", null, null, null);   
        var records = datasetReturned.values;
        for ( var index in records) {
            var record = records[index];    
			var valor = record.nomeCadCli2;

			    if(clientes.indexOf(valor) > -1) {
					clientes.splice($.inArray(valor, clientes),1);
				}  else {

				}
				clientes.push(valor);           
        }
    window.clientes = clientes
	
    var myAutocomplete = FLUIGC.autocomplete('#nomeCadCli2', {
		source: substringMatcher(clientes),
			name: 'cities',
			displayKey: 'description',
			tagClass: 'tag-gray',
            type: 'autocomplete'
            
    });
});
$('#nomeCadCli2').focusout(function(){
    var cliente = $('#nomeCadCli2').val();
    if($.inArray(cliente,window.clientes) != -1){
        $("#addOrcamento").hide();
        $("#nomeCadCli2").empty();

        FLUIGC.toast({
                title: 'Atenção:',
                message: 'O cliente já foi inserido anteriormente !',
                type: 'danger'			
    });
        setInterval(function(){ 
        location.reload();
        }, 3000);

    } else {
        $("#addOrcamento").show();
    }
});

function substringMatcher(strs) {
return function findMatches(q, cb) {
    var matches, substrRegex; 
    matches = []; 
    substrRegex = new RegExp(q, 'i'); 
    $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
            matches.push({
                description: str
             });
        }
    });
    cb(matches);
};
}