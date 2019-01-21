function displayFields(form,customHTML){ 
log.info("====================== DISPLAY FIELDS ======================" );
	form.setShowDisabledFields(true); 
	form.setHidePrintLink(true);
	var numActivity = getValue("WKNumState");
	log.info("Numero da Atividade: " + numActivity);

	
	 form.setVisibleById("dataContencao", false);
	var INICIO_SOLICITACAO = 0;
	var ATIVIDADE_INICIAL = 1;
	var APROVAR_SOLICITACAO = 2;
	var EXECUTAR_CONTENCAO = 4;
	var ANALISAR_CAUSA = 5;
	var APROVAR_ANALISE = 6;
	var REGISTRAR_PLANO = 7;
	var VERIFICAR_EFICACIA = 9;
	var NOTIFICAR = 10;

// alteração léo
	if(numActivity == APROVAR_SOLICITACAO) {
		form.setVisibleById("dataContencao", true);
	}
// alteração léo

	
	if(numActivity == ATIVIDADE_INICIAL || numActivity == INICIO_SOLICITACAO) {
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);

		form.setValue('nmUsuario', colaborador.getValue(0, "colleagueName"));
		form.setValue('matriculaUsuario', colaborador.getValue(0, "colleaguePK.colleagueId"));

		form.setEnabled("dsOrigem",true);	
		form.setEnabled("fgContencao", true);
		form.setEnabled("dsOcorrencia", true);
		form.setEnabled("dsContencao", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);		
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",true);
		form.setEnabled("nmOcorrencia", true);
		form.setEnabled("nmCriticidade", true);
		form.setEnabled("nmAssunto", true);
		
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
		form.setVisibleById("dataContencao", true);
		
		var fullDate = new Date();
		var hours = fullDate.getHours();
		var minutes = fullDate.getMinutes();
		if (minutes <= 9){ minutes = "0" + minutes; }
		var timeValue = hours + ":" + minutes;
		var date = fullDate.getDate().toString();
		if(date.length == 1){ date = 0+date; }
		var mes = (fullDate.getMonth()+1).toString();	
		if(mes.length == 1){ mes = 0+mes; }
		var data = date+"/"+mes+"/"+fullDate.getFullYear();
		form.setValue('dtRegistro',data);
		if (numActivity == INICIO_SOLICITACAO) {
			form.setValue('dtOcorrencia',data);
		}
	}
	else if (numActivity == APROVAR_SOLICITACAO) {
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);		
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);
		form.setEnabled("DataValidacao01", false);
		
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	else if (numActivity == EXECUTAR_CONTENCAO){
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", true);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);		
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);
		form.setEnabled("DataValidacao01", false);
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}	
	else if (numActivity == ANALISAR_CAUSA){
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", true);
		form.setEnabled("dsMedicaoPrincipal", true);
		form.setEnabled("dsMedicaoSecundaria", true);
		form.setEnabled("dsMaodeObraPrincipal", true);
		form.setEnabled("dsMaodeObraSecundaria", true);
		form.setEnabled("dsMaterialPrincipal", true);
		form.setEnabled("dsMaterialSecundario", true);
		form.setEnabled("dsMetodoPrincipal", true);
		form.setEnabled("dsMetodoSecundario", true);
		form.setEnabled("dsMeioAmbientePrincipal", true);
		form.setEnabled("dsMeioAmbienteSecundario", true);
		form.setEnabled("dsMaquinaPrincipal", true);
		form.setEnabled("dsMaquinaSecundario", true);
		form.setEnabled("dsEfeito", true);		
		form.setEnabled("DataValidacao01", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);
	}
	else if(numActivity == APROVAR_ANALISE){
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);		
		form.setEnabled("DataValidacao01", false);
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	else if(numActivity == REGISTRAR_PLANO){
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);
		
		form.setEnabled("dsAcoesExecutadas", true);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("DataValidacao01", false);
		form.setEnabled("dtOcorrencia", false);	
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	else if(numActivity == VERIFICAR_EFICACIA){
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);		
		form.setEnabled("DataValidacao01", false);
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", true);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);	
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	else if (numActivity == NOTIFICAR) {
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);		
		form.setEnabled("DataValidacao01", false);
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	else {
		form.setEnabled("dsOrigem", false);
		form.setEnabled("fgContencao", false);
		form.setEnabled("dsOcorrencia", false);
		form.setEnabled("dsContencao", false);
		form.setEnabled("fgOcorrenciaReincidente", false);
		form.setEnabled("cdOcorrenciaReincidente", false);
		//An?lise de Causa
		form.setEnabled("dsAnaliseCausa", false);
		form.setEnabled("dsMedicaoPrincipal", false);
		form.setEnabled("dsMedicaoSecundaria", false);
		form.setEnabled("dsMaodeObraPrincipal", false);
		form.setEnabled("dsMaodeObraSecundaria", false);
		form.setEnabled("dsMaterialPrincipal", false);
		form.setEnabled("dsMaterialSecundario", false);
		form.setEnabled("dsMetodoPrincipal", false);
		form.setEnabled("dsMetodoSecundario", false);
		form.setEnabled("dsMeioAmbientePrincipal", false);
		form.setEnabled("dsMeioAmbienteSecundario", false);
		form.setEnabled("dsMaquinaPrincipal", false);
		form.setEnabled("dsMaquinaSecundario", false);
		form.setEnabled("dsEfeito", false);
		
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsEficacia", false);
		form.setEnabled("nmTipoAcao",false);
		form.setEnabled("nmTipoOcorrencia", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("nmOrigem", false);
		form.setEnabled("nmCriticidade", false);
		form.setEnabled("nmAssunto", false);
		form.setEnabled("dtOcorrencia", false);
		
		
		//--------------------------------------------analise da causa 5 por ques
		form.setEnabled("cincopq_pergunta_1",false);
		form.setEnabled("cincopq_pergunta_2",false);
		form.setEnabled("cincopq_pergunta_3",false);
		form.setEnabled("cincopq_pergunta_4",false);
		form.setEnabled("cincopq_pergunta_5",false);
		
		form.setEnabled("cincopq_resposta_1",false);
		form.setEnabled("cincopq_resposta_2",false);
		form.setEnabled("cincopq_resposta_3",false);
		form.setEnabled("cincopq_resposta_4",false);
		form.setEnabled("cincopq_resposta_5",false);
		
		form.setEnabled("cincopq_causa_raiz",false);
	}
	
	form.setEnabled("cdOcorrencia", false);
	form.setEnabled("nmUsuario", false);
	form.setEnabled("dtRegistro", false);
	log.info("right before customHTML")
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");

}