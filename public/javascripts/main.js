$(document).foundation();
$(document).ready(function(){
    $("#minus").prop("disabled", true);
    $('.icon').children('h6').css('opacity','0');
    $('.icon').hover(function(){  
            $('.icon').mouseenter(function(){
               $(this).children('h6').css('opacity','0.7'); 
            });
            $('.icon').mouseleave(function(){
               $(this).children('h6').css('opacity','0'); 
            });
     });
    $('.icon').click(function() {
       $('.icon').not(this).children('h6').css('opacity','0');
       $(this).children('h6').css('opactiy','1');
       $(this).mouseleave(function(){
            $(this).children('h6').css('opacity','1'); 
       });
       $(this).mouseenter(function(){
               $(this).children('h6').css('opacity','1'); 
            });
    });
    
    
    $('#arrow_nav[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('.page, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
            
        }
    });

   $('a.open-first').hover(function(){
        $('#first-modal').foundation('reveal','open'); 
   });


    

});
