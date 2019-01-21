function displayFields(form,customHTML){
	//mostra todos campos desabilitados
	form.setShowDisabledFields(true); 
	//some botao da impressora
	form.setHidePrintLink(true);
	
	//pega o numero da atividade
	var numActivity = getValue("WKNumState");
	//constantes
	var INICIO_SOLICITACAO = 0;
	var FAZER_TRIAGEM = 2;
	
	
	if(numActivity == INICIO_SOLICITACAO){
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		var colaboradorLogado = getValue("WKUser");
		form.setValue('nmSolicitante',colaborador.getValue(0,"colleagueName"));
		form.setValue('nmMatricSolicitante',colaboradorLogado);

		var date = new Date();
		var Dia = date.getDate();
		var month = date.getMonth()+ 1;
		var minutos = date.getMinutes();
        
        if (Dia.toString().length <= 1) {
        	Dia = '0' + Dia;
        }
        
        if (month.toString().length <= 1) {
        	month = '0' + month;
        }
        
        if (date.getMinutes().toString().length <= 1) {
        	minutos = '0' + minutos;
        }

        var dataAtual = Dia + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":" + minutos;

		form.setValue('dtData',dataAtual);
		form.setEnabled("dsComentTriagem",false);
		

	}
	
	if(numActivity == FAZER_TRIAGEM){
		
		var revisar = form.getValue("fgTipoSolicitacao");
		if(revisar == "fgTipoSolicRevis" ){
			customHTML.append("<script>$('#div_revisar').show();</script>"); 
			}
		else{
			}
		
		
		form.setEnabled("fgTipoSolicitacao", false);
		form.setEnabled("dsMotivo", false);
		form.setEnabled("nmDocumento", false);
		form.setEnabled("nmVersao", false);
		form.setEnabled("fgNecessitaCapacit", false);
		form.setEnabled("fgDistCopControl", false);
		form.setEnabled("dsComentTriagem", true);
	}
	
	if(numActivity != INICIO_SOLICITACAO && numActivity != FAZER_TRIAGEM && numActivity != null ){
		form.setEnabled("fgTipoSolicitacao", false);
		form.setEnabled("dsMotivo", false);
		form.setEnabled("nmDocumento", false);
		form.setEnabled("nmVersao", false);
		form.setEnabled("fgNecessitaCapacit", false);
		form.setEnabled("fgDistCopControl", false);
		form.setEnabled("dsComentTriagem", false);
		
		var revisar = form.getValue("fgTipoSolicitacao");
		if(revisar == "fgTipoSolicRevis" ){
			customHTML.append("<script> $('#div_revisar').show();</script>"); 
			}
		else{
			}
		
	}

	form.setEnabled("nmSolicitante",false);	
	form.setEnabled("nmMatricSolicitante", false);
	form.setEnabled("dtData", false);
	
	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");

}