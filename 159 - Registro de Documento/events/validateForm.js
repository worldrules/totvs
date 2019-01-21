function validateForm(form){
	
	var numAtividade = getValue("WKNumState");

	if (numAtividade == 0 || numAtividade == 1){
		if (form.getValue("fgTipoSolicitacao") == null) {
			throw "É necessário selecionar um Tipo de Solicitação.";
		}
		
		if (form.getValue("dsMotivo") == "") {
			throw "É necessário preencher o campo Motivo.";
		}
		
		if (form.getValue("fgTipoSolicitacao") == "fgTipoSolicRevis" && (form.getValue("nmDocumento") == "" || form.getValue("nmVersao") == "")) {
			throw "É necessário selecionar um Documento para Revisão.";
		}
	}
}