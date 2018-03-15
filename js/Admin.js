var Kljuc = 'AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8';

var y = '<div class="input-group stylish-input-group">'+
            '<input type="text" class="form-control"  placeholder="Pretrazi" >'+
            '<span class="input-group-addon">'+
                '<button type="submit">'+
                    '<span class="glyphicon glyphicon-search"></span>'+
                '</button>'+
            '</span>'+                
         '</div>'+
         '<br/>'

$(document).ready(function(){
   var imeAdmina = getQueryVariable('ImeAdministratora');
   var prezimeAdmina = getQueryVariable('PrezimeAdministratora');
   napuniIme(imeAdmina, prezimeAdmina);
    
    
   
    
    
    $('#btnKorisnici').on('click', function(event) { 
		
        $("#outputKontejner").append(y);  

		$.each(kanali, function(i, item){
       		
            trenutniNaziv = item;
       		$.get(
                'https://www.googleapis.com/youtube/v3/channels', 
                {
                //odavde imas sve zivo ovako
                part:'snippet, contentDetails, statistics',
                //mozes po username-u ili id kanala, sad su poceli po usernameu, i dalje radi po idu
                forUsername: item,
                //id:idKanala,
                key: Kljuc
                },
                function(data){
                    $.each(data.items, function(i, item){
                        console.log(item);
                        //console.log(item);
                        //uploads je plejlista svih klipova koji su stavljeni na kanal
                        //ovde prosledi funkciji za generisanje tabele statistika
                        naziv = item.snippet.title;
                        brojPratilaca = item.statistics.subscriberCount;
                        brojKlipova = item.statistics.videoCount;
                        brojPregleda = item.statistics.viewCount;
                        opis = item.snippet.description;
                        slika = item.snippet.thumbnails.default.url;
                        
                        
                        var x = 
                            
                        '<div class="panel panel-default">'+
                          '<div class="panel-heading">'+
                            '<h3 class="panel-title">'+ naziv + '</h3>'+
                          '</div>'+
                          '<div class="panel-body">'+
                            '<div class="row">'+
                               '<div class = "col-md-2 kontejnerSlika">'+
                                '<img class = "img-circle slikaProfila" src= '+ slika +' ></img>'+
                                '</div>'+
                                '<div class = "col-md-6">'+
                                '<table class="table tabelaDodatno">'+
                                  '<tr>'+
                                    '<td>Pratilaca: </td>'+
                                    '<td>'+ brojPratilaca +'</td>'+
                                  '</tr>'+
                                  '<tr>'+
                                    '<td>Klipova: </td>'+
                                    '<td>'+ brojKlipova +'</td>'+
                                  '</tr>'+
                                  '<tr>'+
                                    '<td>Pregleda: </td>'+
                                    '<td>'+ brojPregleda +'</td>'+
                                  '</tr>'+
                              '</table>'+
                              '</div>'+
                              '<div class="col-md-4">'+                  
                              '<div id = "grupaDugmica" class="btn-group" role="group" aria-label="...">'+
                                  '<a id = "pogledaj" type="button" class="btn btn-default dugmad">Pogledaj</a>'+
                                  '<button type="button" class="btn btn-default dugmad">Izmeni</button>'+
                                  '<button onclick = "Obrisi()" id = "ukloni" type="button" class="btn btn-default dugmad">Ukloni</button>'+
                              '</div>'+                                                     
                              '</div>'+
                           '</div>'+
                            
                            
                          '</div>'+
                        '</div>'
                        
                        $("#outputKontejner").append(x);
                        $("#pogledaj").attr("href", "User.html?imeKanala=" + trenutniNaziv);
                        

                    })
                    
                    //$("#pogledaj").attr("href", "User.html?imeKanala=" + trenutniNaziv);
                    

            }

            ); 

        
    	})
        
        $(this).prop('disabled', true);
		
	});
    
    
    
    /*
    //js media query:
    const mq = window.matchMedia( "(min-width: 767px)" );
    if(mq.matches){
        $(".slikaProfila").addClass('pull-right');
    }
    */
    
    
    
});




function Obrisi(){
    modalDelete.style.display = "block";
    
}

function Zatvori(){
    modalDelete.style.display = "none";
}







function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function napuniIme(ime, prezime){
    //jebem mater
    $("#adminName").append(prezime + ', ' + ime);
}

