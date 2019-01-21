     $("enviar").click(function(){
		 
		 
    	 	 
    	
    	 
    	 
    	 
    	  //var dataset = DatasetFactory.getDataset("dsNovoCliente", null, null, null);
    	 
	
	 
	 var criar = function() {
    	
    	$.ajax({
			url: 'xml/ECMCardService_create.xml',
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
		
		_xml.find('companyId').text(WCMAPI.tenantCode);
    	_xml.find('username').text('admin.fluigpoa');
		_xml.find('password').text('1234');
		
		var formFields = ['nomeCadCli','contatoCadCli', 'contatoCadCliTec', 'contatoCadCliFin', 'contatoCadCliCom']
		var cardDataContent = '';
		
		$.each(formFields, function(key, value){
			var gabarito = '<cardData><field>FIELD</field><value>VALUE</value></cardData>'
			var res = gabarito.replace('FIELD', value);
			var id = "#"+value+"Field";
			res = res.replace('VALUE', $(id).val());
			
			cardDataContent += res;
		})
		
		_xml.find('item').append(cardDataContent)
		_xml.find('parentDocumentId').text(482); 
		_xml.find('colleagueId').text(WCMAPI.getUserCode());
		
		
		WCMAPI.Create({
			url : "/webdesk/ECMCardService?wsdl",
			contentType : "text/xml",
			dataType : "xml",
			data : _xml[0],
			success : function(data) {
				FLUIGC.toast({
					title:'Aviso',
					message:'Registro Feito',
					type:'success'
						
				});
	        },
	        fail: function(data){
	        	console.log('Error', data)
	        }
	    })
	    $('#modal').modal('hide');

    }
	 });