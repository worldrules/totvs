	
	
	function addTask() { 
			row = wdkAddChild('listaAtividade');
			$('#funcionario___'+row).val($('#nomeSolicitante').val())
	}
	function setSelectedZoomItem(selectedItem) {			
		var count = 0 ;
		for (var i = 0; i < 99; i++) {  
			count = i + 1			
			if (selectedItem.inputName == "cc___"+ i) {
				var valor = document.getElementById("cc___"+ i).value;	
				
				////////////////////////// SETA O DATASET A SER CONSULTADO (EX: dsTesteCliente) E PASSA OS VALORES PARA UM VETOR (ARRAY) /////////////////////////			
				//CRIA ARRAYS PARA RECEBER OS REGISTROS DO DATASET
				var cc_centroCusto = []; 
				var cc_atividade = [];
				var cc_horaHomem = [];
				
				//CONSULTA O DATASET
				var datasetReturned = DatasetFactory.getDataset("dsCentroCusto", null, null, null);   
				var records = datasetReturned.values;				
				for ( var index in records) {					
					var record = records[index];				
					// PEGA OS VALORES DOS CAMPOS DO DATASET
					var valorCC = record.centroCusto;
					var valorAtividade = record.Atividade;
					var valorHH = record.horaHomem;
					//COMPARA O VALOR DO REGISTRO ATUAL DO DATASET COM O VALOR DO REGISTRO SELECIONADO NO CAMPO ZOOM (cc)
					if(valor == valorCC){						
						cc_centroCusto.push(valorCC);
						cc_atividade.push(valorAtividade);
						window.atividadeValorHH = []
						window.atividadeValorHH[valorAtividade] = valorHH
						cc_horaHomem.push(valorHH);						
					}
					
				}		
					//console.log("Atividades: "+cc_atividade);
					//ADICIONA OS OPTIONS DO CAMPO atividade, APROVEITANDO O ARRAY CRIADO COM O DATASET
					$.each(cc_atividade, function(id, valor) {
						$('#atividade___'+ i).append($("<option></option>").attr("value", cc_atividade[id]).text(cc_atividade[id]));
					});	
					
					$('#horaHomem___'+ i).val(cc_horaHomem[0])
					
					
					$("select[name^=atividade]").change(function(){
						var _self = $(this).val()
						var fieldId = ($(this).attr('id').match(/_\d+/i))[0].replace('_','')
						preencherCampos(window.atividadeValorHH[_self], fieldId)
					})
					
			}
		}
	}
		
	
	// REMOVE OS VALORES DOS CAMPOS PREENCHIDOS AUTOMATICAMENTE PELO ZOOM (nomeContato) 
	function removedZoomItem(removedItem) {
		var count = 0 ;
		for (var i = 0; i < 99; i++) {  
			count = i + 1
			console.log("I: "+ i);
			console.log("INDEX: "+ i);
			if (removedItem.inputName == "cc___"+i) {		
				
				/* Remove as opções do select, deixando somente a primeira opção */	
				//$('#contatoComercial').children('option:not(:first)').remove();		
				
				/* Remove todas as opções do select */
				$('#atividade___'+i).children('option').remove();		
				//remove os valores inseridos nos inputs
				//document.getElementById("contatoCadEmp").value = "";
				//document.getElementById("contatoCadTel").value = "";
				//document.getElementById("contatoCadEmail").value = "";		
			}
		}
	}
	
	
	
	
	$(document).ready(function(){
		$('.dateFormat').mask('00/00/0000');
		$('.dataHoraFormat').mask('00/00/0000-00:00');
		$('.horaFormat').mask('00:00');
		
		
		if($('#dataInicio').val() == "")
			$('#dataInicio').val((new Date()).toLocaleString('pt-BR'))
		
	})
	
    function preencherCampos(valor, fieldId){
		$('#horaHomem___'+fieldId).val(valor)
		
	}
	
	function calcula(teste){
		console.log(teste);
		teste2 = teste.name;
		teste3 = teste.id;
		
		var horaI = $("#"+teste2).parent().parent().children().children()[5].value
		var horaF = $("#"+teste2).parent().parent().children().children()[6].value
		var horaD = $("#"+teste2).parent().parent().children().children()[7].id	
		
		if(horaI != "" && horaF !=""){					
				var start = horaI;
				var end = horaF;
		//////////////////////////////////////////////			
			
			//var horaI =$(".calculaTempo").parent().parent().children().children()[3].id
			//var horaF =$(".calculaTempo").parent().parent().children().children()[4].id
			
			//horaI = horaI.value;
			//horaF = horaF.value;
			console.log("if: valores do campo : "+teste2);
			console.log("if: Id do registro : "+teste3);
			console.log("if: HORA INICIAL: "+horaI);
			console.log("if: HORA FINAL: "+horaF);
			//console.log("HORA FINAL: "+horaF);
			//var test = this.name;
			//console.log("valor atual: "+teste2);

			s = start.split(':');
			e = end.split(':');		
			
				
			if(s == "" || e == "" ){
				FLUIGC.toast({
					title:'Atenção!</br>',
					message:'É necessário preencher os campos Início e Fim',
					type:'warning'					
				});	
			//TRATA HORA INICIO	
			}else if(s[0]>23 || s[0]<00 || s[1]>59 || s[1]<00){
				FLUIGC.toast({
						title:'Atenção!</br>',
						message:'Hora inválida',
						type:'danger'
				});	
				
			//TRATA HORA FIM	
			}else if(e[0]>23 || e[0]<00 || e[1]>59 || e[1]<00){
				FLUIGC.toast({
							title:'Atenção!</br>',
							message:'Hora de fim inválida',
							type:'danger'
					});	
			}
			else{			
					if(s > e){
						FLUIGC.toast({
							title:'Atenção!</br>',
							message:'O horário de Início deve ser menor que o de Fim',
							type:'warning'					
						});
					}else if(start == end){
						FLUIGC.toast({
							title:'Atenção!</br>',
							message:'O horário de Início deve ser diferente do horário de Fim',
							type:'warning'						
						});
						
					}else{

						min = e[1]-s[1];
						hour_carry = 0;
						if(min < 0){
							min += 60;
							hour_carry += 1;
						}

						hour = e[0]-s[0]-hour_carry;
						diff = hour + ":" + min;					
						
						//alert(diff);
						
						//if (selectedItem.inputName == "tempoAtividade") {
						horaFinal = completaZeroEsquerda(hour) + ":" + completaZeroEsquerda(min); 
						document.getElementById(horaD).value = horaFinal;	
						console.log("if: DIFERENÇA ID: "+horaD);
												
						//document.getElementById("tempoAtividade___"+ newId).value = diff;
						//alert( "hora inicial: ."+start+"- hora final: "+end ); 
						//console.log(s);
						//console.log(e);
						FLUIGC.toast({
							title:'Sucesso!</br>',
							message:'Seu apontamento foi atualizado!',
							type:'success'					
						});
						
						function completaZeroEsquerda( numero ){
							return ( numero < 10 ? "0" + numero : numero);
						}
						
					}
			}
			
		
		/////////////////////////////////////////////




			
		}else{
			
			/////////////////////////////////////		
		
		console.log("valores do campo : "+teste2);
		console.log("Id do registro : "+teste3);
		console.log("HORA INICIAL: "+horaI);
		console.log("HORA FINAL: "+horaF);
		
		//var test = this.name;
		//console.log("valor atual: "+teste2);	
		
		
		var start = document.getElementById("horaInicio___"+ newId).value;
		var end = document.getElementById("horaFim___"+ newId).value;

		s = start.split(':');
		e = end.split(':');		
			
		if(s == "" || e == "" ){		
				FLUIGC.toast({
					title:'Atenção!</br>',
					message:'É necessário preencher os campos Início e Fim',
					type:'warning'					
				});	
		//TRATA HORA INICIO	
		}else if(s[0]>23 || s[0]<00 || s[1]>59 || s[1]<00){
				FLUIGC.toast({
						title:'Atenção!</br>',
						message:'Hora inválida',
						type:'danger'
				});	
				
			//TRATA HORA FIM
			}else if(e[0]>23 || e[0]<00 || e[1]>59 || e[1]<00){
				FLUIGC.toast({
							title:'Atenção!</br>',
							message:'Hora de fim inválida',
							type:'danger'
					});	
			}else{			
				if(s > e){
					FLUIGC.toast({
						title:'Atenção!</br>',
						message:'O horário de Início deve ser menor que o de Fim',
						type:'warning'					
					});
				}else if(start == end){
					FLUIGC.toast({
						title:'Atenção!</br>',
						message:'O horário de Início deve ser diferente do horário de Fim',
						type:'warning'						
					});
					
				}else{

					min = e[1]-s[1];
					hour_carry = 0;
					if(min < 0){
						min += 60;
						hour_carry += 1;
					}
					hour = e[0]-s[0]-hour_carry;
					diff = hour + ":" + min;				
					

					//alert(diff);
					
					//if (selectedItem.inputName == "tempoAtividade") {
					horaFinal = completaZeroEsquerda(hour) + ":" + completaZeroEsquerda(min); 
					document.getElementById("tempoAtividade___"+ newId).value = horaFinal;	
					console.log("DIFERENÇA: "+horaD);		

					
					//document.getElementById("tempoAtividade___"+ newId).value = diff;
					//alert( "hora inicial: ."+start+"- hora final: "+end ); 
					//console.log(s);
					//console.log(e);
					FLUIGC.toast({
						title:'RODOU!</br>',
						message:'O CODIGO ESTA RODANDO',
						type:'success'					
					});
					
					function completaZeroEsquerda( numero ){
						return ( numero < 10 ? "0" + numero : numero);
					}
					
				}
		}			
					
			
		}
		
	}
		
		
		
		function fnCustomDelete(oElement){ 
			// Chamada a funcao padrao, NAO RETIRAR    
			fnWdkRemoveChild(oElement);
			totalizaValor(); 
		}	