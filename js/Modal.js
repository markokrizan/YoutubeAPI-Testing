$(document).ready(function(){
    
    var modalLogin = document.getElementById("modalLogin");
    var modalSignUp = document.getElementById("modalSignUp");
    var modalDelete = document.getElementById("modalDelete");
    
    var imeInput = $('#ime');
    var prezimeInput = $('#prezime');
    var EMailInput = $('#email');
    var KorisnickoImeInput = $('#korisnicko');
    var LozinkaInput = $('#lozinka');
    var PonovljenaLozinkaInput = $('#ponoviLozinku');
    
   
    $('#klikLogin').on('click', function(event) { 
        
        
        
        if (modalLogin.style.display === "none" && modalSignUp.style.display === "block") {
            modalLogin.style.display = "block";
            modalSignUp.style.display = "none";           
        } 
        
        else if(modalLogin.style.display === "none"){
            modalLogin.style.display = "block";           
        }
        
        else {
            modalLogin.style.display = "none";
        }
        
	});
    
    $("#izadjiLogin").on('click', function(event){
       
        
        modalLogin.style.display = "none";
        
    });
    
    $('#klikRegistracija').on('click', function(event) { 
        
        /*
        //modalLogin.style.display = "block";
        
        if(modalSignUp.style.display === "none" && modalLogin.style.display === "block"){
        	modalLogin.style.display = "none";
        	modalSignUp.style.display = "block";
        }
        else if (modalSignUp.style.display === "none") {
            modalSignUp.style.display = "block";
        } else {
            modalSignUp.style.display = "none";
        }
        
        */
        
        if(modalLogin.style.display === "block"){
            modalLogin.style.display = "none";
        }
        
        var modal = bootbox.dialog({
            //dosta dobar hakic:
            message: $(".SignUp2").html(),
            title: "Registracija",
            buttons: [
              {
                label: "Sacuvaj",
                className: "btn btn-primary pull-left",
                callback: function() {
                    
                    

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
                }
              },
              {
                label: "Izadji",
                className: "btn btn-default pull-left",
                callback: function() {
                  console.log("just do something on close");
                }
              }
            ],
            show: false,
            onEscape: function() {
              modal.modal("hide");
            }
        });
    
        modal.modal("show");
        
        
        
	});
    
    $("#izadjiSignUp").on('click', function(event){
       
        
        modalSignUp.style.display = "none";
        
    });
    
    
   
    
    
    
   
    
    
});


