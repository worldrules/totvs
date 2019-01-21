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
	//Fazer o novo prazo desaparecer se estiver concluído
	$("#status").change(function(){
		if($("#status").val() !== "novoPrazo") {
			$("#novoPrazoDiv").fadeOut(600);
			setTimeout(function () {
				$("#novoPrazoDiv").hide();	
			}, 600);

			
		} else {
			$("#novoPrazoDiv").fadeIn(600);
			setTimeout(function () {
				$("#novoPrazoDiv").show();	
			}, 600);

		}
	})
	
	
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
            var resp = $("#responsavel").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'+>"+ds3.values[0].colleagueName+"</option>")
			var respArea = $("#responsavelFormArea").append("<option value='"+ ds3.values[0]['colleaguePK.colleagueId'] +"'+>"+ds3.values[0].colleagueName+"</option>")	
		}
	
	})

	
})