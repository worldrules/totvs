function displayFields(form,customHTML){
	var numProccess = getValue("WKNumProces");
	form.setValue('numeroRD',numProccess);
	
	var estagio = getValue("WKNumState");
	form.setValue("Atividade", estagio);
	
	if (estagio == 4 || estagio == 11) {
		form.setVisibleById("btnAddDesp",false)
				
	}
	
	if(estagio == 4){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function(){");
	    customHTML.append("setDivVisible('#aprovacaoGestor', true);");
	    customHTML.append("$(':checkbox').prop('disabled',true);");
	    customHTML.append("})");
	    customHTML.append("</script>");
	   // form.setEnabled("btnAddDesp",false)
	}else{
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function(){");
	    customHTML.append("setDivVisible('#aprovacaoGestor', false);");
	    customHTML.append("})");
	    customHTML.append("</script>");
	}
	
	if(estagio == 11){
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function(){");
	    customHTML.append("$('#btndesp').show();$('#btncc').show();$('#btnsap').show();");
	    customHTML.append("$(':checkbox').prop('disabled',true);");
	    customHTML.append("})");
	    customHTML.append("</script>");
	}else{
		customHTML.append("<script>");
	    customHTML.append("$(document).ready(function(){");
	    customHTML.append("$('#btndesp').hide();$('#btncc').hide();$('#btnsap').hide();");
	    customHTML.append("})");
	    customHTML.append("</script>");
	}
	
}

