function validateForm(form) {
	
	if (getValue("WKCompletTask") == "true"){
		
		if ( form.getValue('dsComunicado') == "" ){
			throw "O campo Comunicado ? de preenchimento obrigat?rio";
		}
		if ( form.getValue('fgTipoAuditoria') == ""){
			throw "O campo Tipo de Auditoria ? de preenchimento obrigat?rio";
		}
		if ( form.getValue('dsObjetivoAuditoria') == ""){
			throw "O campo Objetivo da Auditoria ? de preenchimento obrigat?rio";
		}
		if ((form.getValue('dtDataInicioAudit')== "") || (form.getValue('dtDataFimAudit')== "")) {
			throw "O campo Per?odo de Auditoria ? de preenchimento obrigat?rio";
		}
		
		}
	}