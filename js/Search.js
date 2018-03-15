
var Kljuc = 'AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8';
//var kanal;
//var brojPregleda;



$(document).ready(function(){
    
    var PretragaBtn = $('#PretregaBtn');
    var PretragaPolje = $('#PretragaPolje');
    
    var q = getQueryVariable('q');
    
  
    
   
    $('#welcomeNaslov').append(q);
    
        $.get(
        'https://www.googleapis.com/youtube/v3/search', 
        {
        maxResults:'10',
        part: 'snippet',   
        q: q,
        key: Kljuc,
        type : 'video'
        },
        function(data){
            $.each(data.items, function(i, item){
                //console.log(item);
                id = item.id.videoId;
                naziv = item.snippet.title;
                thumbnail = item.snippet.thumbnails.high.url;
                
                
                
                infoOVideu(id, naziv, thumbnail);
                
                
            })
        
        }

        ); 
    
        
      
     function infoOVideu(id, naziv, thumbnail){
         
         $.get(
                'https://www.googleapis.com/youtube/v3/videos', 
                {
                id:id,
                'part': 'snippet,contentDetails,statistics',
                key:Kljuc
                },
                function(data){
                    $.each(data.items, function(i, item){
                        console.log(item);
                        kanal = item.snippet.channelTitle;
                        brojPregleda = item.statistics.viewCount;
                        
                        var x = '<li class = "list-group-item">'+
                            '<div class = "row">'+
                            '<div class = "col-md-2">'+
                                '<img class="img-thumbnail pretragaSlika" src = "'+ thumbnail+ '"/>'+
                            '</div>'+
                            '<div class = "col-md-10">'+
                                '<a href="Video.html?VideoId=' + id + '">' + naziv + '</a>' +
                                '<br/>' + 
                                'Korisnik: &nbsp; ' + kanal + 
                                '<br/> ' + 
                                'Broj pregleda: &nbsp; ' + brojPregleda +
                            '</div>'+
                            '</div>'+
                        '</li>'; 
                        //console.log(x);
                        $('#listaRezultata').append(x);
                        
                        
                    })
                }
                );
         
         
         
     }
    
    
    
    
		
     $('#PretragaBtn').on('click', function(event) { 
        console.log(q);
        var q = PretragaPolje.val();
        window.location.replace('Search.html?q=' + q);
       
        
		
	});   
    
    $("#PretragaPolje").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#PretragaBtn").click();
    }
    });
    
    $('#PretragaBtn').click(function(){
         console.log(q);
         var q = PretragaPoljeInput.val();
         window.location.replace('Search.html?q=' + q);                   
    });
		
	
    
    
    
    
    

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