


function validaNovoCliente(){
	
	//var nome = form.getValue("nomeCadCli").value;
	//var nome =  document.getElementById("nomeCadCli").value;
	//var contato =  document.getElementById("contatoCadCli___1").value;
	var linhas = row;
	//console.log(nome);
	console.log(linhas);	
	//var teste = "TESTANDO TOAST COM VARIAVEL";
	/* FLUIGC.toast({
								title:'Atenção!</br>',
								message:linhas,
								type:'warning'
								
									
							}); */
					
		
		
		var msg = "";
		//var indexes = form.getChildrenIndexes("listaAtividade2");
		if(linhas != 0 ){				
				var count = 0 ;	
				for (var i = 0; i < linhas; i++) {
					count = i + 1;
					if(document.getElementById("contatoCadCli___"+count).value == ""){
						msg+= "O campo Contato do Cliente deve ser informado no registro " + count +"</br>";
					}
					/* if(contato == "" || contato == null){
						msg+= "O campo Contato do Cliente deve ser informado no registro " + count +"</br>";						
					} */
				}
				FLUIGC.toast({
							title:'Atenção!</br>',
							message:msg+' - '+linhas,
							type:'warning'
							
								
						});
		}		

		 //var msg = "";

		//if(form.getValue("nomeCadCli") == ""){
				//msg+=" Campo Nome do Cliente não foi preenchido.\n"; 
		//}

		
		//var indexes = form.getChildrenIndexes("listaAtividade2"); 			
			/* if(linhas != 0 ){				
				var count = 0 ;					
					for (var i = 0; i < linhas; i++) {
						count = i + 1;	
						
						if(document.getElementById("nomeCadCli___"+ linhas[i]).value == "" || document.getElementById("nomeCadCli___"+ linhas[i]).value == null){
							FLUIGC.toast({
								title:'Atenção!</br>',
								message:'teste',
								type:'warning'
								
									
							});
						} */
						//if(form.getValue("contatoCadCli___" + linhas[i]) == "" || form.getValue("contatoCadCli___" + linhas[i]) == null ){
							//msg+= "O campo Contato do Cliente deve ser informado no registro " + count +"\n";					
						//}
						/* if(form.getValue("contatoCadEmp___" + linhas[i]) == "" || form.getValue("contatoCadEmp___" + linhas[i]) == null ){
							msg+= "O campo Empresa deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("contatoCadTel___" + linhas[i]) == "" || form.getValue("contatoCadTel___" + linhas[i]) == null ){
							msg+= "O campo Telefone deve ser informado no registro " + count +"\n";					
						}
						if(form.getValue("contatoCadEmail___" + linhas[i]) == "" || form.getValue("contatoCadEmail___" + linhas[i]) == null ){
							msg+= "O campo E-mail deve ser informado no registro " + count +"\n";					
						}	 */																
					//} 
						
			/* else{
				msg+= "Favor, cadastrar ao menos um registro.\n";
				
				FLUIGC.toast({
					title:'Atenção!</br>',
					message:msg,
					type:'warning'
					
						
				});				
				
			} */ 
	
	
	
	
	
	
}