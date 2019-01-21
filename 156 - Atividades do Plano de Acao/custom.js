$(document).on("click", "#goToOccurrence", function(e) {
	e.preventDefault();
	openPA();
});

function openPA() {
	
	var numPA = document.getElementById("cdPlanoAcao").value;
	var numEmpresa = window.parent.WCMAPI.getTenantId();
	var usuarioLogado = window.parent.WCMAPI.getUserCode();
	//passar para a atividade do plano o código do processo do registro de ocorrencia para que ele possa reconehcer aqui
	//se código do campo _cdPlanoAcao ===null, abrir registro de ocorrencia carregado anteriormente.'
	
	var NrDocto = "";
	var versaoDoc = "";

	var ProcessPA = DatasetFactory.getDataset("processAttachment", null, new Array(DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", numPA, numPA, ConstraintType.MUST)), null);

	if(ProcessPA.values.length > 0){
		NrDocto = ProcessPA.values[0]["documentId"];
	}
	
	var ArrayDoc = DatasetFactory.getDataset("document", null, new Array(DatasetFactory.createConstraint("documentPK.documentId", NrDocto, NrDocto, ConstraintType.MUST)), null);
	
	if(ArrayDoc.values.length > 0){
		versaoDoc = ArrayDoc.values[0]["documentPK.version"];
	}
	console.log(numPA, numEmpresa, NrDocto);
	var url =
		window.location.origin 
		+ '/portal/p/' 
		+ numEmpresa
		+ '/pageworkflowview?app_ecm_workflowview_processInstanceId=' + numPA
		+ '&app_ecm_workflowview_currentMovto=2'
		+ '&app_ecm_workflowview_taskUserId='+ usuarioLogado
		+ '&app_ecm_workflowview_managerMode=false'
		+ '&app_ecm_workflowview_nrDoc=' + NrDocto
		+ '&app_ecm_workflowview_versionDoc=' + versaoDoc;

	window.open(url, "Plano de ação", "toolbar=no,scrollbars=yes,resizable=yes,width=1024,height=768");

}

function getDataAtual() {
	var DataAtual = new Date();
	document.getElementById("dtConclusaoReal").value = DataAtual.toLocaleDateString() + " " + DataAtual.getHours() + ":" + DataAtual.getMinutes();
}