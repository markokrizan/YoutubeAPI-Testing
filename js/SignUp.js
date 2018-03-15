$(document).ready(function() { 
	
	var imeInput = $('#ime');
	var prezimeInput = $('#prezime');
    var EMailInput = $('#email');
	var KorisnickoImeInput = $('#korisnicko');
    var LozinkaInput = $('#lozinka');
	var PonovljenaLozinkaInput = $('#ponoviLozinku');

	

	$('#RegSubmit').on('click', function(event) { 
		var ime = imeInput.val();
		var prezime = prezimeInput.val();
        var EMail = EMailInput.val();
		var KorisnickoIme = KorisnickoImeInput.val();
        var Lozinka = LozinkaInput.val();
		var PonovljenaLozinka = PonovljenaLozinkaInput.val();
		
        
        
        if(ime === "" || prezime === "" || EMail === "" || KorisnickoIme === "" || Lozinka === "" || PonovljenaLozinka === ""){
            bootbox.alert({
                    message: "Niste uneli sve podatke!",
                    size: 'small'
                });
        }else if(Lozinka !== PonovljenaLozinka){
            bootbox.alert({
                    message: "Lozinke se ne slazu!",
                    size: 'small'
                });
        }
        
		
	});
    
    
    $("#RegSubmit").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#RegSubmit").click();
            }
            });
});