function displayFields(form,customHTML){ 

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	var nrAtividade = getValue("WKNumState");

	customHTML.append("<script>");
	customHTML.append("$(document).ready(function(){");

	
//ID dos campos separados por String,
	var dadosRequisitante = ["cc","atividade","dataAtividade","horaInicio", "horaFim", "tempoAtividade", "obsAtividade", "numProlux", "regTipo", "regVendedor", "regUF", "regMargem", "regRevisoes", "regResumo", "regDescricao","regDtInicial","regValorBruto","regDtExpCompra","regVendaConv","regStatus","regDtFollowUp","regDescricaoFollowUp"];
	var dadosAprovador = ["nomeAprovador", "dataAprovador" , "apontamento","obsAprovador"];	

//chamada da função mais a var com todos os campos.
	desabilitarCampos(dadosRequisitante);
	desabilitarCampos(dadosAprovador);

//Variaveis com os códigos das atividades
	
	var cadastroApontamento = 0,
		aprovaApontamento = 4;
		corrigeApontamento = 8;	
	
	if (nrAtividade == 0 || nrAtividade == 3) {

		customHTML.append('var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "'+getValue('WKUser')+'", "'+getValue('WKUser')+'", ConstraintType.MUST);');
		customHTML.append('var usuariosSolicitanteDs = DatasetFactory.getDataset("colleague", null, new Array(c1), null);');
		customHTML.append('$("#nomeSolicitante").val(usuariosSolicitanteDs.values[0]["colleagueName"]);');
		//form.setValue('IDrespSolicitacao', getValue('WKUser'));
		//form.setValue('nomeRequisitante',getNomeSolicitante(getValue('WKUser')));
		//form.setValue('dataSolRequisitante', formatDate(new Date()));	
		habilitarCampos(dadosRequisitante);		
		//esconderDIV("#regApontamento");
		esconderDIV("#aprApontamento");				
	}
	else if (nrAtividade == aprovaApontamento) {		
		form.setValue('nomeAprovador',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataAprovador', formatDate(new Date()));	
		habilitarCampos(dadosAprovador);		
		//esconderDIV("#regApontamento");
		//esconderDIV("#aprApontamento");	
	}
	else if (nrAtividade == corrigeApontamento) {		
		//form.setValue('IDrespSolicitacao', getValue('WKUser'));
		//form.setValue('nomeRequisitante',getNomeSolicitante(getValue('WKUser')));
		//form.setValue('dataSolRequisitante', formatDate(new Date()));	
		habilitarCampos(dadosRequisitante);		
		//esconderDIV("#regApontamento");
		esconderDIV("#aprApontamento");	
	}	
	

	customHTML.append("});");
	customHTML.append("</script>");

	function desabilitarCampos(campos) {
		campos.forEach(function(campo) {
			form.setEnabled(campo, false);
		});
	}
	
	function habilitarCampos(campos){
		campos.forEach(function(campo){ 
			form.setEnabled(campo, true); 
		});		
	}

	function esconderDIV(ocultadiv) {
		customHTML.append("$('" + ocultadiv + "').hide();");
	}

	function mostrarDIV(mostradiv) {
		customHTML.append("$('" + mostradiv + "').show();");
	}

	function getNomeSolicitante(matUsuario) {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",
			matUsuario, matUsuario, ConstraintType.MUST);
		var filtro = new Array(c1);
		var dataset = DatasetFactory
		.getDataset("colleague", null, filtro, null);
		return dataset.getValue(0, "colleagueName");
	}

function formatDate(date) {
		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		return day + "/" + month + "/" + year;
	};
}