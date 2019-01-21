function displayFields(form,customHTML){ 

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	var nrAtividade = getValue("WKNumState");
	form.setValue('NumAtividade', nrAtividade);	
	
	customHTML.append("<script>");
	customHTML.append("$(document).ready(function(){");

	
//ID dos campos separados por String,
	var dadosRequisitante = ["nomeCliente", "contatoCadTel", "contatoCadEmail", "nomeContato","novoContato","novoContato", "contatoTecnico", "contatoFinanceiro", "contatoComercial", "numProlux","numProlux2", "regTipo", "desItem", "regVendedor", "regUF", "aceiteProposta", "regMargem", "regRevisoes", "regResumo", "regDescricao","regDtInicial","regValorBruto","regDtExpCompra","regVendaConv","regStatus","regDtFollowUp","regDescricaoFollowUp"];
	var soStatus = ["regStatus"];
	var DemaisDadosVendedor = ["numProlux","numProlux2", "regTipo", "desItem", "regVendedor", "regUF", "aceiteProposta", "regMargem", "regRevisoes", "regResumo", "regDescricao","regDtInicial","regValorBruto","regDtExpCompra","regVendaConv","regStatus","regDtFollowUp","regDescricaoFollowUp"];
	var dadosSolicitante = ["nomeSolicitante", "dataSolicitante" , "obsSolicitante"];
	var dadosAnaliseComercial = ["nomeComercial", "dataComercial" ,"obsComercial"];
	var dadosVendedor = ["nomeVendedor", "dataVendedor" ,"oportunidade", "obsVendedor"];
	var dadosPassagemContrato = ["nomeSolicitante2", "dataSolicitante2" , "obsSolicitante2"];
	var dadosEngenharia = ["regComentario","regAdmin","idRegAdmin","regTecContrato","idRegTecContrato"];
	var dadosAdministrador = ["regContrato","nomeAdmin","dataAdmin","documentacao","obsAdmin"];
	var dadosRevisor = ["nomeRevisor", "dataRevisor" , "obsRevisor"];
	var dadosListaAtividade = ["listaAtividade", "listaAtv" ,"horaHomem", "listaMaterial","listaMat"];
	var dadosResTecnico = ["nomeResponsavelTecnico", "dataResponsavelTecnico" ,"obsResponsavelTecnico"];

//chamada da função mais a var com todos os campos.
	desabilitarCampos(dadosRequisitante);
	desabilitarCampos(dadosSolicitante);
	desabilitarCampos(dadosAnaliseComercial);	
	desabilitarCampos(dadosVendedor);
	desabilitarCampos(dadosPassagemContrato);
	desabilitarCampos(dadosEngenharia);
	desabilitarCampos(dadosAdministrador);
	desabilitarCampos(dadosRevisor);
	desabilitarCampos(dadosListaAtividade);
	desabilitarCampos(dadosResTecnico);	

//Variaveis com os códigos das atividades
	
	var requisitante = 0,
	orcamento = 12,
	analiseComercial = 5,	
	vendedor = 15,
	passagemContrato = 7,
	engenharia = 28,
	administradorContrato = 38,
	revisorDocumentacao = 83,
	criarAtividade = 64;
	responsavelTecnico = 40;
	fim1 = 49;
	fim2 = 53;
	fim3 = 71;
	
	var nomeContato = form.getValue("nomeContato");
	//nomeCliente = "teste";	
	
	
	if (nrAtividade == 0 || nrAtividade == 4) {
		//form.setValue('IDrespSolicitacao', getValue('WKUser'));
		//form.setValue('nomeRequisitante',getNomeSolicitante(getValue('WKUser')));
		//form.setValue('dataSolRequisitante', formatDate(new Date()));	
		habilitarCampos(dadosRequisitante);		
		//esconderDIV("#requisitante");
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		//esconderDIV("#DivDatOrc");
		//esconderDIV("#DivDatVend");
		form.setValue('dataAtual', formatDate(new Date()));		
		//esconderDIV("#divStats");

		//var nomeContato = form.getValue("nomeContato");
		//nomeCliente = "teste";
		//form.setValue('regResumo',nomeContato);		

		
	}
	if (nrAtividade == 127) {
			var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
			 var mapaForm = new java.util.HashMap();
			 mapaForm = form.getCardData();
			 var it = mapaForm.keySet().iterator();
			while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
				   var key = it.next();
				   
				   	form.setEnabled(key, habilitar);	   
	            }
	            mostrarDIV("#DivDatPass");
	            form.setEnabled("prazoPass", true);
	    
	}
	else if (nrAtividade == orcamento) {
		habilitarCampos(dadosSolicitante);
		form.setValue('nomeSolicitante',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataSolicitante', formatDate(new Date()));
		//esconderDIV("#requisitante");
		habilitarCampos(soStatus);
		desabilitarCampos(dadosRequisitante);
		//esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");	
		form.setEnabled("regVendedor",true);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("regStatus",true);
		form.setEnabled("dataIni",false);		
		
		form.setEnabled("contatoCadTel",false);
		form.setEnabled("contatoCadEmail",false);
		form.setEnabled("regOrcamentista",false);
		//form.setEnabled("regDtFollowUp",false);
	}
	else if (nrAtividade == analiseComercial) {
		habilitarCampos(dadosAnaliseComercial);
		form.setValue('nomeComercial',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataComercial', formatDate(new Date()));
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		//esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		form.setEnabled("dataIni",false);
	}
	else if (nrAtividade == vendedor) {
		
		//habilitarCampos(dadosRequisitante);
		habilitarCampos(soStatus);	
		habilitarCampos(DemaisDadosVendedor);
		//form.setValue('nomeVendedor',getNomeSolicitante(getValue('WKUser')));
		//form.setValue('dataVendedor', formatDate(new Date()));
		//esconderDIV("#requisitante");
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		// SETA VALOR NO CAMPO HIDDEN nomeContato2
		form.setValue('nomeContato2',nomeContato);
		//form.setEnabled("regVendedor",false);
		form.setEnabled("regOrcamentista",true);
		form.setEnabled("regStatus",true);
		form.setEnabled("regDtFollowUp", true);
		form.setEnabled("regDescricaoFollowUp", true);
		form.setEnabled("regDtFollowUp", true);

	}
	else if (nrAtividade == passagemContrato) {
		habilitarCampos(dadosPassagemContrato);
		form.setValue('nomeSolicitante2',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataSolicitante2', formatDate(new Date()));
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		//esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		mostrarDIV("#DivDatPass");
		//---------Dia 07/12-----------------------------
		form.setVisibleById("DivDatPass", true);
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
	}
	else if (nrAtividade == engenharia) {
		habilitarCampos(dadosEngenharia);
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		//esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		//---------Dia 07/12-----------------------------
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
	}
	if (nrAtividade == 104) {
		//---------Dia 07/12-----------------------------
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
	}
	else if (nrAtividade == administradorContrato) {
		habilitarCampos(dadosAdministrador);
		form.setValue('nomeAdmin',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataAdmin', formatDate(new Date()));
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		//esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		//---------Dia 07/12-----------------------------
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
	}
	else if (nrAtividade == revisorDocumentacao) {
		habilitarCampos(dadosRevisor);
		form.setValue('nomeRevisor',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataRevisor', formatDate(new Date()));
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		//esconderDIV("#revisar_documentacao");
		esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		//---------Dia 07/12-----------------------------
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
	}
	else if (nrAtividade == criarAtividade) {
		
		//esconderDIV("#requisitante");
		desabilitarCampos(dadosRequisitante);
		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		//esconderDIV("#lista_atividade");
		esconderDIV("#responsavel_tecnico");
		//---------Dia 07/12-----------------------------
		form.setEnabled("contatoCadTel", false);
		form.setEnabled("contatoCadEmail", false);
		form.setEnabled("regDtFollowUp", false);
		form.setEnabled("prazoOrc", false);
		form.setEnabled("regOrcamentista",false);
		form.setEnabled("dataIni",false);
		habilitarCampos(dadosListaAtividade);
	}
	else if (nrAtividade == responsavelTecnico) {
		habilitarCampos(dadosResTecnico);
		form.setValue('nomeResponsavelTecnico',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataResponsavelTecnico', formatDate(new Date()));
		//esconderDIV("#requisitante");
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		 var mapaForm = new java.util.HashMap();
		 mapaForm = form.getCardData();
		 var it = mapaForm.keySet().iterator();
		while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
			   var key = it.next();
			   
			   	form.setEnabled(key, habilitar);	   
			}

		esconderDIV("#solicitante_orcamento");
		esconderDIV("#analise_comercial");
		esconderDIV("#vendedor");		
		esconderDIV("#passagem_contrato");
		esconderDIV("#avaliacao_contrato");		
		esconderDIV("#admin_contrato");
		esconderDIV("#revisar_documentacao");
		
		//esconderDIV("#lista_atividade");
		//---------Dia 07/12-----------------------------
		form.setEnabled("obsResponsavelTecnico", true);
	}
	else if(nrAtividade == 110 || nrAtividade == 112){
		
		//esconderDIV("#requisitante");
		var habilitar = false; // Informe True para Habilitar ou False para Desabilitar os campos
		 var mapaForm = new java.util.HashMap();
		 mapaForm = form.getCardData();
		 var it = mapaForm.keySet().iterator();
		 while (it.hasNext()) { // Laço de repetição para habilitar/desabilitar os campos
			   var key = it.next();
			   
			   	form.setEnabled(key, habilitar);	   
			}
		
		//esconderDIV("#lista_atividade");
		//---------Dia 07/12-----------------------------
		//form.setEnabled("obsResponsavelTecnico", true);
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