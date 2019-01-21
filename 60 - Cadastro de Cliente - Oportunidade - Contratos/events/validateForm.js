//VALIDAÇÃO DO FORMULARIO Cadastro de Cliente - Oportunidade - Contratos//

function validateForm(form){ 
	//form.setShowDisabledFields(true);
	//form.setHidePrintLink(true);
	var nrAtividade = getValue("WKNumState");

//Variaveis com os códigos das atividades	
	var requisitante = 0,
	orcamento = 12,
	analiseComercial = 5,
	vendedor = 15,
	passagemContrato = 7,
	engenharia = 28,
	administradorContrato = 38,
	revisorDocumentacao = 83,
	criarAtividade = 64;
	responsavelTecnico = 40;
	fim1 = 49;
	fim2 = 53;
	fim3 = 71;	
	
	var data = new Date();
	var dia = ('0' + data.getDate()).slice(-2);
	var mes =  ('0' + (data.getMonth() + 1)).slice(-2);
	var ano = data.getFullYear();
	var horario = data.toTimeString().split(' ')[0];
	var dataAberturaProcesso = ano+mes+dia;
	
	if (nrAtividade == 0 || nrAtividade == 4) {	
			var msg = "";

			// if (form.getValue("contatoCadCli") == "" || form.getValue("contatoCadCli") == null) {
				// function myFunction() {
					// alert("Hello! I am an alert box!");
				// }
				
			// }				
			
			/*REQUISITANTE*/
			
			//VALIDAÇÃO CAMPO ZOOM nomeCliente
			if (form.getValue("nomeCliente") == "" || form.getValue("nomeCliente") == null) {
				msg+="O campo Cliente deve ser informado.\n";
			}			
			if (form.getValue("nomeContato") == "Selecione...") {
				msg+="O campo Contato cliente deve ser informado.\n";
			}
			//alterar
//			if(form.getValue("contatoCadEmp") == ""){
//				msg+="O campo Empresa deve ser informado.\n";			
//			}
			if(form.getValue("contatoCadTel") == ""){
				msg+="O campo Telefone deve ser informado.\n";			
			}
			//-----------------------------------------------------------------------------// 
			if(form.getValue("contatoCadEmail") == ""){
				msg+="O campo E-mail deve ser informado.\n";			
			}	
			if(form.getValue("regValorBruto") == ""){
				msg+="O campo Valor bruto deve ser informado.\n";			
			}
			/* if(form.getValue("contatoTecnico") == "Selecione..."){
				msg+=" Selecione uma opção válida em Contato Técnico\n";				
			}
			if(form.getValue("contatoFinanceiro") == "Selecione..."){
				msg+=" Selecione uma opção válida em Contato Financeiro.\n";				
			}
			if(form.getValue("contatoComercial") == "Selecione..."){
				msg+=" Selecione uma opção válida em Contato Comercial.\n";				
			} */
			//-----------------------------------------------------------------------------//
			if(form.getValue("numProlux") != 1 && form.getValue("numProlux") != 2){
				msg+=" Selecione uma opção válida em Número PROLUX.\n";				
			}else if(form.getValue("numProlux") == "Proposta Comercial"){
				if(form.getValue("numProlux2") == ""){
					msg+="O campo Número Proposta deve ser informado.\n";			
				}
			}
			//-----------------------------------------------------------------------------//			
			if(form.getValue("regTipo") == "Selecione..."){
				msg+=" Selecione uma opção válida em Tipo.\n";				
			}
			if((form.getValue("aceiteProposta") == "" || form.getValue("aceiteProposta") == null)  && form.getValue("numProlux") == 1){
				msg+=" Selecione uma opção em Proposta aceita.\n"; 
			}
			if((form.getValue("regVendedor") == "" || form.getValue("regVendedor") == null) && (form.getValue("regOrcamentista") == "" || form.getValue("regOrcamentista") == null) ){
				msg+=" Campo Vendedor e Orçamentista não podem ficar vazios .\n"; 
			}	
			if (form.getValue("numProlux") == 1 && (form.getValue("regOrcamentista") == "" || form.getValue("regOrcamentista") == null)) {
				msg+=" Campo  Orçamentista não pode ficar vazio .\n"; 
			}
			if (form.getValue("numProlux") == 2 && (form.getValue("regVendedor") == "" || form.getValue("regVendedor") == null)) {
				msg+=" Campo  Vendedor não pode ficar vazio .\n"; 
			}
			if(form.getValue("regUF") == "Selecione..."){
				msg+="Selecione uma opção válida em UF.\n"; 
			}
			//-----------------------------------------------------------------------------//
			if(form.getValue("regDtInicial") == ""){
				msg+=" Campo Data inicial não foi preenchido.\n"; 
			}
			if(form.getValue("regDtExpCompra") == ""){
				msg+=" Campo Expectativa compra não foi preenchido.\n"; 
			}
			if(form.getValue("regVendaConv") == "Selecione..."){
				msg+=" Selecione uma opção válida em Venda Convencional.\n";				
			}
			//-----------------------------------------------------------------------------//
			/*if(form.getValue("regStatus") == "Selecione..."){
				msg+=" Selecione uma opção válida em Status.\n";				
			}*/
			if(form.getValue("regDtFollowUp") == ""){
				msg+=" Campo Data para Follow Up não foi preenchido.\n"; 
			}				
			//-----------------------------------------------------------------------------//
			
			//IMPRIME MENSAGEM DE ERRO			
			if(msg != ""){
				throw msg;
			}		
		
	}
	else if (nrAtividade == orcamento) {
		
			var msg = "";
			var dataPrazo = form.getValue("prazoOrc");
			var dia = dataPrazo.split("/")[0];
			var mes = dataPrazo.split("/")[1];
			var ano = dataPrazo.split("/")[2];
			dataPrazo = ano+mes+dia;
			
			/*ORÇAMENTO*/
			if(form.getValue("nomeSolicitante") == ""){
				msg+=" Campo Nome do Responsável  não foi preenchido.\n";
			}
			if(form.getValue("dataSolicitante") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
			if(dataPrazo < dataAberturaProcesso){
				
				msg+=" O prazo informado é menor que a Data atual.\n"; 
			}
					
			if(form.getValue("regStatus") == "Declinada" || form.getValue("regStatus") == "Perdida"){
				msg+=" Esse status não se aplica a esta atividade.\n"; 
			}
			if((form.getValue("regVendedor") == "" || form.getValue("regVendedor") == null) && (form.getValue("regStatus") == "Estimativa" || form.getValue("regStatus") == "ACONC" || form.getValue("regStatus") == "ACOMP") ){
				msg+=" É necessário informar o Vendedor .\n"; 
			}
				if(msg != ""){
					throw msg;
				}
	}
	else if (nrAtividade == analiseComercial) {
			var msg = "";		
			
			/*ANALISE COMERCIAL*/
			if(form.getValue("nomeComercial") == ""){
				msg+=" Campo Nome não foi preenchido.\n"; 
			}
			if(form.getValue("dataComercial") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
									
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == vendedor) {
			var msg = "";
			var dataPrazo = form.getValue("regDtFollowUp");
			var dia = dataPrazo.split("/")[0];
			var mes = dataPrazo.split("/")[1];
			var ano = dataPrazo.split("/")[2];
			dataPrazo = ano+mes+dia;
			
			/*VENDEDOR*/
			//VALIDAÇÃO CAMPO ZOOM nomeCliente
			if (form.getValue("nomeCliente") == "" || form.getValue("nomeCliente") == null) {
				msg+="O campo Cliente deve ser informado.\n";
			}
			//VALIDAÇÃO CAMPO ZOOM nomeContato
			if (form.getValue("nomeContato") == "" || form.getValue("nomeContato") == null) {
				msg+="O campo Contato cliente deve ser informado.\n";
			}
			if(form.getValue("numProlux") == "Selecione..."){
				msg+=" Selecione uma opção válida em Número PROLUX.\n";				
			}
			if(form.getValue("regTipo") == ""){
				msg+=" Selecione uma opção válida em Tipo.\n";				
			}											
			if(form.getValue("regVendedor") == "" || form.getValue("regVendedor") == null){
				msg+=" Campo Vendedor não foi preenchido.\n"; 
			}
			if(dataPrazo < dataAberturaProcesso){
				
				msg+=" O prazo informado é menor que a Data atual.\n"; 
			}
			if(form.getValue("regUF") == ""){
				msg+=" Campo UF não foi preenchido.\n"; 
			}
			if(form.getValue("regDtInicial") == ""){
				msg+=" Campo Data inicial não foi preenchido.\n"; 
			}
			if(form.getValue("regDtExpCompra") == ""){
				msg+=" Campo Expectativa compra não foi preenchido.\n"; 
			}
			if(form.getValue("regStatus") == "Selecione..."){
				msg+=" Selecione uma opção válida em Status.\n";				
			}
			if(form.getValue("regDtFollowUp") == ""){
				msg+=" Campo Data para Follow Up não foi preenchido.\n"; 
			}
			if((form.getValue("regOrcamentista") == "" || form.getValue("regOrcamentista") == null) && (form.getValue("regStatus") == "Vencida" || form.getValue("regStatus") == "ACONC" || form.getValue("regStatus") == "ACOMP") ){
				msg+=" É necessário informar o Orçamentista .\n"; 
			}
			
				
			if(msg != ""){
				throw msg;
			}
			
		
	}
	else if (nrAtividade == passagemContrato) {
		//PASSAGEM CONTRATO
		//alterando
		var msg = "";

		var dataPrazo = form.getValue("prazoPass");
		var dia = dataPrazo.split("/")[0];
		var mes = dataPrazo.split("/")[1];
		var ano = dataPrazo.split("/")[2];
		dataPrazo = ano+mes+dia;

		var msg = "";		
		if(form.getValue("nomeSolicitante2") == ""){
			msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
		}
		if(form.getValue("dataSolicitante2") == ""){
			msg+=" Campo Data não foi preenchido.\n"; 
		}
		if(dataPrazo < dataAberturaProcesso){
			
			msg+=" O prazo informado é menor que a Data atual.\n"; 
		}
		if(msg != ""){
			throw msg;
		}

		
	}
	else if (nrAtividade == engenharia) {
			//ENGENHARIA
			var msg = "";
					
			//VALIDAÇÃO CAMPO ZOOM regAdmin
			if (form.getValue("regAdmin") == "" || form.getValue("regAdmin") == null) {
				msg+="O campo Administrador do Contrato deve ser informado.\n";
			}
			//VALIDAÇÃO CAMPO ZOOM regTecContrato
			if (form.getValue("regTecContrato") == "" || form.getValue("regTecContrato") == null) {
				msg+="O campo Responsável Técnico do Contrato deve ser informado.\n";
			}						
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == administradorContrato) {		
			/*ADMIISTRADOR*/
			var msg = "";			
			
			if(form.getValue("nomeAdmin") == ""){
				msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
			}
			if(form.getValue("dataAdmin") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}
			//VALIDA DOCUMENTAÇÃO
			if(form.getValue("documentacao") == "" || form.getValue("regContrato") == "null"){
				msg+=" Selecione uma opção de Status da Documentação.\n";
			}
			
			//VALIDA VIABILIDADE CONTRATO
			if(form.getValue("regContrato") == "" || form.getValue("regContrato") == "null"){
				msg+=" Selecione uma opção de viabilidade do contrato.\n";
			}			
			if(form.getValue("regContrato") == "nao"){
					if(form.getValue("obsAdmin") == ""){
					msg+=" É necessário justificar a inviabilidade do contrato no campo Comentários.\n"; 
				 }
			}		
			
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == revisorDocumentacao) {		
			/*REVISOR DOCUMENTAÇÃO*/
			var msg = "";
			if(form.getValue("nomeRevisor") == ""){
				msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
			}
			if(form.getValue("dataRevisor") == ""){
				msg+=" Campo Data não foi preenchido.\n"; 
			}			
			if(msg != ""){
				throw msg;
			}
		
	}
	else if (nrAtividade == criarAtividade) {
			/*CRIAR ATIVIDADE*/
			var msg = "";		
		
			var indexes = form.getChildrenIndexes("listaAtividade"); 
			if(indexes.length != 0 ){
			var count = 0 ;
				for (var i = 0; i < indexes.length; i++) {  
					count = i + 1
					if(form.getValue("listaAtv___" + indexes[i]) == "" || form.getValue("listaAtv___" + indexes[i]) == null){
						msg+= " Atividade não informada no registro " +count+ "\n";
					}
					if(form.getValue("horaHomem___" + indexes[i]) == ""){
						msg+= " Campo HH não foi preenchido no registro " +count+ "\n";						
					}						   
				}  
				}else{
					msg+= "Favor informar pelo menos uma atividade.\n";
			}				
	
			var indexesM = form.getChildrenIndexes("listaMaterial"); 
			if(indexesM.length != 0 ){
				var count = 0 ;
				for (var i = 0; i < indexesM.length; i++) {  
					count = i + 1
					if(form.getValue("listaMat___" + indexesM[i]) == "" || form.getValue("listaMat___" + indexesM[i]) == null){
						msg+= "Material não informada no registro " +count+ "\n";
					}								   
				}  
			}else{
					msg+= "Favor informar pelo menos um material.\n";
			}				
				if(msg != ""){
					throw msg;
				}		
	}
	else if (nrAtividade == responsavelTecnico) {
				var msg = "";		
				
				/*RESPONSAVEL TECNICO*/
				if(form.getValue("nomeResponsavelTecnico") == ""){
					msg+=" Campo Nome do Responsável não foi preenchido.\n"; 
				}
				if(form.getValue("dataResponsavelTecnico") == ""){
					msg+=" Campo Data não foi preenchido.\n"; 
				}				
				if(msg != ""){
					throw msg;
				}
			
	}	
		
	


}