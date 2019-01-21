function validateForm(form){
	if(form.getValue("nomeCadCli2") == "" || form.getValue("nomeCadCli2") == null) {
		throw "O campo Nome do Cliente é obrigatório";
	}
	
	//alterando
	
	
	
		
	
	//alterando
	    	
	    	
	    	
	var msg = "";
	var indexes = form.getChildrenIndexes("listaAtividade"); 			
				if(indexes.length != 0 ){				
					var count = 0 ;					
						for (var i = 0; i < indexes.length; i++) {
							count = i + 1;	
							if(form.getValue("contatoCadCli___" + indexes[i]) == "" || form.getValue("contatoCadCli___" + indexes[i]) == null ){
								msg+= " O campo CONTATO DO CLIENTE deve ser informado no registro " +count+ "\n";					
							}
							if(form.getValue("contatoCadEmp___" + indexes[i]) == "" || form.getValue("contatoCadEmp___" + indexes[i]) == null ){
								msg+= " O campo EMPRESA deve ser informado no registro " +count+ "\n";					
							}
							if(form.getValue("contatoCadTel___" + indexes[i]) == "" || form.getValue("contatoCadTel___" + indexes[i]) == null ){
								msg+= " O campo TELEFONE deve ser informado no registro " +count+ "\n";					
							}
							if(form.getValue("contatoCadEmail___" + indexes[i]) == "" || form.getValue("contatoCadEmail___" + indexes[i]) == null ){
								msg+= " O campo E-MAIL deve ser informado no registro " +count+ "\n";					
							}																		
						} 
							
				}else{
					msg+= " É necessário adicionar os campos";
				}			
			if(msg != ""){
				throw msg;
			}
	
}