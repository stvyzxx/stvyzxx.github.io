(function($){
    
    $(document).ready(function(){
        var data_id;
        
        /* initializing  */
        $(window).on("resize", onWinResize);
        $(window).on("orientationchange", onOrientChange);
        $(window).on("scroll", onWindowScroll);
        $(".contacts-close").on("click", toggleContacts);
        $(".mobile-menu").on("click", onHeaderBurgerClick);
        $(".scrollable").on( 'mousewheel', bodyScrollConfine);
        $(".container").load("pages/about.html",onLoadHTML);
        $(".arrow-up").on("click", onArrowUpClick);

        /* IOS fixes */
        iosFix();
        
        /* navigation hover*/
        $(".nav-list a").click(function(){
            var parent =  $(this).parent();

            if(parent.hasClass("active"))return false;            
            data_id = $(this).attr("data-id");
            
            /* click on contacts in nav */
            if(data_id == "contacts"){ 
                toggleContacts(); // Slide in from right   
                return false;
            }    
            /* end of contacts */

            parent.addClass("active").siblings(".active").removeClass("active");

            $(this).siblings().stop;
            $(".container").fadeOut(300);
            /* pages loading */
            setTimeout(function(){
                $(".container").load("pages/"+ data_id +".html", onLoadHTML);

            },300);
            
            return false;
        });
        
  
        
        /* Animation when html file is loaded */
        function onLoadHTML(){
            var self = $(this);
            $(".container").fadeIn(300)
            // animation on scroll
            descriptionAnimation();
            $(window).scrollTop(0);
            $(".mobile-header").css("top", 0);//shows header on load
            setTimeout(function(){
                self.find("h2 span").addClass("moveFromLeft");

                // skillz box animation
                if(data_id == "skillz"){                  
                    $(".indicator-bar").each(function(){
                        var data_indicator = $(this).attr("data-indicator");
                        $(this).css("width" ,data_indicator + "%").find(".percents-box").show(1000);
                        setTimeout(function(){
                            $(".percents-box-triangle").addClass("triangle-animation");
                        },200);
                        
                    });        
                }
                
                 // works box initial animation
                if(data_id == "works"){
                    //first work initialize animation
                    $('.work-box-description').first().addClass("description-animation")
                    .find(".description-info, .description-features")
                    .addClass("description-childs-animation");
                    $(".work-box-link").first().addClass("link-animation");
                }  

            },200);
        } 
      
        
         /* wokr-box link hover*/
        $(".container").on("mouseenter", ".work-box-link", function(e){
            var cover = $(this).prev();
            cover.css("opacity", "0");
            
            cover.on("mouseleave", function(e){       
                $(this).css("opacity", "1");
            });
            
            cover.on("mouseenter", function(e){       
                $(this).css("opacity", "0");
            });
            
        });
        
        
        // fix on work-box link click, add opacity to coverbox
        $(".container").on("click", function(e){
            var target = $(e.target);
            var cover = $(target).prev();
            if(target.hasClass("work-box-link")){
                cover.css("opacity", "1");
            };
        });

    });
    

/*----------end of ready function----------*/
/*-----------------------------------------*/
/*-----------------------------------------*/
/*-----------------------------------------*/


/*--------------- functions ---------------*/

    /* contacts box animation */
    function toggleContacts(){
        $(".contacts").toggleClass("contacts-toggle");
        $(".contacts-link").toggleClass("contacts-hover-link");
        onWinResize();
        setTimeout(function(){
            $(".contacts .scroll-fix").scrollTop(0);// returns position of .scroll-fix
        },500);
    }
    


    /* description box animation */
    function descriptionAnimation(){
        $('.work-box-description').each(function(){
            var self = $(this);
            
            $(window).scroll(function() {
                var wScroll = $(window).scrollTop();
                var offset = self.offset().top - wScroll;
                if(offset*1.5 < $(window).height()){

                    self.addClass("description-animation")
                    .find(".description-info, .description-features")
                    .addClass("description-childs-animation");

                    self.parent().next().addClass("link-animation");
                }
            
            });
        });
    }
    
     /* navigation appear on mobile version */
    function onHeaderBurgerClick(){
        //menu and contacts move on scroll
        onWinResize();
        $(".mobile-menu").toggleClass("mobile-menu-hover-link");
        $("aside.sidebar").toggleClass("sidebar-show");
        if($("aside.sidebar").hasClass("sidebar-show")){
            $(".mobile-header").css("position", "fixed");
        }else{
            $(".mobile-header").css("position", "absolute");
        }
        setTimeout(function(){
            $(".sidebar .scroll-fix").scrollTop(0);// returns position of .scroll-fix
        },500);
    }
    
    
    //menu and contacts move on scroll
    function onWinResize(){
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        if(winWidth > 800){
            $(".scroll-fix").css("overflow-y", "hidden");
            $(".sidebar .scroll-fix").css("height", "600px");
            $(".contacts .scroll-fix").css("height", "640px");
            return false;
        }else if(winWidth < 640){
            $(".mobile-header").css("position", "absolute");
        };  
        if(winHeight <= 620){
            $(".sidebar .scroll-fix").css({
                "overflow-y" : "scroll",
                "overflow-x" : "hidden",
                "height"     : winHeight + "px"
            });
            
            $(".contacts .scroll-fix").css({
                "overflow-y" : "scroll",
                "overflow-x" : "hidden",
                "height"     : winHeight + "px"
            });
            if(winWidth < 640){ //delete y-scroll because mobile menu does not need it
               $(".sidebar .scroll-fix").css({
                    "overflow-y" : "hidden"
                }); 
            }
        }else if(winHeight > 620){
            $(".scroll-fix").css({
                "overflow-y" : "hidden"
            });                
            $(".sidebar .scroll-fix, .contacts .scroll-fix").css({
                "height"     : "640px"
            });
        }   
    }


    function onOrientChange(){
        onWinResize(); // fix height (siedbar, contacts)
    };

    //functions prevents body scroll when scrolling on nav or contacts
    function bodyScrollConfine(e){
        if($(window).width() < 640) return;
        var event = e.originalEvent,
        d = event.wheelDelta || -event.detail;
        this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
        e.preventDefault();
    }
    
    function onWindowScroll(){
        var mobileMenu = $(".mobile-menu");
        var menuParent = $(".mobile-header");
        var sidebar = $(".sidebar");
        if( sidebar.hasClass("sidebar-show") ) return;
        if( $(window).scrollTop() > menuParent.height() ){
            menuParent.css({
                "top" : "-80px"
            })
        }else{
            menuParent.css({    
                "top" : "0"
             })   
        }    
    }

    function onArrowUpClick(){
       $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
    }
    
    function iosFix(){
        var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
        if(iOS){
            $(".nav-list a").css("line-height", "57px");
            $(".contacts input[type='submit']").css("line-height", "48px");
        }
    }
        

})(jQuery)






       