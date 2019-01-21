function periodoFim() {
var dataInicio = $("#periodoInicio").val();
var diaInicio = dataInicio.split("/")[0];
var mesInicio = dataInicio.split("/")[1];
var anoInicio = dataInicio.split("/")[2];
console.log("Dia Inicio: " + diaInicio);
console.log("Mes Inicio: " + mesInicio);
var dataFim = $("#datperiodoFim").val();
var diaFim = dataFim.split("/")[0];
var mesFim = dataFim.split("/")[1];
var anoFim = dataFim.split("/")[2];
console.log("Dia Final: " + diaFim);
console.log("Mes Final: " + mesFim);
console.log("Ano: " + dataInicio.split("/")[2]);

	if (anoFim > anoInicio) {
		
	}else{
		if ((diaFim < diaInicio && mesFim == mesInicio) || (mesFim < mesInicio ) || ( anoFim < anoInicio ) ) {
			alert("Período fim é menor que a período inicio !");
		}
	}
}

$(document).ready(function(){
	var usuarioCode = parent.WCMAPI.userCode;
	console.log('solicitante possible code',usuarioCode);
	var c1 = DatasetFactory.createConstraint("emitenteId", usuarioCode, usuarioCode, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("status", 'aberto', 'aberto', ConstraintType.MUST);
	var dsAdiantamentos = DatasetFactory.getDataset("cadastroDespesasAdiantamentos", null, new Array(c1, c2), null);
	
	console.log(dsAdiantamentos.values);
	
	//Pega numero da atividade para exibir toast
	var Atividade =  $('#Atividade').val();
	
	if(Atividade==6){
		
	for(var index =0; index < dsAdiantamentos.values.length; index++){
			addAdiantamentos('adiantamentos', dsAdiantamentos.values[index]);
	}	
	
	$(document).on("click", ".fluigicon-trash", function() {
		calculaAdiantamentos();
	})
	
	calculaAdiantamentos();
	}
	if(Atividade == 4 || Atividade == 0){

		$('#responsavel').empty();
		var papelSelecionado = $('#envioPara').val();
		//Cria um Filtro na coluna workflowRolePK.roleId, seleciona o papelSelecionado
		var c1 = DatasetFactory.createConstraint("roleDescription",papelSelecionado, papelSelecionado, ConstraintType.MUST);
		//Busca o dataset workflowRole com o filtro c1
		var dsColleagueGroup = DatasetFactory.getDataset("workflowRole", null, new Array(c1), null);
		//Pega uma linha
        var rol = dsColleagueGroup.values[0]['workflowRolePK.roleId'];
		//Cria um filtro passando por paramtro a buscar a Rol
        var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", rol, rol, ConstraintType.MUST);
        var ds2 = DatasetFactory.getDataset("workflowColleagueRole", null, new Array(c2), null);
		//For
		for(var i = 0;i< ds2.values.length;i++){
			var ds2Result = ds2.values[i]['workflowColleagueRolePK.colleagueId'];
            var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", ds2Result, ds2Result, ConstraintType.MUST);
			var ds3 = DatasetFactory.getDataset("colleague", null, new Array(c3), null);
			//Cria as options dentro dos campos responsavel e responsavelFormArea
            var resp = $("#responsavel").append("<option value='"+ ds3.values[0].colleagueName +"'>"+ds3.values[0].colleagueName+"</option>")
			var respArea = $("#responsavelFormArea").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'>"+ds3.values[0].colleagueName+"</option>");
            if(i == 0){
                $("#matResp").val(ds3.values[0]['colleaguePK.colleagueId']);
            }
		}
		$('#envioPara').change(function(){
			//Deixa os campos vazio para receber as informações dos datasets
			$('#responsavel').empty();
			//pega selecao no campo Envio Para
			var papelSelecionado = $('#envioPara').val();
			//Cria um Filtro na coluna workflowRolePK.roleId, seleciona o papelSelecionado
			var c1 = DatasetFactory.createConstraint("roleDescription",papelSelecionado, papelSelecionado, ConstraintType.MUST);
			//Busca o dataset workflowRole com o filtro c1
			var dsColleagueGroup = DatasetFactory.getDataset("workflowRole", null, new Array(c1), null);
			//Pega uma linha
	        var rol = dsColleagueGroup.values[0]['workflowRolePK.roleId'];
			//Cria um filtro passando por paramtro a buscar a Rol
	        var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", rol, rol, ConstraintType.MUST);
	        var ds2 = DatasetFactory.getDataset("workflowColleagueRole", null, new Array(c2), null);
			//For
			for(var i = 0;i< ds2.values.length;i++){
				var ds2Result = ds2.values[i]['workflowColleagueRolePK.colleagueId'];
	            var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", ds2Result, ds2Result, ConstraintType.MUST);
				var ds3 = DatasetFactory.getDataset("colleague", null, new Array(c3), null);
				//Cria as options dentro dos campos responsavel e responsavelFormArea
	            var resp = $("#responsavel").append("<option value='"+ ds3.values[0].colleagueName +"'>"+ds3.values[0].colleagueName+"</option>")
				var respArea = $("#responsavelFormArea").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'>"+ds3.values[0].colleagueName+"</option>");
	            if(i == 0){
	                $("#matResp").val(ds3.values[0]['colleaguePK.colleagueId']);
	            }
			}
		})

		$("#responsavel").on("change",function(){
			var namms = $("#responsavel").val();
			var cc = DatasetFactory.createConstraint("colleagueName", namms, namms, ConstraintType.MUST);
			var dsp = DatasetFactory.getDataset("colleague", null, new Array(cc), null);
			$("#matResp").val(dsp.values[0]['colleaguePK.colleagueId']);
		});
	}
	
})

function calculaImpostos(el){
	var idAppend = el.id.replace('NFcomCNPJ','');
	var totalDinheiro = replaceAll($('#totalDinheiro'+idAppend).val(),/[.]/,'')
		totalDinheiro = parseFloat(totalDinheiro.replace(',','.'))
	
	var pisFator = 1.65/100; // setar o valor de pis
	var cofinsFator = 7.6/100; // setar o valor de cofins
	
	if(el.value == 'sim' ){
		console.log((totalDinheiro * pisFator).toFixed(2))
		$('#pis'+idAppend).val((totalDinheiro * pisFator).toFixed(2));
		$('#cofins'+idAppend).val((totalDinheiro * cofinsFator).toFixed(2));
	}else if(el.value == 'não'){
		$('#pis'+idAppend).val((totalDinheiro * 0).toFixed(2));
		$('#cofins'+idAppend).val((totalDinheiro * 0).toFixed(2));
	}
	
}


function calculaAdiantamentos(){
	
	var totalDinheiro = 0;
	var totalAdiantamentos = 0;
	var totalCartao = 0;
	//:not(:first)
	$('.valorAdiantamento:not(:first)').each(function(index, element){
		var ind = $(element).prop('id').slice(-1);
		if($("#checktext___"+ind).val() == "on"){
			var inputValue = $(element).val().replace('.','');
			inputValue = inputValue.replace(',','.');
			//console.log('inputValue',parseFloat(inputValue))
			var Valor = (!Number.isNaN(parseFloat(inputValue)))?parseFloat(inputValue):0;
			totalAdiantamentos = totalAdiantamentos + parseFloat(Valor);
		}
		
	});
	
	$('.somaDinheiro').each(function(index,element){
		var inputValue = replaceAll($(element).val(),/[.]/,'')
		inputValue = parseFloat(inputValue.replace(',','.'));
		var Valor = (!Number.isNaN(inputValue))?inputValue:0;
		totalDinheiro = totalDinheiro + parseFloat(Valor.toFixed(2));
	})
	
	$('.somaCartao').each(function(index,element){
		var inputValue = replaceAll($(element).val(),/[.]/,'')
		inputValue = parseFloat(inputValue.replace(',','.'));		
		var Valor = (!Number.isNaN(inputValue))?inputValue:0;
		totalCartao = totalCartao + parseFloat(Valor.toFixed(2));
	})
	
	
	var aDevolver = totalAdiantamentos - (totalDinheiro);
	
	
	$('#totalCartaoCreditoSum').val(totalCartao.toFixed(2));
	$('#totalDinheiroSum').val(totalDinheiro.toFixed(2));
	$('#totalAdiantamentosSum').val(totalAdiantamentos.toFixed(2));
	if(aDevolver < 0){
		$('#devolverFuncionario').val(Math.abs(aDevolver).toFixed(2))
		$('#devolverProlux').val(Math.abs(0).toFixed(2));
	}else{
		$('#devolverFuncionario').val(Math.abs(0).toFixed(2))
		$('#devolverProlux').val(Math.abs(aDevolver).toFixed(2));
	}
	
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function exportarSAP(el){
	console.log("Entoru SAP");
	var data = buildDatasetSap();
	if(data.length > 0)
		alasql('SELECT cofins AS `COFINS`, pis AS `PIS`, projeto AS `Projeto`, centroDeCusto as `Centro de Custo`, dataNf AS `Data N.F.`, dinheiro AS `Total Dinheiro`, cartao AS `Total Cartao`, numeroParcelas AS `Numero de Parcelas`, despesa AS `Titulo da Despesa` INTO CSV("despesasSap.csv", {headers: true}) FROM ?',[data]);
}

function exportarCC(el){
	console.log("Entoru CC");
	var data = buildDataset();
	if(data.length > 0)
		alasql('SELECT projeto AS `Projeto`,centroDeCusto as `Centro de Custo`, dataNf AS `Data N.F.`, dinheiro AS `Total Dinheiro`, cartao AS `Total Cartao`, numeroParcelas AS `Numero de Parcelas`, despesa AS `Titulo da Despesa` INTO XLSX("despesasCC.xlsx", {headers: true}) FROM ? ORDER BY projetos',[data]);
}

function exportarDespesa(el){
	console.log("Entoru Despesa");
	var data = buildDataset();
	if(data.length > 0)
		alasql('SELECT projeto AS Projeto, centroDeCusto as `Centro de Custo`, dataNf AS `Data N.F.`, dinheiro AS `Total Dinheiro`, cartao AS `Total Cartao`, numeroParcelas AS `Numero Parcelas`, despesa AS `Despesa` INTO XLSX("despesasgerais.xlsx", {headers: true}) FROM ?',[data]);
}

function buildDatasetSap(){
	var arrayNomeDespesa = $('.nomeDespesa');
	var arrayDataNf = $('.dataNf');
	var arraySomaDinheiro = $('.somaDinheiro');
	var arraySomaCartao = $('.somaCartao');
	var arrayNumeroParcelas = $('.numeroParcelas');
	var arrayProjeto = $('[id^=projeto]');
	var arrayCC = $('[id^=ccInterno]');
	var arrayPis = $('.pis');
	var arrayCofins = $('.cofins');
	
	var dataset = {
		projetos: [],
		centroDeCusto: [],
		regraDeDist: [],
		dataNf: [],
		dinheiro: [],
		cartao: [],
		numeroParcelas: [],
		despesa: [],
		pis: [],
		cofins: []
	}
	
	for(var i = 0; i < arrayNomeDespesa.length; i++){
		if($(arrayNomeDespesa[i]).val() != 0 && $(arrayNomeDespesa[i]).val() != '')
			dataset.despesa.push($(arrayNomeDespesa[i]).val())
		else
			dataset.despesa.push(false)
	}
	
	for(var i = 0; i < arrayDataNf.length; i++){
		if($(arrayDataNf[i]).val() != 0 && $(arrayDataNf[i]).val() != '')
			dataset.dataNf.push($(arrayDataNf[i]).val())
		else
			dataset.dataNf.push(false)
	}
	
	for(var i = 0; i < arraySomaDinheiro.length; i++){
		if($(arraySomaDinheiro[i]).val() != 0 && $(arraySomaDinheiro[i]).val() != '')
			dataset.dinheiro.push($(arraySomaDinheiro[i]).val())
		else
			dataset.dinheiro.push(false)
	}
	
	for(var i = 0; i < arraySomaCartao.length; i++){
		if($(arraySomaCartao[i]).val() != 0 && $(arraySomaCartao[i]).val() != '')
			dataset.cartao.push($(arraySomaCartao[i]).val())
		else
			dataset.cartao.push(false)
	}

	for(var i = 0; i < arrayNumeroParcelas.length; i++){
		if($(arrayNumeroParcelas[i]).val() != 0 && $(arrayNumeroParcelas[i]).val() != '')
			dataset.numeroParcelas.push($(arrayNumeroParcelas[i]).val())
		else
			dataset.numeroParcelas.push(false)
	}
	
	for(var i = 0; i < arrayProjeto.length; i++){
		if($(arrayProjeto[i]).val() != 0 && $(arrayProjeto[i]).val() != '')
			dataset.projetos.push($(arrayProjeto[i]).val())
		else
			dataset.projetos.push(false)
	}
	
	for(var i = 0; i < arrayCC.length; i++){
		if($(arrayCC[i]).val() != 0 && $(arrayCC[i]).val() != '')
			dataset.centroDeCusto.push($(arrayCC[i]).val())
		else
			dataset.centroDeCusto.push(false)
	}
	
	for(var i = 0; i < arrayPis.length; i++){
		if($(arrayPis[i]).val() != 0 && $(arrayPis[i]).val() != '')
			dataset.pis.push($(arrayPis[i]).val())
		else
			dataset.pis.push(false)
		
	}
	
	for(var i = 0; i < arrayCofins.length; i++){
		if($(arrayCofins[i]).val() != 0 && $(arrayCofins[i]).val() != '')
			dataset.cofins.push($(arrayCofins[i]).val())
		else
			dataset.cofins.push(false)
	}
	
	var finalDataset = [];
	
	for(var i = 1; i < arrayNomeDespesa.length; i++){
		var auxObject = {
			projeto: dataset.projetos[i],
			dataNf: dataset.dataNf[i],
			centroDeCusto: dataset.centroDeCusto[i],
			dinheiro: dataset.dinheiro[i],
			cartao: dataset.cartao[i],
			numeroParcelas: dataset.numeroParcelas[i],
			despesa: dataset.despesa[i],
			pis: dataset.pis[i],
			cofins: dataset.cofins[i]
		}
		if(auxObject.despesa && auxObject.despesa != false)
			finalDataset.push(auxObject)
	}
	console.log('datasetFinal',finalDataset)
	
	return finalDataset;
	
}

function buildDataset(){
	var arrayNomeDespesa = $('.nomeDespesa');
	var arrayDataNf = $('.dataNf');
	var arraySomaDinheiro = $('.somaDinheiro');
	var arraySomaCartao = $('.somaCartao');
	var arrayNumeroParcelas = $('.numeroParcelas');
	var arrayProjeto = $('[id^=projeto]');
	var arrayCC = $('[id^=ccInterno]');
	
	var dataset = {
		projetos: [],
		dataNf: [],
		centroDeCusto: [],
		dinheiro: [],
		cartao: [],
		numeroParcelas: [],
		despesa: []
	}
	
	for(var i = 0; i < arrayNomeDespesa.length; i++){
		if($(arrayNomeDespesa[i]).val() != 0 && $(arrayNomeDespesa[i]).val() != '')
			dataset.despesa.push($(arrayNomeDespesa[i]).val())
		else
			dataset.despesa.push(false)
	}
	
	for(var i = 0; i < arrayDataNf.length; i++){
		if($(arrayDataNf[i]).val() != 0 && $(arrayDataNf[i]).val() != '')
			dataset.dataNf.push($(arrayDataNf[i]).val())
		else
			dataset.dataNf.push(false)
	}
	
	for(var i = 0; i < arraySomaDinheiro.length; i++){
		if($(arraySomaDinheiro[i]).val() != 0 && $(arraySomaDinheiro[i]).val() != '')
			dataset.dinheiro.push($(arraySomaDinheiro[i]).val())
		else
			dataset.dinheiro.push(false)
	}
	
	for(var i = 0; i < arraySomaCartao.length; i++){
		if($(arraySomaCartao[i]).val() != 0 && $(arraySomaCartao[i]).val() != '')
			dataset.cartao.push($(arraySomaCartao[i]).val())
		else
			dataset.cartao.push(false)
	}

	for(var i = 0; i < arrayNumeroParcelas.length; i++){
		if($(arrayNumeroParcelas[i]).val() != 0 && $(arrayNumeroParcelas[i]).val() != '')
			dataset.numeroParcelas.push($(arrayNumeroParcelas[i]).val())
		else
			dataset.numeroParcelas.push(false)
	}
	
	for(var i = 0; i < arrayProjeto.length; i++){
		if($(arrayProjeto[i]).val() != 0 && $(arrayProjeto[i]).val() != '')
			dataset.projetos.push($(arrayProjeto[i]).val())
		else
			dataset.projetos.push(false)
	}
	
	for(var i = 0; i < arrayCC.length; i++){
		if($(arrayCC[i]).val() != 0 && $(arrayCC[i]).val() != '')
			dataset.centroDeCusto.push($(arrayCC[i]).val())
		else
			dataset.centroDeCusto.push(false)
	}
	
	
	var finalDataset = [];
	
	for(var i = 1; i < arrayNomeDespesa.length; i++){
		var auxObject = {
			projeto: dataset.projetos[i],
			dataNf: dataset.dataNf[i],
			centroDeCusto: dataset.centroDeCusto[i],
			dinheiro: dataset.dinheiro[i],
			cartao: dataset.cartao[i],
			numeroParcelas: dataset.numeroParcelas[i],
			despesa: dataset.despesa[i],
		}
		if(auxObject.despesa != false)
			finalDataset.push(auxObject)
	}
	
	
	return finalDataset;
	
}

function itemremove(oElement){ 
	//console.log('Atividade Atual', $("#Atividade").val());
	//if ($("#Atividade").val() == 1 || $("#Atividade").val() == 0 || $("#Atividade").val() == 8) {
		fnWdkRemoveChild(oElement);
		console.log('exclui', oElement);
		calculaAdiantamentos();
	//}
}

function setDivVisible(field, boolean){
	if(boolean){
		$(field).show();
	}else{
		$(field).hide();
	}
	
}

function addDespesas(nometable) { 
	console.log('adiciona despesas', nometable)
	
	if(nometable == 'despesas'){
		row = wdkAddChild('despesas'); 
		
		$("#nomeDespesa___" + newId).val(); 
		$("#pis___" + newId).val();
		$("#cofins___" + newId).val();
		$("#totalDinheiro___" + newId).val();
		$("#totalCartaoCredito___" + newId).val();
		$("#numeroParcelas___" + newId).val();
		$("#projeto" + newId).val();
		$("#projeto" + newId).addClass('projeto');
		$("#ccInterno" + newId).addClass('ccInterno');
		$("#NFcomCNPJ___" + newId).val();
	}else{
		console.log('nomeTable', nomeTable)
		row = wdkAddChild('despesas'); 
	}
	$(".fs-md-space ").removeClass('fs-md-space'); // remove a classe que aumenta o tamanho da lixeira
	
	$("input[id^='dataNf___']").each(function(index) {
	    var idCampo = $(this).attr("id");
	    FLUIGC.calendar('#' + idCampo);
	});
}

function addAdiantamentos(nometable, registro) {
	
	console.log('adiciona adiantamentos', registro);
	if(nometable == 'adiantamentos'){
		row = wdkAddChild('adiantamentos'); 
		//var data = (new Date(registro['solicitacaoDatetime'])).toLocaleString('pt-BR');
		$("#emitente___" + newId).val(registro['Emitente']);
		$("#emitenteId___" + newId).val(registro['emitenteId']); 
		$("#adiantamentoId___" + newId).val(registro['documentid']);
		$("#dataAdiantamento___" + newId).val(registro['dataEmissao']); 
		$("#valorAdiantamento2___" + newId).val(registro['totalAdiantado']);
		$("#statusAdiantamento___" + newId).val(registro['status']);
		console.log(newId);
	}else{
		console.log('adicionou indevidamente', nomeTable)
		row = wdkAddChild('adiantamentos'); 
	}
	$(".fs-md-space ").removeClass('fs-md-space'); // remove a classe que aumenta o tamanho da lixeira
	
}

