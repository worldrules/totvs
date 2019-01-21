function displayFields(form,customHTML){
	log.info("====================== DISPLAY FIELDS ======================" );
	form.setShowDisabledFields(true); 
	form.setHidePrintLink(true);
	
	if (form.getValue("fgTipoAuditoria") == "") { form.setValue('fgTipoAuditoria', 'fgTipoAuditInt'); }
	
	var numActivity = getValue("WKNumState");
	var INICIO_SOLICITACAO = 0;
	var ATIVIDADE_INICIAL = 1;
	var DETERMINAR_OBJETIVOS = 2;
	var AUTOMATICA = 3;
	var NOTIFICACAO = 4;
	var ANALISE_AUDITORIA = 5;
	var AVALIACAO_QUALIDADE = 6;
	var CONVOCACAO_REUNIAO = 7;
	var FIM = 8;
	
	if(numActivity == INICIO_SOLICITACAO || numActivity == ATIVIDADE_INICIAL){
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		var colaboradorLogado = getValue("WKUser");
		form.setValue('nmResponsavel',colaborador.getValue(0,"colleagueName"));
		form.setValue('nmMatricResponsavel',colaboradorLogado);
		
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
		
		form.setValue('dtData',data);
		form.setValue('dtDataInicioAudit',data);
		form.setValue('dtDataFimAudit',data);
	
		form.setEnabled("dtData", false);
		form.setEnabled("dsObjetivoAuditoria", true);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		
	}
	if(numActivity == DETERMINAR_OBJETIVOS){
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);	
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
		
		form.setEnabled("nmSolicitante", false);
		form.setEnabled("dtDataInvertFimAudit", false);
		
		
		
	}
	else if(numActivity == AUTOMATICA){
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);	
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("dtDataInicioAudit", false);		
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
		
		form.setEnabled("nmSolicitante", false);
		form.setEnabled("dtDataInvertFimAudit", false);
		
		form.setEnabled("nmAuditor", false);
		form.setEnabled("nmObservacoesPlanejamento", false);
		
		
	}
	else if(numActivity == NOTIFICACAO){
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);	
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("dtDataInicioAudit", false);		
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
	}
	else if(numActivity == ANALISE_AUDITORIA){
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		var colaboradorLogado = getValue("WKUser");
		form.setValue('nmRespAuditLider',colaborador.getValue(0,"colleagueName"));
		form.setValue('nmMatricRespLider',colaboradorLogado);
		
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", true);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
		
		form.setEnabled("nmSolicitante", false);
		form.setEnabled("dtDataInvertFimAudit", false);
		
		form.setEnabled("nmAuditor", false);
		form.setEnabled("nmObservacoesPlanejamento", false);
	}
	else if(numActivity == AVALIACAO_QUALIDADE){
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		var colaboradorLogado = getValue("WKUser");
		form.setValue('nmRespQualidade',colaborador.getValue(0,"colleagueName"));
		form.setValue('nmMatricRespQualidade',colaboradorLogado);
		
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade", false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", true);
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
	}
	else if(numActivity == CONVOCACAO_REUNIAO ){
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dtDataFimAudit", false);	
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade",false);
		form.setEnabled("dtDataInicioAudit", false);		
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioReplanAudit",false);
		form.setEnabled("dtDataFimReplanAudit",false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
		
		form.setEnabled("nmSolicitante", false);
		form.setEnabled("dtDataInvertFimAudit", false);
		
		form.setEnabled("nmAuditor", false);
		form.setEnabled("nmObservacoesPlanejamento", false);
	}
	else if(numActivity == FIM){
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade", false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
		
		form.setEnabled("nmSolicitante", false);
		form.setEnabled("dtDataInvertFimAudit", false);
		
		form.setEnabled("nmAuditor", false);
		form.setEnabled("nmObservacoesPlanejamento", false);
	}
	else if(numActivity == null){
		form.setEnabled("nrSolicitacao",false);	
		form.setEnabled("nmResponsavel", false);
		form.setEnabled("nmMatricResponsavel", false);
		form.setEnabled("nmArea", false);
		form.setEnabled("dtData", false);
		form.setEnabled("dsComunicado", false);
		form.setEnabled("rdAuditRealizada",false);
		form.setEnabled("dtDataInicioAudit", false);
		form.setEnabled("dsObjetivoAuditoria", false);
		form.setEnabled("dsAcoesExecutadas", false);
		form.setEnabled("dsObservacoesAvaliacao", false);
		form.setEnabled("nmRespQualidade", false);
		form.setEnabled("nmMatricRespQualidade", false);
		form.setEnabled("dsObservacoesQualidade", false);
		form.setEnabled("nmRespAuditLider", false);
		form.setEnabled("nmMatricRespLider", false);
		form.setEnabled("fgTipoAuditoria", false);
	}
		
		form.setEnabled("nrSolicitacao",false);	
		form.setEnabled("nmResponsavel", false);
		form.setEnabled("nmMatricResponsavel", false);
		
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
}