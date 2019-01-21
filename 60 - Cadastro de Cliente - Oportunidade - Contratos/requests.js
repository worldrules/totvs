  
	var criar = function() {
		
		
		nome = document.querySelector("#nomeCadCli");
		nome = nome.value;
		console.log(nome);
		
		cliente = document.querySelector("#contatoCadCli");
		cliente = cliente.value;
		console.log(cliente);
		
		tecnico = document.querySelector("#contatoCadCliTec");
		tecnico = tecnico.value;
		console.log(tecnico);
		
		financeiro = document.querySelector("#contatoCadCliFin");
		financeiro = financeiro.value;
		console.log(financeiro);
		
		comercial = document.querySelector("#contatoCadCliCom");
		comercial = comercial.value;
		console.log(comercial);
				
		if(nome == "" || cliente == "" || tecnico == "" || financeiro == "" || comercial == ""){
		
			FLUIGC.toast({
							title:'Atenção!</br>',
							message:'Todos os campos são de preenchimento obrigatório',
							type:'warning'
							
								
						});
			console.log(nome);
			console.log(cliente);
			console.log(tecnico);
			console.log(financeiro);
			console.log(comercial);		
		}else{			
			$.ajax({  
				url: 'ECMCardServiceCreate.xml',
				async: false,
				type: 'GET',
				datatype:'xml',
				success: function(xml){
					_xml = $(xml)
				},
				fail: function(error){
					console.log(error)
				}
			})
			//LOCAL
			_xml.find('companyId').text(parent.WCMAPI.tenantCode);
			_xml.find('username').text('admin.fluigpoa');
			_xml.find('password').text('1234');
			
			//SERVIDOR
			/* _xml.find('companyId').text(parent.WCMAPI.tenantCode);
			_xml.find('username').text('fluig@proluxengenharia.com.br');
			_xml.find('password').text('Prolux2@18'); */
			
			
			nome = document.querySelector("#nomeCadCli");
			nome = nome.value;
			//console.log(nome);
			
			cliente = document.querySelector("#contatoCadCli");
			cliente = cliente.value;
			//console.log(cliente);
			
			tecnico = document.querySelector("#contatoCadCliTec");
			tecnico = tecnico.value;
			//console.log(tecnico);
			
			financeiro = document.querySelector("#contatoCadCliFin");
			financeiro = financeiro.value;
			//console.log(financeiro);
			
			comercial = document.querySelector("#contatoCadCliCom");
			comercial = comercial.value;
			//console.log(comercial);
			
			var formFields2 = ['nomeCadCli','contatoCadCli', 'contatoCadCliTec', 'contatoCadCliFin', 'contatoCadCliCom']
			var formFields = [nome,cliente,tecnico, financeiro, comercial]
			
			var cardDataContent = '';
			
			$.each(formFields2, function(key, value){
				//SETA VALOR DO CAMPO FIELD
				var gabarito = '<cardData><field>FIELD</field><value>VALUE</value></cardData>'
				var res = gabarito.replace('FIELD', value);
				var id = "#"+value+"Field";
				var controle = key;
				///////////////////////////
							
				//SETA VALOR DO CAMPO VALUE
				if(controle<5){		
					var valor = formFields[controle];	
					res = res.replace('VALUE', valor);
					console.log(res);			
					controle++;
				}
				//////////////////////////
				
				console.log(key);
				console.log(controle);
				console.log(value);
				cardDataContent += res;		
			})
			
			
			_xml.find('item').append(cardDataContent)
			//SERVER LOCAL
			_xml.find('parentDocumentId').text(482);
			//SERVER CLIENTE
			//_xml.find('parentDocumentId').text(57); 
			_xml.find('colleagueId').text(parent.WCMAPI.getUserCode());
			
			
			parent.WCMAPI.Create({
				url : "/webdesk/ECMCardService?wsdl",
				contentType : "text/xml",
				dataType : "xml",
				data : _xml[0],
				success : function(data) {
					FLUIGC.toast({
						title:'Sucesso!</br>',
						message:'Registro efetivado',
						type:'success'							
					});
				},
				fail: function(data){
					console.log('Error', data)
				}
				
				
			})				
				//LIMPA OS CAMPOS APOS O ENVIO
				$('#form2').trigger("reset");
				
				//RECOLHE A DIV DO FORMULARIO APOS 2 SEGUNDOS DO ENVIO				
				setTimeout(function(){
				$(".collapse").collapse('hide');
				},2000); 
				
		}
	
	
	}	
	
	
	
	
	