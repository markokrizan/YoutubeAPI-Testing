//moj api key: AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8
//google projekat ID: webdizajnftn
//Use this key in your application by passing it with the key=API_KEY parameter

//ISKLJUCI AdBlock!
//Druge ekstenzije takodje mogu da smetaju - inkognito
var Kljuc = 'AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8';

var PretragaBtn = $('#PretregaBtn');
var PretragaPolje = $('#PretragaPolje');
//deo apijja, ima svega i svacega, ovo je za kanale
var URLkanali = 'https://www.googleapis.com/youtube/v3/channels';
var URLplist = 'https://www.googleapis.com/youtube/v3/playlistItems';
//deo apija
var partKanali = 'contentDetails';
var partPlist = 'snippet';
//var imeKanala = 'UCaWd5_7JhbQBe4dknZhsHJg';
//var KanaliZaPocetnu = ['UCaWd5_7JhbQBe4dknZhsHJg', 'UCXGgrKt94gR6lmN4aN3mYTg', 'UCr3cBLTYmIK9kY0F_OdFWFQ', 'UCO2x-p9gg9TLKneXlibGR7w', 'UCl2J-Po9njn76sXVLdvvSwg' ];
var KanaliZaPocetnu = ['LuisFonsiVEVO', 'unboxtherapy', 'duncan33303', 'Computerphile', 'numberphile'];
var kanaliZaDruguStranu = ['ThatSnazzyiPhoneGuy', 'jon4lakers', 'pocketnowvideo'];
var NazivKanala;

$(document).ready(function(){
    //alert("radi");
    console.log("Potencijalno ne radi ako je ukljucen AdBlock ili slicne ekstenzije.")
    var PretragaPoljeInput = $('#PretragaPolje');
    
    var modalLogin = document.getElementById("modalLogin");
    var modalSignUp = document.getElementById("modalSignUp");
    
    


    //S P A G E T I  K O D    
    $.each(KanaliZaPocetnu, function(i, item){
        var x = 
            
        '<div id = "kanalPanel" class="panel panel-default">'+
              '<div class="panel-heading">'+
                '<h3 id = "nazivKanala'+i+'" class="panel-title"></h3>'+
              '</div>'+
              '<div class="panel-body">'+
                 '<div class = "container">'+
                    '<div id = "redKlipova'+i+'" class="row">'+
                        generisiRedKlipova(item, '#nazivKanala'+i+'', '#redKlipova'+i+'' )
                    '</div>'+
                 '</div>'+
              '</div>'+
           '</div>';
        
        $("#glavni").append(x);
        
        
        
        
    })
    
    $('#PretragaBtn').on('click', function(event) { 
        var q = PretragaPoljeInput.val();
        window.location.replace('Search.html?q=' + q);
        
		
	});
    
    $("#PretragaPolje").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#PretragaBtn").click();
    }
    });
    
    $('#PretragaBtn').click(function(){
         var q = PretragaPoljeInput.val();
         window.location.replace('Search.html?q=' + q);                   
    });
    
    
    
    
    
    $('#kontejnerPaginacija').bootpag({
        total: 2,          
        page: 1,            
        maxVisible: 2,     
        leaps: true,
        href: "#result-page-{{number}}",
    })
    
    $('#kontejnerPaginacija').on("page", function(event, num){
    //show / hide content or pull via ajax etc
        //$("#testKontejner").html("Page " + num); 
        if(num === 1){
            $("#glavni").html("");
            
            $.each(KanaliZaPocetnu, function(i, item){
            var x = 

                '<div id = "kanalPanel" class="panel panel-default">'+
                      '<div class="panel-heading">'+
                        '<h3 id = "nazivKanala'+i+'" class="panel-title"></h3>'+
                      '</div>'+
                      '<div class="panel-body">'+
                         '<div class = "container">'+
                            '<div id = "redKlipova'+i+'" class="row">'+
                                generisiRedKlipova(item, '#nazivKanala'+i+'', '#redKlipova'+i+'' )
                            '</div>'+
                         '</div>'+
                      '</div>'+
                   '</div>';

                $("#glavni").append(x);

            })
            
            
        }
        
        
        
        
        if(num === 2){
            
            $("#glavni").html("");
            $("#trendingNaslov").html("");
            $.each(kanaliZaDruguStranu, function(i, item){
            var x = 

                '<div id = "kanalPanel" class="panel panel-default">'+
                      '<div class="panel-heading">'+
                        '<h3 id = "nazivKanala'+i+'" class="panel-title"></h3>'+
                      '</div>'+
                      '<div class="panel-body">'+
                         '<div class = "container">'+
                            '<div id = "redKlipova'+i+'" class="row">'+
                                generisiRedKlipova(item, '#nazivKanala'+i+'', '#redKlipova'+i+'' )
                            '</div>'+
                         '</div>'+
                      '</div>'+
                   '</div>';

                $("#glavni").append(x);

            })
            
            
        }
        
        


        });
    
    
});




 function generisiRedKlipova(imeKanala, kontejnerZaNaziv, kontejnerZaRed){
       
       $.get(
        URLkanali, 
        {
        part:partKanali,
        //mozes po username-u ili id kanala, sad su poceli po usernameu, i dalje radi po idu
        forUsername: imeKanala,
        //id:idKanala,
        key: Kljuc
        },
        function(data){
            $.each(data.items, function(i, item){
                //console.log(data);
                //console.log(item);
                //uploads je plejlista svih klipova koji su stavljeni na kanal
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
                
            })
        
    }
        
    );   
    
    function getVids(pid){
        $.get(
        URLplist, 
        {
        part:partPlist,
        maxResults: 4,
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
                console.log(item);
                videoTitle = item.snippet.title;
                videoId = item.snippet.resourceId.videoId;
                videoThumbnail = item.snippet.thumbnails.standard.url;
                //videoDescription = item.snippet.description;
                NazivKanala = item.snippet.channelTitle;
                //console.log(NazivKanala);
                VremePostavljanja = item.snippet.publishedAt;
                //videoId = item.contentDetails.videoId;
                //datum = item.contentDetails.videoPublishedAt;
                BrojPregleda = brojPregleda(videoId);
                
                
                //THUMBNAIL
                output = '<div class="col-sm-3  kartica" >'+
                  '<img width = "100%" heigth = "100%" src = "'+ videoThumbnail +'"'+'>'+
                  '</img>'+
                  '<h4>' + '<a href = Video.html?VideoId='+videoId+'&VideoTitle='+videoTitle+'>'+ videoTitle +'</a>'+ '</h4>'+
                  '<hr>'+
                  '<h6 style = "display:inline;">' + VremePostavljanja.substr(0,10) + '</h6>' +
                  '<span class = "pull-right">'+ BrojPregleda +'</span>'+
                '</div>'
                
                
                //ILI EMBEDOVANI VIDEO
                /*
                output = '<div class="col-sm-3  kartica" >'+
                  '<iframe width="100%" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>'+
                  '<h3>' + '<a href = Video.html?VideoId='+videoId+'&VideoTitle='+videoTitle+'>'+ videoTitle +'</a>'+ '</h3>'+
                '</div>'
                */
                           
                $(kontejnerZaRed).append(output);
                                                    
            })
                 
            $(kontejnerZaNaziv).append('<a href = "User.html?imeKanala='+ imeKanala+'">' + NazivKanala + '</a>');
          
        
    }
        
    );
        
    }
        
       
       
} 

function brojPregleda(id){
    $.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
            id: id,
            part: 'snippet,contentDetails,statistics',
            key: Kljuc
        },
        function(data){
            $.each(data.items, function(i, item){
                pregleda = item.statistics.viewCount;
                return pregleda;
                
            })
            
            
        }
        
        
        
        
        
    );
}






    