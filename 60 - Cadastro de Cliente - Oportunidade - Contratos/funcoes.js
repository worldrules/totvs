 	function showCamera() {
	var nomeDoc = document.getElementById("nomeAnexo1").value
	JSInterface.showCamera(nomeDoc);
	}

	function showCamera2() {
	var nomeDoc = document.getElementById("nomeAnexo2").value
	JSInterface.showCamera(nomeDoc);
	}

	
	$(document).ready(function(){
		var valorCli = document.getElementById("nomeCliente").value;
		var valorCon2 = document.getElementById("nomeContato2").value;		
		
		//- ATUALIZA CAMPO numProlux2 -->
		var numProlux2 = document.getElementById("numProlux2").value;
		var numProlux = document.getElementById("numProlux").value;
		console.log("numProlux2: "+numProlux2);
		
		
		if(numProlux == 1){
			$(".collapse").collapse('show');
		}else{
			$(".collapse").collapse('hide');
		}
		
		if(valorCli != ""){
		
			////////////////////////// SETA O DATASET A SER CONSULTADO (EX: dsTesteCliente) E PASSA OS VALORES PARA UM VETOR (ARRAY) /////////////////////////			
			var cliente_cli = []; 
			var cliente_tec = [];
			var cliente_fin = [];
			var cliente_com = [];
			
			var datasetReturned2 = DatasetFactory.getDataset("dsTesteCliente", null, null, null);   
			var records2 = datasetReturned2.values;
			//console.log("records2: "+records2);
			for ( var index in records2) {
				
				var record2 = records2[index];				
				// PEGA OS VALORES DOS CAMPOS nomeCadCli2 -->
				var valor2 = record2.nomeCadCli2;
				var valor_cli = record2.contatoCadCli;
				var contato_tec = record2.contatoCadCliTec;
				var contato_fin = record2.contatoCadCliFin;
				var contato_com = record2.contatoCadCliCom;		
				
				if(valorCli == valor2){	
					cliente_cli.push(valor_cli);
					cliente_tec.push(contato_tec);
					cliente_fin.push(contato_fin);
					cliente_com.push(contato_com);
				}				
			}		
			
			//ADICIONA OS OPTIONS DO CAMPO nomeContato, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_cli, function(id, valor) {				
				$('#nomeContato').append($("<option></option>").attr("value", valor).text(valor));
			
			});			
			//ADICIONA OS OPTIONS DO CAMPO contatoTecnico, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_tec, function(id, valor) {
			  $('#contatoTecnico').append($("<option></option>").attr("value", valor).text(valor));
			});	
			
			//ADICIONA OS OPTIONS DO CAMPO contatoFinanceiro, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_fin, function(id, valor) {				
			  $('#contatoFinanceiro').append($("<option></option>").attr("value", valor).text(valor));
			});
			
			//ADICIONA OS OPTIONS DO CAMPO contatoComercial, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_com, function(id, valor) {
			  $('#contatoComercial').append($("<option></option>").attr("value", valor).text(valor));
			});		
		}
		
		//Alteração dia 14/12/18 para comportar alerta do prazo da atividade
		//Pega numero da atividade para exibir toast
		var Atividade =  $('#NumAtividade').val();
		var Prazo =  $('#prazoPass').val();
		
		if(Atividade==38 || Atividade==104 || Atividade==83 || Atividade==110 || Atividade==64 || Atividade==40 || Atividade==112){
			
		FLUIGC.toast({
			title:'Atenção:',
			message:' Essa atividade tem prazo para a seguinte data: '+Prazo+'.',
			type:'warning'
		});	
		}
    });


// TABELA PAI FILHO - ATIVIDADES DO CONTRATO -->

	function addPaiFilho(){ 
	  wdkAddChild('listaAtividade'); 
	  $("[name*='vlr_orcamento___']").each(function() { 
	    $(this).keyup(function(event) { 
	      mostrarDiv();
	    }); 
	
	  }); 
	} 
	function fnCustomDelete(oElement){ 
		// Chamada a funcao padrao, NAO RETIRAR    
		fnWdkRemoveChild(oElement);
		calculaValorTotalHoras();
		totalizaValor(); 
	}


// TABELA PAI FILHO - MATERIAL -->

	function addPaiFilho2(){ 
	  wdkAddChild('listaMaterial'); 
	  
	$( "input[name*='vlrqtd___'], input[name*='qtdMat___']" ).keyup(function(){
			var indice = this.name.split("___")[1];		
			setTimeout(function(){ replaceCalculaValorTotal(indice)}, 1);
		});
	} 
	function fnCustomDelete2(oElement){ 
		// Chamada a funcao padrao, NAO RETIRAR 
		var indice = oElement.id.split("___")[1];
		fnWdkRemoveChild(oElement);
		calculaValorTotalProjeto();
	}
	
	//função que pega o valor digitado e transforma em float e verifica se o valor está nulo 
	function replaceCalculaValorTotal(indice){	
		
		//calculo Total, recebendo valor total S/Impostos  = Tempo Estimado * valor hora S/Impostos
		var tempoEstimado = $("#qtdMat___" + indice).val();
		var valorHora = $("#vlrqtd___" + indice).val();
		//var Descricao = $("#descri___"+indice+"").val();
		
		//formatar string para formato float.
		tempoEstimado = tempoEstimado.replace(/,/g, "");
		valorHora = valorHora.replace(/,/g, "");	
		
		var valorTotal = parseFloat(valorHora) * parseFloat(tempoEstimado);
		valorTotal = Math.round(valorTotal * 100) / 100;
		valorTotal = isNaN(valorTotal) ? "" : valorTotal;
		
		$("#vlrtotal___"+ indice).val(parseFloat(valorTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
		
		calculaValorTotalProjeto();
		
	}
	
	//calcula o valor das pai x filho e coloca nos campos de valor total
	function calculaValorTotalProjeto(){    

	    var valorTotalProjeto = 0;
		$( "input[name*='vlrtotal___']" ).each(function(){
			if(this.value != ""){
				var valor = this.value;
				valor = valor.replace(/,/g, "");
				valorTotalProjeto += parseFloat(valor);
				valorTotalProjeto = Math.round(valorTotalProjeto * 100) / 100;
				valorTotalProjeto.toFixed(2);
	            //console.log(parseFloat(valorTotalProjeto));
			}
		});
		$("#Total").val("R$ "+valorTotalProjeto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));			
		 
	}
	
	//calcula o valor das pai x filho e coloca nos campos de valor total
	function calculaValorTotalHoras(){ 
		
		var valorTotalHoras = 0;
		$( "input[name*='horaHomem___']" ).each(function(){
			if(this.value != ""){				
				valorTotalHoras += parseFloat(this.value);
				valorTotalHoras = Math.round(valorTotalHoras * 100) / 100;
				valorTotalHoras.toFixed(2);		         				
			}
		});
		$("#Horas").val(valorTotalHoras.toFixed(2));
	
	}
	
function FiltraItens(){	
	
		$("#DIVITEM").show();
		var Tipo = $("#regTipo").val();
		console.log("Tipo "+Tipo);
		
		var ds = DatasetFactory.getDataset("ItensTipos", null, null, null);
		console.log(ds);
		
		$("#desItem").find('option').remove();	
		
		for(var i=0;i<ds.values.length;i++){
			
			if(Tipo == ds.values[i].tipo){
			
			$("#desItem").append("<option value='"+ds.values[i].Item + "'>"+ds.values[i].Item + "</option>");
			
			}

		}		
}


// GUARDA O VALOR DO "ID" DO INPUT ZOOM EM UM INPUT HIDDEN

function setSelectedZoomItem(selectedItem) {	
	if (selectedItem.inputName == "regAdmin") {
		document.getElementById("idRegAdmin").value = selectedItem['colleagueId'];
		console.log("Valor Mat regAdmin: " + document.getElementById("idRegAdmin").value);
		}
		if (selectedItem.inputName == "regTecContrato") {
		document.getElementById("idRegTecContrato").value = selectedItem['colleagueId'];
		console.log("Valor Mat regTecContrato: " + document.getElementById("idRegTecContrato").value);
		}
	if (selectedItem.inputName == "regVendedor") {
	document.getElementById("idRegVendedor").value = selectedItem['matricula'];
	$("#idRegVendOrc").val("V");
	}
	if (selectedItem.inputName == "regOrcamentista") {
		document.getElementById("idregOrcamentista").value = selectedItem['matricula'];
		$("#idRegVendOrc").val("O");
		}
	if (selectedItem.inputName == "nomeCliente") {
	var valor = document.getElementById("nomeCliente").value;	
	
	////////////////////////// SETA O DATASET A SER CONSULTADO (EX: dsTesteCliente) E PASSA OS VALORES PARA UM VETOR (ARRAY) /////////////////////////			
			var cliente_cli = []; 
			var cliente_tec = [];
			var cliente_fin = [];
			var cliente_com = [];
			
			var datasetReturned2 = DatasetFactory.getDataset("dsTesteCliente", null, null, null);   
			var records2 = datasetReturned2.values;
			//console.log("records2: "+records2);
			for ( var index in records2) {
				
				var record2 = records2[index];				
				// PEGA OS VALORES DOS CAMPOS nomeCadCli2 -->
				var valor2 = record2.nomeCadCli2;
				var valor_cli = record2.contatoCadCli;
				if(record2.contatoCadCliTec != "")
				{
				var contato_tec = record2.contatoCadCliTec;
				}
				if(record2.contatoCadCliFin != "")
				{
				var contato_fin = record2.contatoCadCliFin;
				}
				if(record2.contatoCadCliCom != "")
				{
				var contato_com = record2.contatoCadCliCom;	
				}
				var contatoCadTel = record2.contatoCadTel;
				var contatoCadEmail = record2.contatoCadEmail;
				
				if(valor == valor2){					
					//var nomeCadCliFinal = valor_cli;
					cliente_cli.push(valor_cli);
					cliente_tec.push(contato_tec);
					cliente_fin.push(contato_fin);
					cliente_com.push(contato_com);
					document.getElementById("contatoCadTel").value = contatoCadTel;
					document.getElementById("contatoCadEmail").value = contatoCadEmail;					
				}
				
			}		
			
			//ADICIONA OS OPTIONS DO CAMPO nomeContato, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_cli, function(id, valor) {
			  $('#nomeContato').append($("<option></option>").attr("value", valor).text(valor));
			});
			
			//ADICIONA OS OPTIONS DO CAMPO contatoTecnico, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_tec, function(id, valor) {
			  $('#contatoTecnico').append($("<option></option>").attr("value", valor).text(valor));
			});	
			
			//ADICIONA OS OPTIONS DO CAMPO contatoFinanceiro, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_fin, function(id, valor) {
			  $('#contatoFinanceiro').append($("<option></option>").attr("value", valor).text(valor));
			});
			
			//ADICIONA OS OPTIONS DO CAMPO contatoComercial, APROVEITANDO O ARRAY CRIADO COM O DATASET
			$.each(cliente_com, function(id, valor) {
			  $('#contatoComercial').append($("<option></option>").attr("value", valor).text(valor));
			});

	}	
}

function removedZoomItem(removedItem) {

    if(removedItem.inputName == "regOrcamentista"){
		console.log("Entrou Remove Orça");
		$("#idregOrcamentista").val("");
		
		//alert ("Código passou por aqui!"); 
	}
if(removedItem.inputName == "regVendedor"){
	console.log("Entrou Remove Vend");
	$("#idRegVendedor").val("");
		//alert ("Código passou por aqui!"); 
	}
    
}

// HABILITA O CAMPO numProlux2(Número proposta) DE ACORDO COM O ESCOLHA DO CAMPO numProlux -->

function numeroProlux(){
	var numProlux = document.getElementById("numProlux").value;
		if(numProlux == 1){
			$(".collapse").collapse('show');
			$(".numProlux2").mask("(99) 9999-9999");
			$(".collapse2").collapse('hide');
			
		}else if(numProlux == 2){
			$(".collapse").collapse('hide');
			$(".collapse2").collapse('show');
		}
		else{			
			$(".collapse").collapse('show');
			$(".collapse2").collapse('hide');
		}		
}

//valida se precisa exibir o cc 

function MostraCC(){
	
	var sim = document.getElementById("CCSAPS").checked;
	
		if(sim){
			$("#DivCCSap").show();			
		}
		else{			
			$("#DivCCSap").hide();
		}		
}

// REMOVE OS VALORES DOS CAMPOS PREENCHIDOS AUTOMATICAMENTE PELO ZOOM (nomeContato)  -->

function removedZoomItem(removedItem) {
	if (removedItem.inputName == "nomeCliente") {		
		
		/* Remove as opções do select, deixando somente a primeira opção */	
		//$('#contatoComercial').children('option:not(:first)').remove();		
		
		/* Remove todas as opções do select */
		$('#nomeContato').children('option').remove();
		$('#contatoTecnico').children('option').remove();
		$('#contatoFinanceiro').children('option').remove();
		$('#contatoComercial').children('option').remove();
		//remove os valores inseridos nos inputs
		document.getElementById("contatoCadTel").value = "";
		document.getElementById("contatoCadEmail").value = "";
		document.getElementById("contatoCadTel").value = "";
		document.getElementById("contatoCadEmail").value = "";
	}
}


// PREENCHE OS CAMPOS AUTOMATICAMENTE, DE ACORDO COM A ESCOLHA DO ZOOM (nomeContato) -->

function preencherCampos(){
	var nomeContatoValor = document.getElementById("nomeContato").value;
	if(nomeContatoValor!=""){
	
		////////////////// SETA O DATASET A SER CONSULTADO (EX: dsTesteCliente) E PASSA OS VALORES PARA UM VETOR (ARRAY) /////////////////////////		
			//console.log("nomeContatoValor: "+nomeContatoValor);
			var c1 = DatasetFactory.createConstraint("contatoCadCli",nomeContatoValor,nomeContatoValor,ConstraintType.MUST);
			var datasetReturned2 = DatasetFactory.getDataset("dsTesteCliente", null, new Array(c1), null);   
			
			var records2 = datasetReturned2.values;
			for ( var index in records2) {
				var record2 = records2[index];
				// PEGA OS VALORES DOS CAMPOS nomeCadCli2 -->
				var valor2 = record2.nomeCadCli2;
				var valor_cli = record2.contatoCadCli;				
				
				var pegar = valor_cli;				
				console.log("c1: "+valor_cli+" -  nomeContatoValor: "+nomeContatoValor);					
				
				//var contatoCadEmp = record2.contatoCadEmp;
				var contatoCadTel = record2.contatoCadTel;
				var contatoCadEmail = record2.contatoCadEmail;
				if(record2.contatoCadCliTec != "")
				{
				var contato_tec = record2.contatoCadCliTec;
				}
				if(record2.contatoCadCliFin != "")
				{
				var contato_fin = record2.contatoCadCliFin;
				}
				if(record2.contatoCadCliCom != "")
				{
				var contato_com = record2.contatoCadCliCom;	
				}
				
				console.log("contatoCadCliTec: "+contatoCadCliTec);
				console.log("contatoCadCliFin: "+contatoCadCliFin);
				console.log("contatoCadCliCom: "+contatoCadCliCom);
				
				if(nomeContatoValor == pegar){
					console.log("PEGAR NO IF: "+pegar);	
					//document.getElementById("contatoCadEmp").value = contatoCadEmp;
					document.getElementById("contatoCadTel").value = contatoCadTel;
					document.getElementById("contatoCadEmail").value = contatoCadEmail;
					document.getElementById("contatoTecnico").value = contatoCadCliTec;
					document.getElementById("contatoFinanceiro").value = contatoCadCliFin;
					document.getElementById("contatoComercial").value = contatoCadCliCom;					
				}				
			}		
	}else{
		document.getElementById("contatoTecnico").value = "";
		document.getElementById("contatoFinanceiro").value = value = "";
		document.getElementById("contatoComercial").value = value = "";
	}		
	
}
// leonardo 03 12 2018

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}












function setSelectedZoomItem(selectedItem) {
    var ITEM  = "item___";
    var CDGDTS = "codigoDatasul___";

    var FIELD = selectedItem.inputId;

    if (FIELD.indexOf(ITEM) > -1) {
        var seq = FIELD.split("___");
        setZoomData("item___" + seq[1], selectedItem["NOME"]);
        setZoomData("codigoDatasul___" + seq[1], selectedItem["CODIGO"]);

    } else if (FIELD.indexOf(CDGDTS) > -1) {
        var seq = FIELD.split("___");
        setZoomData("item___" + seq[1], selectedItem["NOME"]);
        setZoomData("codigoDatasul___" + seq[1], selectedItem["CODIGO"]+selectedItem["NOME"]);

    }
}
function setZoomData(instance, value){
        window[instance].setValue(value);
}

$(document).ready(function() {  

	FLUIGC.calendar('#dataEntrega');


});