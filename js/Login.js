$(document).ready(function() { 
	
	var userNameInput = $('#userNameInput');
	var passwordInput = $('#passwordInput');

	

	$('#logInSubmit').on('click', function(event) { 
		var userName = userNameInput.val();
		var password = passwordInput.val();
		
        
        $.each(korisnici, function(i, item){
                if(userName === item.korisnicko && password === item.lozinka && item.tip === "korisnik"){
                    console.log("prosao peki");
                    window.location.replace('LogedInUser.html?imeKanala=' + item.klipovi);
                    //return false;
                }
                if(userName === item.korisnicko && password === item.lozinka && item.tip === "administrator"){
                    console.log("prosao sava");
                     window.location.replace('Admin.html?ImeAdministratora=' + item.ime + '&' + 'PrezimeAdministratora=' + item.prezime);
                    //return false;
                }
                
                
            })
        
        if(userName === "" || password === ""){
                   bootbox.alert({
                    message: "Niste uneli sve podatke!",
                    size: 'small'
                    
                });
                }
                //return false; 
                else{
                    bootbox.alert({
                    message: "Niste uneli dobre podatke!",
                    size: 'small'
                    
                });
                return false; 
                }
                
        
        
    	$("#logInSubmit").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#logInSubmit").click();
            }
            });
            
            
        
        
		
        
		
	});
});




