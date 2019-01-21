	function valida_horas(edit) {
		if (event.keyCode<48 || event.keyCode>57) {
			event.returnValue = false;
		}
		if (edit.value.length == 2 || edit.value.length == 5) {
			edit.value += ":";
		}
	}

	
	function setSelectedZoomItem(selectedItem){	
		if (selectedItem.inputName == "nmArea") {
			document.getElementById("nmArea").value = selectedItem["nmArea"];
			document.getElementById("idMatricRespArea").value = selectedItem["nmMatricRespArea"];
			document.getElementById("nmMatricRespArea").value = selectedItem["nmResponsavelArea"];
		} 
		
		if (selectedItem.inputName == "nmSolicitante") {
			document.getElementById("nmMatricSolicitante").value = selectedItem["colleagueId"];
		} 
		
		if (selectedItem.inputName == "nmAuditor") {
			document.getElementById("nmMatriculaAuditor").value = selectedItem["colleagueId"];
		} 
	}


function init(){
	

	var mySimpleCalendar = FLUIGC.calendar('#MY_SELECTOR1');
	var mySimpleCalendar2 = FLUIGC.calendar('#MY_SELECTOR2');
	var mySimpleCalendar3 = FLUIGC.calendar('#MY_SELECTOR3');
	var mySimpleCalendar4 = FLUIGC.calendar('#MY_SELECTOR4');
	
	var INICIO_SOLICITACAO = "0";
	var ATIVIDADE_INICIO   = "1";		
	var ANALISE_AUDITORIA = "5";
	var activity = getWKNumState();			
	
	if (activity != ATIVIDADE_INICIO && activity != INICIO_SOLICITACAO) {
		setVisible("addSolicitante" ,false);
		setVisible("addArea" ,false);
		setVisible("btCalendarDataIniAudit" ,false);
		setVisible("btCalendarDataFimAudit" ,false);
		setVisible("btIncluirArea" ,false);
		setVisible("zoomAuditor" ,false);
		
		if (activity != null) {}			

}


}
