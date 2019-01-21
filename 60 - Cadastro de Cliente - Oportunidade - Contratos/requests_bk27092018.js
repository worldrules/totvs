     var criar = function() {
    	
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
		
		_xml.find('companyId').text(parent.WCMAPI.tenantCode);
    	_xml.find('username').text('admin.fluigpoa');
		_xml.find('password').text('1234');
		
		var formFields = ['nomeCadCli','contatoCadCli', 'contatoCadCliTec', 'contatoCadCliFin', 'contatoCadCliCom']
		var cardDataContent = '';
		
		$.each(formFields, function(key, value){
			var gabarito = '<cardData><field>FIELD</field><value>VALUE</value></cardData>'
			var res = gabarito.replace('FIELD', value);
			var id = "."+value;
			console.log(key);
			console.log(value);
			res = res.replace('VALUE', $(String(id)).eq(1).val());
			
			cardDataContent += res;
		})
		
		_xml.find('item').append(cardDataContent)
		_xml.find('parentDocumentId').text(482); 
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
	    $('#modal').modal('hide');

    }