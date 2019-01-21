
$(document).ready(function() {
	setTimeout(function() {
		mpcsa.start();
	}, 100)
	
	
	console.log(parent.WCMAPI)
	$('#solicitante').val(parent.WCMAPI.user)
	$('#solicitanteId').val(parent.WCMAPI.userCode)
	setDateNow(new Date());
	
	
});

var setDateNow = function(datetime){
	var retorno = datetime.getDate()+'/';
	retorno += datetime.getMonth()+'/';
	retorno += datetime.getFullYear()+' ';
	retorno += datetime.getHours()+':';
	retorno += datetime.getMinutes();
	$('#dataSolicitacao').val(new Date().toLocaleDateString('pt-BR'));
}

//addTask('gestoresConsultores', item.colleagueName, item.colleagueId)


//** funcao de apoio para funcoes de calculo e index
var mpcsa = (function() {
	var today = new Date();
	var current = null;
	var loading = FLUIGC.loading(window);
	var index = 0;
	
	return {
		start : function() {//inicia processo
			
			events.setup();

		},

	}
})();

var events = (function() {
	var cliente = "";
	return {
		setup : function() {
			$(document).on("click", ".zoom-click", function() {
				//alert("entrouuuuuuuuu");
				//var ev =  comp;
				
				var ev = $(this).data("event");
				//if( ev == 'projeto'){
				//mpcsa.index = validafunctions.getPosicaoFilho($(this).attr("id"));
				//}
				zooms(ev);
				Remove(ev);
			});
		}
	}
})(); 


function setZoomData(instance, value){ 
	window[instance].setValue(value); 
} 


function zooms(ev){
	console.log(ev)
	if(ev == 'LiderAprovacao'){
		modalzoom.open("colleague", "colleagueName,Nome,mail,Email", "userTenantId,colleagueId,colleagueName,mail", "Lider de Aprovação",'' , 'LiderAprovacao' , "" , "", "" );
	}
	
}

function Remove(ev){
	if (ev == 'RemoveLiderAprovacao' ){
		document.getElementById('liderAprovacao').value=''; // Limpa o campo
		document.getElementById('liderAprovacaoId').value=''; // Limpa o campo
	}
}


	var modalzoom = (function(){
		var zoommodal = null;
		var loading = FLUIGC.loading(window);
		return {
			open: function(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
				
				loading.show();
				
				var showfields = [];
				var globaldataset = [];
				var current = 0;
				var tipo = type ;
			
				if (zoommodal != null) {
					zoommodal.remove();
					zoommodal = null;
					
					$(".table-zoom > thead").html("");
					$(".table-zoom > tbody").html("");
				}
				
				var html = "<body class='fluig-style-guide'>" +
				"<div class='input-group'>" +
				"<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>" +
				"<input type='text' class='form-control' id='search' placeholder='Digite o texto e utilize o <Enter> para buscar'>" +
				"</div>" +
				"<div class='table-responsive' style='overflow: auto; height: 220px;'>" +
				"<table class='table table-hover table-zoom'>" +
				"<thead>" +
				"</thead>" +
				"<tbody>" +
				"</tbody>" +
				"</table>" +
				"</div>" +
				"</body>";
			
				var zoommodal = FLUIGC.modal({
					title: title,
					content: html,
					formModal: false,
					size: "full",
					id: 'modal-zoom-' + type,
					actions: [{
						'label': 'Selecionar',
						'classType': 'btn-primary zoom-selected',
						'autoClose': true,
					},{
						'label': 'Fechar',
						'autoClose': true
					}]
			},function(err, data) {
				
				if(err) {
					FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
				} else {
					var trimarray = function (fields) {
						for(var i=0; i < fields.length; i++){
							fields[i] = fields[i].trim();
						}
						return fields;
					}
					
					var urlrequest = function(){
						var request = "/ecm/api/rest/ecm/dataset/",
						json = {};

						if (dataset != null) {
							request += "getDatasetZoom";
							json.datasetId = dataset;
						} else if(cardDatasetId != null){
							request += "getCardDatasetValues";
							json.cardDatasetId = cardDatasetId;
						}

						if (resultfields != null && resultfields.length > 0 ){
							json.resultFields = trimarray(resultfields.split(","));
						}

						if (filters != null && filters.length > 0 ){
							json.filterFields = trimarray(filters.split(","));
						}

						if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0 ){
							json.likeField = likefield;
							json.likeValue = likevalue;
						}

						var searchValue = $("#search").val();
						if(searchValue && searchValue.length > 0) {
							json.searchValue = searchValue;

							if (searchby && searchby != "") {
								json.searchField = searchby;
							} else {
								json.searchField = fields.split(",")[0];
							}

						}

						return request +="?json=" + encodeURI(JSON.stringify(json));
					};
					
					var searchtable = function (text) {
						var table = $('.table-zoom > tbody');
						table.find('tr').each(function(index, row) {
							var allCells = $(row).find('td');
							if(allCells.length > 0) {
								var found = false;
								allCells.each(function(index, td) {
									var regExp = new RegExp(text, 'i');
									if(regExp.test($(td).text())) {
										found = true;
										return false;
									}
								});
								if(found == true)$(row).show();else $(row).hide();
							}
						});
					}
					
					var setup = function(lista) {
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=0; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i] + "</th>"
							i++;
						}
						html += "</tr>";
						$(".table-zoom > thead").append(html);
					}
					
					var rebuildThead = function(lista){
						var l = lista.split(",");
						var html = "<tr>";
						for (var i=1; i<l.length; i++) {
							showfields.push(l[i]);
							html += "<th>" + l[i] + "</th>"
							i++;
						}
						html += "</tr>";
						$(".table-zoom > thead").html(html);
					}
					
					var setSelectedZoomItem = function(item){
						console.log('aqui é o negocio', item)
						if(item.type == 'LiderAprovacao'){
							console.log('entrou aqui', item.colleagueName)
							$("#liderAprovacao").val(item.colleagueName);
							$("#liderAprovacaoId").val(item.colleagueId);
						}
					}
					
					var readydataset = function(dataset) {
						globaldataset = dataset;
						for (var i=0; i<dataset.length; i++) {
							var row = dataset[i];
							
							var html = "<tr data-dataset=" + i + ">";
							for (var x=0; x < showfields.length; x++) {
								html += "<td>" + row[showfields[x]] + "</td>";
							}
							html += "</tr>";
							$(".table-zoom > tbody").append(html);
						}
						$(".table-zoom > tbody > tr").click(function() {
							$(".table-zoom > tbody > tr").removeClass("active");
							$(this).addClass("active");
							current = $(this).data("dataset");
						});
						$(".table-zoom > tbody > tr").dblclick(function() {
							var row = globaldataset[$(this).data("dataset")];
							row["type"] = type;
							setSelectedZoomItem(row);
							zoommodal.remove();
						});

						loading.hide();
					}

					var dosearch = function(fields) {
						var url = urlrequest();
						$(".table-zoom > tbody").html("");

				 		//loading.show();
				 		
				 		$.ajax({
				 			type: "GET",
				 			dataType: "json",
				 			url: url,
				 			data: "",
				 			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 				console.log("dataset error", XMLHttpRequest, textStatus, errorThrown)
				 			},
				 			success: function (data, status, xhr) {
				 				var dataset = data["invdata"];
				 				readydataset(dataset);
				 				rebuildThead(fields);
				 			}
				 		});
				 		
				 		
				 	}

				 	var timeout;
				 	$('#search').keyup(function() {
				 		clearTimeout(timeout);
				 		var keycode;
				 		if (window.event) {
				 			keycode = window.event.keyCode;
				 		} else if (event) {
				 			keycode = event.which;
				 		} else { 
				 			return true;
				 		}
				 		if (keycode == 13) {
				 			dosearch();
				 		} else {
				 			timeout = setTimeout(searchtable($(this).val()), 1000);
				 		}			 			
				 	});		 		

				 	$('.zoom-selected').click(function() {
				 		var row = globaldataset[current];
				 		row["type"] = type;
				 		
				 		setSelectedZoomItem(row);
				 	});

				 	setup(fields);
				 	dosearch(fields);
				 	
				 	
				 }
				});

}
}
})();

function modal(html) {
	var myModal = FLUIGC.modal({
		title: 'Preenchimento de Campo',
		content: html,
		id: 'fluig-modal',
      //  size: 'small',
      actions: [{
      	'label': 'OK',
      	'autoClose': true
      }]
  }, function(err, data) {
  	if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });
}

