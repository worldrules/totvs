function displayFields(form,customHTML){
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	var numActivity = getValue("WKNumState");
	var numprocesso = getValue("WKNumProces");
	form.setValue("cdAtividadePA", numprocesso);
	var INICIO = 2;
	
	form.setEnabled("cdPlanoAcao",false);
	form.setEnabled("nmResponsavelPA",false);
	form.setEnabled("nmOquCom",false);
	form.setEnabled("nmResponsavel",false);
	form.setEnabled("nmPrazoDeConclusao",false);
	//form.setEnabled("cdAtividadePA",false);
	log.info("######## IF 1 #######");	
	if(numActivity != INICIO){
		form.setEnabled("dsAtividade", false);
	}
	
	log.info("######## IF 2 #######" + numActivity);	
	if(numActivity == 0 || numActivity == 1 ){
		log.info("######## ENTREI IF 2 #######");	
		var linkPA = form.getValue("cdPlanoAcao");
		log.info(linkPA);
		log.info("verificando se está nulo" + linkPA==null);
		log.info("verificando se está vazio" + linkPA=='');
		
		if(linkPA == '' || linkPA == null){
			customHTML.append('<script>');
			customHTML.append('$(function(){');
			customHTML.append('$("#goToOccurrence").remove();');
			customHTML.append('});');
			customHTML.append('</script>');
		}
	}
}