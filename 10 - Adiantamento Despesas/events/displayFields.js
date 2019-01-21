function displayFields(form,customHTML){ 
	
	var numSolicitacao = getValue("WKNumProces");
	var estagio = getValue("WKNumState");
	var nrAtividade = getValue("WKNumState");
	form.setValue('Atividade', nrAtividade);	
	
	if (estagio == 4 || estagio == 0 || estagio == 1) {
		customHTML.append("<script>");
		    customHTML.append("$(document).ready(function()");
		   customHTML.append("{");
		    customHTML.append("toggleAproveSection(false);");		   
		    customHTML.append("})");
		    customHTML.append("</script>");
	}	
	if(estagio == 6){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append("toggleAproveSection(true);");
	    customHTML.append("})");
	    customHTML.append("</script>");
	    
	    //Alteração 17/12 Narles 
		var usuario = getValue("WKUser");

		filter = new java.util.HashMap();
	    filter.put("colleaguePK.colleagueId", usuario);
	    usuario = getDatasetValues('colleague',filter);
	    form.setValue('responsavelAprovacao', usuario.get(0).get("colleagueName"));
	    form.setValue('dataHoraAprov', formatDate(new Date()));
	}else{
		//customHTML.append("<script>");
	  //  customHTML.append("$(document).ready(function()");
	   // customHTML.append("{");
	   // customHTML.append("toggleAproveSection(false);");
	   
	  //  customHTML.append("})");
	  //  customHTML.append("</script>");
	} 
	if(estagio == 11 || estagio == 13 || estagio == 15){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append("toggleFinanceSection(true);");
	    customHTML.append("})");
	    customHTML.append("</script>");
	    form.setVisibleById("btnRemovBanco", false);
	    form.setVisibleById("btnAddBanco", false);
	    form.setVisibleById("aprovacaoLiderGroup", true);
	    form.setEnabled("aprovacaoLider", false);
	    form.setEnabled("observacaoAprovacao", false);
	    

	}else{
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append("toggleFinanceSection(false);");
	    customHTML.append('$("#dataHoraFinanceiro").attr("readonly", "readonly");');
	    customHTML.append('$("#dataDepositoFinanceiro").attr("readonly", "readonly");');
	    customHTML.append('$("#informacoes").attr("readonly", "readonly");');
	    customHTML.append("})");
	    customHTML.append("</script>");
	}
	
	if (estagio == 17) {
		form.setEnabled("aprovacaoLider", false);
	}
	
	if(estagio != 11){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append('$("#dataHoraFinanceiro").attr("readonly", "readonly");');
	    customHTML.append('$("#dataDepositoFinanceiro").attr("readonly", "readonly");');
	    customHTML.append('$("#informacoes").attr("readonly", "readonly");');
	    customHTML.append("})");
	    customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append("setFinanceAprover();");
	    customHTML.append("setFieldDate('#dataHoraFinanceiro');");
	    customHTML.append('$("#dataHoraFinanceiro").attr("readonly", "readonly");');
	    customHTML.append("})");
	    customHTML.append("</script>");
	}
	
	if(estagio != 4 && estagio != 0){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append('$("#solicitacaoDatetime").attr("readonly", "readonly");');
	    customHTML.append('$("#valorAdiantamento").attr("readonly", "readonly");');
	    customHTML.append('$("#periodoInicio").attr("readonly", "readonly");');
	    customHTML.append('$("#datperiodoFim").attr("readonly", "readonly");');
	    customHTML.append('$("#agencia").attr("readonly", "readonly");');
	    customHTML.append('$("#contaCorrente").attr("readonly", "readonly");');
	    customHTML.append('$("#motivo").attr("readonly", "readonly");');
	    customHTML.append("})");
	    customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function()");
	    customHTML.append("{");
	    customHTML.append("setFieldDate('#solicitacaoDatetime');");
	    customHTML.append("})");
	    customHTML.append("</script>");
	}
	
	customHTML.append("<script>");
    customHTML.append("$(document).ready(function()");
    customHTML.append("{");
    customHTML.append("disableFields("+numSolicitacao+");");

    customHTML.append("})");
    customHTML.append("</script>");
    
    function formatDate(date) {
		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();
		return day + "/" + month + "/" + year;
	};
}
