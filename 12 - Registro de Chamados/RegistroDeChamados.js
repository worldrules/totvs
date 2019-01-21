var loadUsersBySelectedGroup = function(){
	var papelSelecionado = $('#envioPara').val();
		//Deixa os campos vazio para receber as informações dos datasets
		$('#responsavel').empty();
		$('#responsavelFormArea').empty();
		//pega selecao no campo Envio Para
		var papelSelecionado = $('#envioPara').val();
		//Cria um Filtro na coluna workflowRolePK.roleId, seleciona o papelSelecionado
		var c1 = DatasetFactory.createConstraint("workflowRolePK.roleId",papelSelecionado, papelSelecionado, ConstraintType.MUST);
		//Busca o dataset workflowRole com o filtro c1
		var dsColleagueGroup = DatasetFactory.getDataset("workflowRole", null, new Array(c1), null);
		//Pega uma linha
        var rol = dsColleagueGroup.values[0]['workflowRolePK.roleId'];
		//Cria um filtro passando por paramtro a buscar a Rol
        var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", rol, rol, ConstraintType.MUST);
        var ds2 = DatasetFactory.getDataset("workflowColleagueRole", null, new Array(c2), null);
		//For
		for(var i = 0;i< ds2.values.length;i++){
			var ds2Result = ds2.values[i]['workflowColleagueRolePK.colleagueId'];
            var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", ds2Result, ds2Result, ConstraintType.MUST);
			var ds3 = DatasetFactory.getDataset("colleague", null, new Array(c3), null);
			//Cria as options dentro dos campos responsavel e responsavelFormArea
            var resp = $("#responsavel").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'+>"+ds3.values[0].colleagueName+"</option>")
			var respArea = $("#responsavelFormArea").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'+>"+ds3.values[0].colleagueName+"</option>")	
		}
}



$(function(){
	$('#envioPara').change(function(){
		//Deixa os campos vazio para receber as informações dos datasets
		$('#responsavel').empty();
		$('#responsavelFormArea').empty();
		//pega selecao no campo Envio Para
		var papelSelecionado = $('#envioPara').val();
		//Cria um Filtro na coluna workflowRolePK.roleId, seleciona o papelSelecionado
		var c1 = DatasetFactory.createConstraint("workflowRolePK.roleId",papelSelecionado, papelSelecionado, ConstraintType.MUST);
		//Busca o dataset workflowRole com o filtro c1
		var dsColleagueGroup = DatasetFactory.getDataset("workflowRole", null, new Array(c1), null);
		//Pega uma linha
        var rol = dsColleagueGroup.values[0]['workflowRolePK.roleId'];
		//Cria um filtro passando por paramtro a buscar a Rol
        var c2 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", rol, rol, ConstraintType.MUST);
        var ds2 = DatasetFactory.getDataset("workflowColleagueRole", null, new Array(c2), null);
		//For
		for(var i = 0;i< ds2.values.length;i++){
			var ds2Result = ds2.values[i]['workflowColleagueRolePK.colleagueId'];
            var c3 = DatasetFactory.createConstraint("colleaguePK.colleagueId", ds2Result, ds2Result, ConstraintType.MUST);
			var ds3 = DatasetFactory.getDataset("colleague", null, new Array(c3), null);
			//Cria as options dentro dos campos responsavel e responsavelFormArea
            var resp = $("#responsavel").append("<option value='"+ ds3.values[0].colleagueName +"'>"+ds3.values[0].colleagueName+"</option>")
			var respArea = $("#responsavelFormArea").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'>"+ds3.values[0].colleagueName+"</option>");
            if(i == 0){
                $("#matResp").val(ds3.values[0]['colleaguePK.colleagueId']);
            }
		}
	})

	$("#responsavel").on("change",function(){
		var namms = $("#responsavel").val();
		var cc = DatasetFactory.createConstraint("colleagueName", namms, namms, ConstraintType.MUST);
		var dsp = DatasetFactory.getDataset("colleague", null, new Array(cc), null);
		$("#matResp").val(dsp.values[0]['colleaguePK.colleagueId']);
	});
})

function changeDate(){
	$("#prazoChamado").val($("#novoPrazo").val());
}

function hideIt(){
	$("#status").prop("disabled","disabled");
}

function hidePraz(){
	$("#status").on('change',function(){
		if($("#status").val() == "concluido"){
			$("#novoPrazoDiv").hide();
		}else{
			$("#novoPrazoDiv").show();
		}
	});
}






<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">i18n.translate("legend_aval_qual")</h3>
						</div>
						<fieldset class="panel-body">
						<div class="row" id="rowAvaliacao">
							<div class="form-group">
								<label for="nmMatricRespQualidade" class="col-sm-2 control-label">i18n.translate("matri_resp_qual")</label>
								<div class="col-md-3">
									<input type="text" class="form-control" name="nmMatricRespQualidade" id="nmMatricRespQualidade" readonly="true">
								</div>
								<label for="nmRespQualidade" class="col-sm-2 control-label" >i18n.translate("nm_resp_qual")</label>
								<div class="col-md-3">
									<input type="text" class="form-control" name="nmRespQualidade" id="nmRespQualidade" style="margin-left:-100px" readonly="true">
								</div>
							</div>
						</div>
						<div class="form-group">
						<div class="row" style="padding-top:10px">
							<label for="dsObservacoesQualidade" class="col-sm-2 control-label">i18n.translate("obs")</label>
							<div class="col-md-10">
								<textarea id="dsObservacoesQualidade" name="dsObservacoesQualidade" class="form-control" rows="3" cols="8"></textarea>
							</div>
						</div>
						</div>
				</fieldset>
			</div>