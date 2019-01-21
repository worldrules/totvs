function displayFields(form,customHTML){ 

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	var nrAtividade = getValue("WKNumState");

	customHTML.append("<script>");
	customHTML.append("$(document).ready(function(){");

	
//ID dos campos separados por String,
	var dadosRequisitante = ["nomeRequisitante","idResponsavel","responsavel", "dataSolRequisitante", "statusRequisitante", "cliente", "contato", "centroDeCusto", "atividade", "dataExecucao", "check", "docTecnico", "tbOrcamento", "obsRequisitante"];
	var dadosRespTecnico = ["nomeResponsavel", "dataResponsavel" , "obsResponsavel"];
	var dadosDptoPessoal = ["nomeDptoPessoal", "dataDptoPessoal" ,"statusDptoPessoal", "obsDptoPessoal"];
	var dadosRespTecExecutor = ["nomeRespTecnicoExecutor", "dataRespTecnicoExecutor" ,"executor", "obsRespTecnicoExecutor"];
	var dadosExecutor = ["obsExecutor"];
	var dadosRespTecRel = ["obsrespTecRel"];
	var dadosReqAvaliaAtendimento = ["faturarSim","faturarNao","obsReqRelatorio"];
	var dadosDptoFinanceiro = ["nomeDptoFinanceiro", "dataDptoFinanceiro" ,"statusDptoFinanceiro", "obsDptoFinanceiro"];

//chamada da função mais a var com todos os campos.
	desabilitarCampos(dadosRequisitante);
	desabilitarCampos(dadosRespTecnico);
	desabilitarCampos(dadosDptoPessoal);	
	desabilitarCampos(dadosRespTecExecutor);
	desabilitarCampos(dadosExecutor);
	desabilitarCampos(dadosRespTecRel);
	desabilitarCampos(dadosReqAvaliaAtendimento);
	desabilitarCampos(dadosDptoFinanceiro);


//Variaveis com os códigos das atividades
	
	var requisitante = 0,
	documentacaoTecnica = 8,
	documentacaoTrabalho = 6,
	delegarExecutor = 11,
	executarServico = 16,
	receberRelatorio = 20,
	avaliarAtendimento = 44,
	faturar = 30;
	fim = 34;
	

	
	if (nrAtividade == 0 || nrAtividade == 3) {
		
		form.setValue('IdAtivi', nrAtividade);
		//customHTML.append("var x = DatasetFactory.getDataset('Cadastro de Cliente - Oportunidade - Contratos',null,null,null);  for(var i=0;i<x.values.length;i++){ if(x.values[i].numProlux2 != ''){$('#numProlux').append('<option value='+x.values[i].numProlux2 +'>'+x.values[i].numProlux2 +'</option>');};");
		form.setValue('IDrespSolicitacao', getValue('WKUser'));
		form.setValue('nomeRequisitante',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataSolRequisitante', formatDate(new Date()));	
		habilitarCampos(dadosRequisitante);
		//habilitarCampos(dadosCliente);
		//habilitarCampos(checklistdocumentos);	
		//esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == documentacaoTecnica) {
		
		form.setValue('IdAtivi', nrAtividade);
		form.setValue('nomeResponsavel',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataResponsavel', formatDate(new Date()));
		habilitarCampos(dadosRespTecnico);		
		//esconderDIV("#requisitante");
		
		//esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
		
		esconderDIV("#Cliente");
		esconderDIV("#Contato");
		esconderDIV("#CCusto");
		esconderDIV("#Ativ");
		esconderDIV("#Mat");
		esconderDIV("#DatExec");
		esconderDIV("#LinhaRequistDat");
		esconderDIV("#esconde2");
		esconderDIV("#ChekDocTrab");
		esconderDIV("#DivNPro");
        mostrarDIV("#esconde");
        form.setEnabled("nomeTec", false);
        form.setEnabled("responsavel", false);
		
		//form.setVisibleById("esconde", true);
		
	}
	else if (nrAtividade == documentacaoTrabalho) {
		
		form.setValue('IdAtivi', nrAtividade);
		form.setValue('nomeDptoPessoal',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataDptoPessoal', formatDate(new Date()));
		habilitarCampos(dadosDptoPessoal);			
		//esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		//esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");

		mostrarDIV("#esconde2");
		
		esconderDIV("#Cliente");
		esconderDIV("#Contato");
		esconderDIV("#CCusto");
		esconderDIV("#Ativ");
		esconderDIV("#Mat");
		esconderDIV("#DatExec");
		esconderDIV("#LinhaRequistDat");
		esconderDIV("#esconde");
		esconderDIV("#ChekDocTec");
		esconderDIV("#DivNPro");
		form.setEnabled("docTrabalho", false);
		
		var CamposPaiFilho = ["tecResponsavel","nomeTrab"];
		desabilitarCamposPaiFilho("tbOrcamento", CamposPaiFilho);
	}
	else if (nrAtividade == delegarExecutor) {		
		form.setValue('IdAtivi', nrAtividade);
		form.setValue('nomeRespTecnicoExecutor',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataRespTecnicoExecutor', formatDate(new Date()));
		habilitarCampos(dadosRespTecExecutor);			
		esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		//esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == executarServico) {
		form.setValue('IdAtivi', nrAtividade);
		//form.setValue('dataDptoPessoal', formatDate(new Date()));
		habilitarCampos(dadosExecutor);			
		esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		//esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == receberRelatorio) {
		form.setValue('IdAtivi', nrAtividade);
		//form.setValue('dataDptoPessoal', formatDate(new Date()));
		habilitarCampos(dadosRespTecRel);			
		esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		//esconderDIV("#respTecRel");
		esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == avaliarAtendimento) {
		form.setValue('IdAtivi', nrAtividade);
		//form.setValue('dataDptoPessoal', formatDate(new Date()));
		habilitarCampos(dadosReqAvaliaAtendimento);			
		esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");
		//esconderDIV("#reqAvaliaAtendimento");
		esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == faturar) {
		form.setValue('IdAtivi', nrAtividade);
		form.setValue('nomeDptoFinanceiro',getNomeSolicitante(getValue('WKUser')));
		form.setValue('dataDptoFinanceiro', formatDate(new Date()));
		habilitarCampos(dadosDptoFinanceiro);			
		esconderDIV("#requisitante");
		esconderDIV("#respTecnico");
		esconderDIV("#respTecnicoExecutor");
		esconderDIV("#dptoPessoal");		
		esconderDIV("#executor1");
		esconderDIV("#respTecRel");		
		esconderDIV("#reqAvaliaAtendimento");
		//esconderDIV("#dptoFinanceiro");
	}
	else if (nrAtividade == 8 || nrAtividade == 6) {
		
		if(form.getValue("docTecnico") =="true"){
			mostrarDIV("#esconde");
		}
		else{
            esconderDIV("#esconde");
		}
				
		if(form.getValue("docTrabalho") =="on"){
			mostrarDIV("#esconde2");
		}
		else{
            esconderDIV("#esconde2");
		}
		
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
	
	function desabilitarCamposPaiFilho(tableName, campos){
	   	
	       var indexes = form.getChildrenIndexes(tableName);
	       
	       for (var i = 0; i < indexes.length; i++) {
	           for (var j = 0; j < campos.length; j++) {
	            
	           	form.setEnabled(campos[j] + "___" + indexes[i], false);
	           }                                
	       }
	   }

function formatDate(date) {
		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		return day + "/" + month + "/" + year;
	};
}