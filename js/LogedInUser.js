var imeKanala = getQueryVariable('imeKanala');
var Kljuc = 'AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8';

/*
$(document).ready(function(){ 
   
    
    var x = 
            
        '<div id = "kanalPanel" class="panel panel-default">'+
              '<div class="panel-heading">'+
                '<h3 class="panel-title">Svi klipovi korisnika:</h3>'+
              '</div>'+
              '<div class="panel-body">'+
                 '<div class = "container">'+
                    '<div id = "redKlipova'+i+'" class="row">'+
                        generisiRedKlipova(imeKanala, '#redKlipova');
                    '</div>'+
                 '</div>'+
              '</div>'+
           '</div>';
        
        $("#glavni").append(x);
        
    
    
    
)};

*/
                  
$(document).ready(function(){
    
    
    
    
    
    
    
    
    var x = 
            
        '<div id = "kanalPanel" class="panel panel-default">'+
              '<div class="panel-heading">'+
                '<h3 class="panel-title" style = "display:inline;">Svi klipovi korisnika:</h3>'+
                '<span class = "pull-right"><button onclick="dodajKlip();"><span class = "glyphicon glyphicon-plus"></span></button></span>'+
              '</div>'+
              '<div class="panel-body">'+
                 '<div class = "container">'+
                    '<div id = "redKlipova" class="row">'+
                        generisiRedKlipova(imeKanala, '#redKlipova');
                    '</div>'+
                 '</div>'+
              '</div>'+
           '</div>';
        
        $("#glavni").append(x);
    
    
    
    
       

    
    
    
    
    
    
    
    
});

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

                  
                  
                  
function generisiRedKlipova(imeKanala, kontejnerZaRed){
       
       $.get(
        'https://www.googleapis.com/youtube/v3/channels', 
        {
        //odavde imas sve zivo ovako
        part:'snippet, contentDetails, statistics',
        //mozes po username-u ili id kanala, sad su poceli po usernameu, i dalje radi po idu
        forUsername: imeKanala,
        //id:idKanala,
        key: Kljuc
        },
        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
                //console.log(item);
                //uploads je plejlista svih klipova koji su stavljeni na kanal
                //ovde prosledi funkciji za generisanje tabele statistika
                brojPratilaca = item.statistics.subscriberCount;
                brojKlipova = item.statistics.videoCount;
                brojPregleda = item.statistics.viewCount;
                opis = item.snippet.description;
                vreme = item.snippet.publishedAt;
                popuniTabelu(brojPratilaca, brojKlipova, brojPregleda, opis, vreme);
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
                
            })
        
    }
        
    );   
    
    function getVids(pid){
        $.get(
        'https://www.googleapis.com/youtube/v3/playlistItems', 
        {
        part:'snippet',
        maxResults: 16,
        playlistId: pid,
        key: Kljuc
        },
        function(data){
            //za trpanje html-a
            var output;
            $.each(data.items, function(i, item){
                //console.log(data);
                //console.log(item);
                //uploads je plejlista svih klipova koji su stavljeni na kanal
                if(item == 'undefined'){
                    alert(item);
                }
                if(item == undefined){
                    alert(item);
                }
                //console.log(item.snippet);
                videoTitle = item.snippet.title;
                videoId = item.snippet.resourceId.videoId;
                videoThumbnail = item.snippet.thumbnails.standard.url;
                //videoDescription = item.snippet.description;
                NazivKanala = item.snippet.channelTitle;
                VremePostavljanja = item.snippet.publishedAt;
                //videoId = item.contentDetails.videoId;
                //datum = item.contentDetails.videoPublishedAt;
                
                //THUMBNAIL
                output = '<div class="col-sm-3  kartica style = "heigth:500px;" >'+
                  '<img width = "100%" heigth = "100%" src = "'+ videoThumbnail +'"'+'>'+
                  '</img>'+
                  '<h4>' + '<a href = Video.html?VideoId='+videoId+'&VideoTitle='+videoTitle+'>'+ videoTitle +'</a>'+ '</h4>'+
                  '<div class = "podaciOVideu">'+
                  '<hr>'+
                  '<h6 style = "display:inline;">' + VremePostavljanja.substr(0,10) + '</h6>' +
                  '<span class = "pull-right"><button onclick="obrisiVideo();"><span class = "glyphicon glyphicon-remove"></span></button></span>'+
                    //pazi ovde da pruzis argument kao string
                  '<span class = "pull-right"><button onclick="izmeniVideo(\''+videoId+'\');"><span class = "glyphicon glyphicon-list-alt"></span></button></span>'+ 
                  '</div>'+
                '</div>'
                
                           
                $(kontejnerZaRed).append(output);
                
                                                    
            })
                 
            $("#welcomeNaslov").append(NazivKanala);
          
        
    }
        
    );
        
    }
        
       
       
} 

function popuniTabelu(pratilaca, klipova, pregleda, opis, vreme){
    $('#dataPratilaca').append(pratilaca);
    $('#dataKlipova').append(klipova);
    $('#dataPregleda').append(pregleda);
    $('#dataOpis').append(opis);
    $('#dataVremeReg').append(vreme.substr(0,10));

}



 function obrisiVideo(){
            bootbox.confirm({
                message: "Da li ste sigurni da zelite da obrisete video?",
                size: 'small',
                'margin-top': function (){
                var w = $( window ).height();
                var b = $(".modal-dialog").height();
                // should not be (w-h)/2
                var h = (w-b)/2;
                return h+"px";
                },
                buttons: {
                    confirm: {
                        label: 'Da, obrisi',
                        className: 'btn-danger'
                    },
                    cancel: {
                        label: 'Ne, odustani',
                        className: 'btn-success'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                }
            })
     
     
}

function dodajKlip(){
    
    bootbox.prompt(
        "Unesi id videa:", 
        function(result){ 
            if(result === ""){
                bootbox.alert({
                    message: "Niste nista uneli!",
                    size: 'small'
                });
            }
                 
        });
    
    
}

function izmeniVideo(id){
    bootbox.prompt({
          title: "Izmeni id videa:",
          value: id,
          callback: function(result) {
            // greet user
          }
        });
    
}




