function validateForm(form){
	var numAtiv = getValue("WKNumState");
	
	if(numAtiv == 0 || numAtiv == 1){
		if(form.getValue("fgOcorrenciaReincidente") == "Sim" && form.getValue("cdOcorrenciaReincidente") == ""){
			throw "Como foi informado que esta é uma ocorrência reincidente, seu número deve ser preenchido";
		}
	}
	
}