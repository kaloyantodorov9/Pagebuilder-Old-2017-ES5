var pageBuilder = {
    
    init : function() {

        $.event.addProp('dataTransfer');

        $(window).resize(pageBuilder.resize);
        pageBuilder.resize();
        pageBuilder.bind();
        pageBuilder.loadIframe();

    }

    /* Default Controllers */
    ,initControllers : function(arg){
    
        Components.init();
        Elements.init();
        Editor.init();
    }

    /* Default Containers */
    ,initContainers : function(){

        var self = this;
    
        self.iframe = $('#builder-preview-iframe');

        self.container = $('#builder-preview-iframe').contents().find('#pb-page-builder');
        self.sidebar = $('#pb-page-builder-sidebar');
        self.components = $('#pb-sidebar-components');
        self.elements = $('#pb-sidebar-elements');
        self.editor = $('#pb-sidebar-editor');
        
    }

    ,bind : function() {

        $('#pb-sidebar-main-menu a').on('click', pageBuilder.sidebarNav);
            
    }

    ,resize : function() {

        pageBuilder.viewport_height = $(window).height();
        pageBuilder.viewport_width = $(window).width();

        pageBuilder.mobile = navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/i) || pageBuilder.viewport_width < 1024 ? true : false;

    }

    /* Check if element has data attribute */
    ,check: function( el, param ) {
        return typeof $( el ).attr( param ) !== 'undefined';
    }

    /* Hide Preloader */
    ,hidePreloader : function(arg){
    
        $('#pb-iframe-preloader').fadeOut();
        
    }

    /* Show Preloader */
    ,showPreloader : function(arg){
    
        $('#pb-iframe-preloader').fadeIn();
        
    }

    /* Load Iframe */
    ,loadIframe : function(){
    

        if (typeof iframe_url !== 'undefined') {

            var iframe = '<iframe id="builder-preview-iframe" src="http://'+ iframe_url +'" allowfullscreen="1"></iframe>';

            $('#gs-pb-iframe-holder').append(iframe);

            $('#builder-preview-iframe').on('load', function(){

                pageBuilder.hidePreloader();
                pageBuilder.initContainers();
                pageBuilder.initControllers();

            })

        }
        
    }

    /* Sidebar Nav Change */
    ,sidebarNav : function(e){

        if (e) e.preventDefault();
    
        var self = $(this),
            section = self.attr('href');

        if (typeof section !== 'undefined' && !self.hasClass('active')) {

            $('#' + section).addClass('active').siblings().removeClass('active');
            self.addClass('active').siblings().removeClass('active');

            if (Editor.elem !== null) {

                Editor.elem = null;
                pageBuilder.container.find('.pb-editing').removeClass('pb-editing');

            }

        }
        
    }

};

