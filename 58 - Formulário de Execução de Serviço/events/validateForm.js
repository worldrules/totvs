function validateForm(form){ 

	//form.setShowDisabledFields(true);
	//form.setHidePrintLink(true);
	var nrAtividade = getValue("WKNumState");


//Variaveis com os códigos das atividades
	
	var requisitante = 0,
	documentacaoTecnica = 8,
	documentacaoTrabalho = 6,
	delegarExecutor = 11,
	executarServico = 16,
	receberRelatorio = 20,
	avaliarAtendimento = 44,
	faturar = 30;	
	
	
	if (nrAtividade == 0 || nrAtividade == 3) {	
			var msg = "";		
			
			/*REQUISITANTE*/
			if(form.getValue("nomeRequisitante") == ""){
				msg+=" Campo Nome do Requisitante não foi preenchido.\n";				
			}
			if(form.getValue("dataSolRequisitante") == ""){
				msg+=" Campo Data da Solicitação não foi preenchido.\n"; 
			}
			if(form.getValue("statusRequisitante") == ""){
				msg+=" Campo Status não foi preenchido.\n"; 
			}			
			//VALIDAÇÃO CAMPO ZOOM CLIENTE
			if (form.getValue("cliente") == "" || form.getValue("cliente") == null) {
				msg+="O campo Cliente deve ser informado.\n";
			}			
			if(form.getValue("contato") == ""){
				msg+=" Campo Contato não foi preenchido.\n"; 
			}
			//VALIDAÇÃO CAMPO ZOOM CENTRO DE CUSTO
			if (form.getValue("centroDeCusto") == "" || form.getValue("centroDeCusto") == null) {
				msg+="O campo Centro de custo deve ser informado.\n";
			}			
			if(form.getValue("atividade") == ""){
				msg+=" Campo Atividade não foi preenchido.\n"; 
			}
			if(form.getValue("dataExecucao") == ""){
				msg+=" Campo Data da Execução não foi preenchido.\n"; 
			}
			if(form.getValue("docTrabalho") !="true" && form.getValue("docTecnico") !="true"){
				msg+=" Selecione ao menos uma opção de documentação.\n"; 
			}
			//VALIDAÇÃO CAMPO ZOOM RESPONSÁVEL AO MARCAR O CHECKBOX
			if(form.getValue("docTecnico") =="true") {				
				if (form.getValue("responsavel") == "" || form.getValue("responsavel") == null) {
						msg+="O campo Documentação técnica deve ser informado.\n";
				}
			}
			
			//VALIDAÇÃO CAMPO ZOOM TÉCNICO AO MARCAR O CHECKBOX
			if(form.getValue("docTrabalho") =="true") {	
				var indexes = form.getChildrenIndexes("tbOrcamento"); 
				if(indexes.length != 0 ){
						   var count = 0 ;
							   for (var i = 0; i < indexes.length; i++) {  
										   count = i + 1
								   if(form.getValue("login___" + indexes[i]) == ""){
									   msg+= "Técnico não informado na linha: " + count ;
								   }
								   // if(form.getValue("quantidadeitem___" + indexes[i]) == ""){
										  // throw "Quantidade não informada na linha: " + count ;
								   // } 
							   }  
				}else{
						   msg+= "Favor informar pelo menos um técnico.";
				}			
			}			
			
			//msg+=nrAtividade;
				
			if(msg != ""){
				throw msg;
			}	
		
		
	}
	else if (nrAtividade == documentacaoTecnica) {
			var msg = "";		
			
			/*DOCUMENTAÇÃO TÉCNICA*/
			if(form.getValue("nomeResponsavel") == ""){
				msg+=" Campo Nome do Responsável Técnico não foi preenchido.\n"; 
			}
			if(form.getValue("dataResponsavel") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}	
			if (form.getValue("docOK") != "ok") {
				msg+=" CheckBox Documentos não foi checado .\n";
			}
			if(msg != ""){
				throw msg;
			}		
	}
	else if (nrAtividade == documentacaoTrabalho) {
			var msg = "";
			//var DocsOk = true;
			var contT = 0;
			/*DOCUMENTAÇÃO DE TRABALHO*/
			if(form.getValue("nomeDptoPessoal") == ""){
				msg+=" Campo Nome não foi preenchido.\n"; 
			}
			if(form.getValue("dataDptoPessoal") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
			if(form.getValue("statusDptoPessoal") == ""){
				msg+=" Campo Status não foi preenchido.\n"; 
			}	
			var indexes = form.getChildrenIndexes("tbOrcamento");
		       
		       for (var i = 0; i < indexes.length; i++) {		    
		        	   
		        	if(form.getValue("docTrabOK___"+indexes[i]) == "no"){
		        	  // DocsOk = false;
		        		contT = contT + 1
		           }                                
		       }
		    if(contT > 0){
		    	
		    	msg+=" É preciso validar todos os documentos, "+contT +" não foram selecionadas.\n";
		    }
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == delegarExecutor) {
			var msg = "";		
			
			/*DELEGAR EXECUTOR*/
			if(form.getValue("nomeRespTecnicoExecutor") == ""){
				msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
			}
			if(form.getValue("dataRespTecnicoExecutor") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}			
			//VALIDAÇÃO CAMPO ZOOM Executor
			if (form.getValue("executor") == "" || form.getValue("executor") == null) {
				msg+="\n Campo Delegar Executor não foi preenchido.\n";
			}
				
			if(msg != ""){
				throw msg;
			}
			
		
	}
	else if (nrAtividade == executarServico) {
			/*
			var msg = "";		
			
			REQUISITANTE
			if(form.getValue("nomeRespTecnicoExecutor") == ""){
				msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
			}
			if(form.getValue("dataRespTecnicoExecutor") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
			if(form.getValue("executor") == ""){
				msg+=" Campo Delegar Executor não foi preenchido.\n"; 
			}						
			if(msg != ""){
				throw msg;
			}*/
		
	}
	else if (nrAtividade == receberRelatorio) {
			
		
	}
	else if (nrAtividade == avaliarAtendimento) {
			var msg = "";		
			
			/*REQUISITANTE*/
			if(form.getValue("faturar") == ""){
				msg+=" Selecione uma opção de faturamento.\n"; 
			}									
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == faturar) {
		
			var msg = "";		
			
			/*FATURAR*/
			if(form.getValue("nomeDptoFinanceiro") == ""){
				msg+=" Campo Nome não foi preenchido.\n"; 
			}
			if(form.getValue("dataDptoFinanceiro") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
			if(form.getValue("statusDptoFinanceiro") == ""){
				msg+=" Campo Status não foi preenchido.\n"; 
			}						
			if(msg != ""){
				throw msg;
			}
		
	}	
		
	


}




