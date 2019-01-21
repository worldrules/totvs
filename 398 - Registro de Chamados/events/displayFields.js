function displayFields(form,customHTML){ 
	
	
	var numSolicitacao = getValue("WKNumProces");
	var estagio = getValue("WKNumState");
	form.setValue('nrChamado', numSolicitacao);
	//basic hidden fields
	customHTML.append("<script>");
    customHTML.append("$(document).ready(function(){");
	
    
    
	form.setVisible("aprovacao", false);
	//disableZooms()
	if(estagio == 0 || estagio == 4){
		var usuarioSolicitante = getValue('WKUser');
		
		customHTML.append('var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "'+usuarioSolicitante+'", "'+usuarioSolicitante+'", ConstraintType.MUST);');
		customHTML.append('var usuariosSolicitanteDs = DatasetFactory.getDataset("colleague", null, new Array(c1), null);');
		customHTML.append('$("#solicitante").val(usuariosSolicitanteDs.values[0]["colleagueName"]);');
		customHTML.append("$('#dataSolicitacao').val($.datepicker.formatDate('dd/mm/yy', new Date()));")
		//$.datepicker.formatDate('dd/mm/yy', new Date())
	}else if(estagio >= 5){
		customHTML.append("$('#areaResponsavel').show();");
		customHTML.append('loadUsersBySelectedGroup();');
		customHTML.append('$("#responsavel").attr("readonly", "readonly");');
		customHTML.append('$("#envioPara").attr("readonly", "readonly");');
	}
	if(estagio == 13){
		customHTML.append('$("#areaFinal").show();');
	}
	
	customHTML.append("})");
    customHTML.append("</script>");
	
}