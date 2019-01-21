var loadUsersBySelectedGroup = function(){
	var grupoSelecionado = $('#envioPara').val();
	
	$('.responsavelFormAreaOption').each(function(){
		$(this).remove();
	})
	
	var usersByGroup = [];
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupoSelecionado, grupoSelecionado, ConstraintType.MUST);
	var dsColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1), null);
	for(var i = 0; i < dsColleagueGroup.values.length; i++){
		usersByGroup.push(dsColleagueGroup.values[i]['colleagueGroupPK.colleagueId'])
	}
	var dsColleague = DatasetFactory.getDataset("colleague", null, null, null);
	
	for(var i = 0; i < dsColleague.values.length; i++){
		if($.inArray(dsColleague.values[i]['colleaguePK.colleagueId'], usersByGroup) !== -1){
			$('#responsavel').append('<option class="reponsavelOption" value="'+dsColleague.values[i]['colleaguePK.colleagueId']+'">'+dsColleague.values[i]['colleagueName']+'</option>')
			$('#responsavelFormArea').append('<option class="responsavelFormAreaOption" value="'+dsColleague.values[i]['colleaguePK.colleagueId']+'">'+dsColleague.values[i]['colleagueName']+'</option>')
		}	
	}
}


$(document).ready(function(){
	$('.agenciaMask').mask('000000000-0');
	$('.contaCorrente').mask('00000000000-0');
	$('.moneyFormat').mask('000.000.000.000.000,00', {reverse: true});
	$('.dateFormat').mask('00/00/0000');
	$('.dataHoraFormat').mask('00/00/0000-00:00');
	
	
	$('#envioPara').change(function(){
		$('.reponsavelOption').each(function(){
			$(this).remove();
		})
		/*$('.responsavelFormAreaOption').each(function(){
			$(this).remove();
		})*/
		var grupoSelecionado = $(this).val();
		console.log(grupoSelecionado)
		
		var usersByGroup = [];
		var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupoSelecionado, grupoSelecionado, ConstraintType.MUST);
    	var dsColleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, new Array(c1), null);
    	for(var i = 0; i < dsColleagueGroup.values.length; i++){
    		usersByGroup.push(dsColleagueGroup.values[i]['colleagueGroupPK.colleagueId'])
    	}
    	console.log(usersByGroup)
    	var dsColleague = DatasetFactory.getDataset("colleague", null, null, null);
    	
    	console.log(dsColleague.values)
    	for(var i = 0; i < dsColleague.values.length; i++){
    		if($.inArray(dsColleague.values[i]['colleaguePK.colleagueId'], usersByGroup) !== -1){
    			$('#responsavel').append('<option class="reponsavelOption" value="'+dsColleague.values[i]['colleaguePK.colleagueId']+'">'+dsColleague.values[i]['colleagueName']+'</option>')
    			//$('#responsavelFormArea').append('<option class="responsavelFormAreaOption" value="'+dsColleague.values[i]['colleaguePK.colleagueId']+'">'+dsColleague.values[i]['colleagueName']+'</option>')
    		}	
    	}
    	
    	
	})
})