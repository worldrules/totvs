function validateForm(form){ 

	//form.setShowDisabledFields(true);
	//form.setHidePrintLink(true);
	var nrAtividade = getValue("WKNumState");
	
	
	
	//CRIAR ARQUIVO DE LOG NO SISTEMA
	//log.info('LINHA 27')



//Variaveis com os códigos das atividades
	
	var cadastroApontamento = 0,
		aprovaApontamento = 4;
		corrigeApontamento = 8;
	
	
	
	if (nrAtividade == 0 || nrAtividade == 3) {	
		var msg = "";			
		var indexes = form.getChildrenIndexes("listaAtividade"); 			
			if(indexes.length != 0 ){				
				var count = 0 ;					
					for (var i = 0; i < indexes.length; i++) {
						count = i + 1;	
						if(form.getValue("cc___" + indexes[i]) == "" || form.getValue("cc___" + indexes[i]) == null ){
							msg+= "O campo CC deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("atividade___" + indexes[i]) == "" || form.getValue("atividade___" + indexes[i]) == null ){
							msg+= "O campo Atividade deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("dataAtividade___" + indexes[i]) == "" || form.getValue("dataAtividade___" + indexes[i]) == null ){
							msg+= "O campo Data deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("horaInicio___" + indexes[i]) == "" || form.getValue("horaInicio___" + indexes[i]) == null ){
							msg+= "O campo Início deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("horaFim___" + indexes[i]) == "" || form.getValue("horaFim___" + indexes[i]) == null ){
							msg+= "O campo Fim deve ser informado no registro " + count +"\n\n";					
						}											
					} 
						if(msg != ""){
							throw msg;
						}
			}else{
				msg+= "Favor, cadastrar ao menos um apontamento.\n";
				throw msg;
			}

	}
	else if (nrAtividade == corrigeApontamento) {
			var msg = "";			
		var indexes = form.getChildrenIndexes("listaAtividade"); 			
			if(indexes.length != 0 ){				
				var count = 0 ;					
					for (var i = 0; i < indexes.length; i++) {
						count = i + 1;	
						if(form.getValue("cc___" + indexes[i]) == "" || form.getValue("cc___" + indexes[i]) == null ){
							msg+= "O campo CC deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("atividade___" + indexes[i]) == "" || form.getValue("atividade___" + indexes[i]) == null ){
							msg+= "O campo Atividade deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("dataAtividade___" + indexes[i]) == "" || form.getValue("dataAtividade___" + indexes[i]) == null ){
							msg+= "O campo Data deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("horaInicio___" + indexes[i]) == "" || form.getValue("horaInicio___" + indexes[i]) == null ){
							msg+= "O campo Início deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("horaFim___" + indexes[i]) == "" || form.getValue("horaFim___" + indexes[i]) == null ){
							msg+= "O campo Fim deve ser informado no registro " + count +"\n\n";					
						}											
					} 
						if(msg != ""){
							throw msg;
						}
			}else{
				msg+= "Favor, cadastrar ao menos um apontamento.\n";
				throw msg;
			}		
	}

}




