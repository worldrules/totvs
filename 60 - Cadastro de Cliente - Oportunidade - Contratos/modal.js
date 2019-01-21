function show_hide(classe,el){
	var id = "#" + $(el).parent().parent().attr("id");
	classe = "." + classe;
	$(id + " .links").each(function(){
		if($(this).css("display") != "none"){$(this).toggle();}
	});
	$(id + " .active").removeClass("active");
	$(id + " " + classe).toggle();
	$(el).addClass("active");
}
$('#tabs a').click(function(e) {
    e.preventDefault();
    $($(this).attr("href") + " .active").click();
    $(this).tab('show');

});


function eventClickShowModal(){
	$(".link-menu").click(function(){
		showContentInModal(this);
	})
}

function showContentInModal(element){
	var classe = $(element).attr("id");
	$("." + classe).each(function(){
		var content = this.innerHTML
		FLUIGC.modal({
			title : "",
			content : content,
			id : 'fluig-modal',
			size: 'full',
			actions : [ {
				'label' : 'Fechar',
				'autoClose' : true
			} ]		
		});
	})
}

$( document ).ready(function() {
   eventClickShowModal();
});