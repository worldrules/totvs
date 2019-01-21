function beforeProcessing(form){
	
	var valCli = document.getElementById("nomeCliente").value;
	var valCon = document.getElementById("nomeContato").value;
		if(valCli != "" && valCon == "" ){
			FLUIGC.toast({
					title:'Atenção!</br>',
					message:'campos recarregados: '+valCli+" - "+valCon,
					type:'warning'
					
						
				});
		}else{
			FLUIGC.toast({
				title:'Atenção!</br>',
				message:'não recarregou',
				type:'warning'
				
					
			});
			
		}
	
}