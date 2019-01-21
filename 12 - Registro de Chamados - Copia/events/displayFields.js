function displayFields(form,customHTML){


	var finalizar = ["finalizar"];
	console.log(finalizar);

//funcao para mostrar a div
	function mostrarDIV(mostradiv) {
		customHTML.append("$('" + mostradiv + "').show();");
	}

//funcao para esconder a div
	function esconderDIV(ocultadiv) {
		customHTML.append("$('" + ocultadiv + "').hide();");
	}
//Habilitar alguns campos no formulario
	function enableFields(form){
		if(form.getFormMode() != 'ADD'){
			form.setEnabled("status", true);
			form.setEnabled("novoPrazo", true);
			form.setEnabled("comentario", true);
		}
	}

	function enableFields2(form){
		if(form.getFormMode() != 'ADD'){
			form.setEnabled("status", true);
			form.setEnabled("novoPrazo", true);
			form.setEnabled("comentario", true);
		}
	}

	function desabilitarCampos(campos) {
		campos.forEach(function(campo) {
			form.setEnabled(campo, false);
		});
	}

	function habilitarCampos(campos) {
		campos.forEach(function(campo) {
			form.setEnabled(campo, true);
		});
	}
	
	function habilitarCampos(campos){
		campos.forEach(function(campo){ 
			form.setEnabled(campo, true); 
		});		
	}

	form.setShowDisabledFields(true);
	//declaracao de funcoes auxiliares
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
	}

	//pega o numero do processo
		var numSolicitacao = getValue("WKNumProces");
	//pega a atividade da aplicação
		var atividade = getValue("WKNumState");
	//Inicio do jquery dentro do iframe? 
	customHTML.append("<script>");
	customHTML.append("$(document).ready(function(){");
	//Remove o botão de impressão
		form.setHidePrintLink(true);
	//Atividade de Inicio(0) ou Inicio(4)
	if(atividade == 0 || atividade == 4){
		
		form.setValue('nrChamado', numSolicitacao);
		form.setValue('solicitante',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataSolicitacao', formatDate(new Date()));
	
	}
	//Atividade de Realizer(5) ou de Revisão (31)
	if(atividade == 5 || atividade == 31){
		
	//Busca todos os campos e desativa os mesmos
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		var mapaForm = new java.util.HashMap();
		mapaForm = form.getCardData();
		var it = mapaForm.keySet().iterator();
			
		while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
			var key = it.next();
			form.setEnabled(key, habilitar);
		}
	//Abre a DIV responsavel    
		mostrarDIV("#areaResponsavel");
		//customHTML.append("$('#areaResponsavel').show();");
		customHTML.append('loadUsersBySelectedGroup();');
	//Coloca o Responsavel e a Data da criação do chamado	
		form.setValue('dataResponsavel', formatDate(new Date()));
		form.setValue('responsavelFormArea', getNomeSolicitante(getValue('WKUser'))); 
		
	//Habilita Status e Novo Prazo	
		enableFields(form);
	
	}
	//Atividade de Informar Solicitante
	if(atividade == 13){
		//Busca todos os campos e desativa os mesmos
		var desabilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		var habilitar = true;
		var mapaForm = new java.util.HashMap();
		mapaForm = form.getCardData();
		var it = mapaForm.keySet().iterator();

		while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
		var key = it.next();
		form.setEnabled(key, desabilitar);
		
	}
		habilitarCampos(finalizar);	
		mostrarDIV("#areaResponsavel");
		mostrarDIV("#areaFinal");
		esconderDIV("#descricaoDiv");
		
		
		 
		
		
	}
	//Final do jquery dentro do iframe? 
	customHTML.append("})");
	customHTML.append("</script>");
	
	
}