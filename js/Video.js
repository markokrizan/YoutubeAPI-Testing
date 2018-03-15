
var Kljuc = 'AIzaSyB4aPQhnYfqVkgZhB24Q8iP8w-PsZtZIa8';


$(document).ready(function(){
    var VideoId = getQueryVariable('VideoId');
    var VideoTitle = getQueryVariable('VideoTitle');
    
    var PretragaBtn = $('#PretregaBtn');
    var PretragaPolje = $('#PretragaPolje');
    //alert(VideoId);
    //alert(VideoTitle);
    
    var video = '<iframe height="400"   src="https://www.youtube.com/embed/'+VideoId+'?autoplay=1'+'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>'
    
    $("#videoKontejner").append(video);
    
    $.get(
        'https://www.googleapis.com/youtube/v3/videos', 
        {
        id:VideoId,
        part: 'snippet,contentDetails,statistics',
        key: Kljuc
        },
        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
                videoTitle = item.snippet.title;
                $('title').append(videoTitle);
                videoDescription = item.snippet.description;
                likeCount = item.statistics.likeCount;
                dislikeCount = item.statistics.dislikeCount;
                viewCount = item.statistics.viewCount;
                commentCount = item.statistics.commentCount;
                datumPostavljanja = item.snippet.publishedAt;
                
                kanalId = item.snippet.channelId;
                kanalTitle = item.snippet.channelTitle;
                napuniVideo(videoTitle, videoDescription, likeCount, dislikeCount, viewCount, commentCount, datumPostavljanja, kanalId, kanalTitle);
                
                
                
            })
        
    }
        
    ); 
    
    $.get(
        'https://www.googleapis.com/youtube/v3/commentThreads', 
        {
        videoId:VideoId,
        part: 'snippet,replies',
        key: Kljuc
        },
        function(data){
            $.each(data.items, function(i, item){
                
                //console.log(item);
                autor = item.snippet.topLevelComment.snippet.authorDisplayName;
                komentar = item.snippet.topLevelComment.snippet.textOriginal;
                datum = item.snippet.topLevelComment.snippet.publishedAt;
                lajkova = item.snippet.topLevelComment.snippet.likeCount;
                dislajkova = item.snippet.topLevelComment.snippet.dislikeCount;
                
                
                
                //console.log(autor);
                //Wconsole.log(komentar);
                
                $("#lista").append(
                    '<li class="list-group-item">' + 
                    '<b>' + autor + '</b>' + 
                    '<br/><br/>' + 
                    komentar + 
                    '<br/><br/><hr/>'+ 
                    'Postavljeno: ' + datum.substr(0,10) + 
                    '<span class = "pull-right"><i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;' + lajkova + '</span>'+
                    '</li>');
                
                
                //<li class="list-group-item">Cras justo odio</li>
                
                
                
                
                
                
                
            })
        
    }
        
    ); 
    
    
    /*  
    
    $('i.glyphicon-thumbs-up, i.glyphicon-thumbs-down').click(function(){    
        var $this = $(this),
        c = $this.data('count');    
        if (!c) c = 0;
        c++;
        $this.data('count',c);
        $('#'+this.id+'-bs3').html(c);
    });      
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    }); 
    
    */
    
     
    
    
    
   
    
});



function napuniVideo(title, description, likec, dislikec, viewc, commentc, datum, id, vlasnik){
    $("#like1-bs3").append(likec);
    $("#dislike1-bs3").append(dislikec);
    $("#brPregledaSpan").append(viewc);
    $("#brKomentara").append(commentc);
    $("#naslov").append(title);
    $("#vlasnik").append('<a href = "User.html?imeKanala='+vlasnik.trim() +'">'+ vlasnik +'</a>');
    $("#opis").append(description);
    $("#opis").append('<br/><br/>');
    $("#opis").append('Postavljeno:&nbsp;&nbsp;' + datum.substr(0,10));
    
    
    
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

function dodajKomentar(){
    bootbox.prompt(
        "Unesi komentar:", 
        function(result){ 
            if(result === ""){
                bootbox.alert({
                    message: "Niste nista uneli!",
                    size: 'small'
                });
            }
                 
        });
}





