$(document).ready(function(){


    var video = document.getElementById("videoPocetna");
    var videoJQ = $('#videoPocetna');
    var vh = $('#videoHolder');
    var op = $('#najgledanijiOpis');
    
    $('#pp').on('click', function(event) { 
        if (video.paused) 
            video.play(); 
        else 
            video.pause(); 
        
		
	});
    
    $('#b').on('click', function(event) { 
        //video.width = 560;
        //videoJQ.width('100%');
        vh.attr('class', 'col-md-12');
        op.display = 'none';
        
        
		
	});
    
    
    $('#n').on('click', function(event) { 
        vh.attr('class', 'col-md-5');
        op.display = 'block';
        videoJQ.width('100%'); 
        
		
	});
    
    
    


});