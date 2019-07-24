var Components = {

    component_id: null,

	init : function(){

        this.bind();
        this.appendSection();
        this.setUniqueId();
        this.sortableComponents();
        this.sortableContainers();
        this.appendHelpers();

	}

	,bind : function() {

        pageBuilder.components.on('dragstart','.pb-drop-handler', Components.appendDroppableArea);
        pageBuilder.components.on('dragend','.pb-drop-handler', Components.removeDroppableArea);
        pageBuilder.container.on('dragenter','.pb-droppable-area, .pb-new-section-inner', Components.focusDroppableArea);
        pageBuilder.container.on('dragover','.pb-droppable-area, .pb-new-section-inner', Components.preventDragOver);
        pageBuilder.container.on('drop','.pb-droppable-area, .pb-new-section-inner', Components.dropComponents);
        pageBuilder.container.on('click','.pb-delete-widget', Components.removeWidget);

	}

    ,sortableContainers  : function(){
    
        if (pageBuilder.container.length) {

            pageBuilder.container.sortable({
                handle: $(this).closest('.pb-sort-icon'),
                cancel: '.pb-new-section-inner',
                classes: {
                    "ui-sortable": "pb-sortable-item"
                }
            }); 

        }
        
    }

    ,setUniqueId : function(){
    
        var drag_handlers = pageBuilder.components.find('.pb-drop-handler');

        if (drag_handlers.length) {

            drag_handlers.each(function(i){

                $(this).attr('id', 'pb-drag-handler-' + i);

            })

        }
        
    }


	/* Append droppble placeholders */
    ,appendDroppableArea  : function(e){


        e.dataTransfer.setData('html', e.target.id);

    
        var drop_area = '<div class="pb-droppable-area"></div>',
            widgets = pageBuilder.container.find('[data-widget]');

        Components.component_id = $(this);

        if (widgets.length) {

            widgets.each(function(){

              $(this).after($(drop_area))

            })

        }

        
    }

    /* Remove droppble placeholders */
    ,removeDroppableArea  : function(e){
        
        var drop_area = pageBuilder.container.find('.pb-droppable-area'),
            new_area = pageBuilder.container.find('.pb-new-section-inner');

        setTimeout(function(){

            if (drop_area.length) {

                drop_area.remove();
                new_area.removeClass('ready-to-drop');
                Components.component_id = null;

            }

        }, 100)

        
    }

    /* Focus droppble placeholders */
    ,focusDroppableArea : function(e){

        e.preventDefault(e);
    
        var self = $(this);

        pageBuilder.container.find('.pb-new-section-inner').removeClass('ready-to-drop');
        pageBuilder.container.find('.ready-to-drop').removeClass('ready-to-drop');
        self.addClass('ready-to-drop');
            
        
    }

    /* Prevent default to allow drop */
    ,preventDragOver : function(e){
    
        e.preventDefault();
        
    }

    /* Set Draggble Components */
    ,dropComponents : function(e){

        e.preventDefault();

        var data = e.dataTransfer.getData("html", e.target),
            target = $(this);

        Components.loadComponent(data, target)
 
        
    }

    /* Load master component */
    ,loadComponent : function(data, target){
    
        var component = $('#' + data);
            component_url = component.data('component');

        if (typeof component_url !== 'undefined' && Components.component_id !== null) {

            $.ajax({
                    url: component_url,
                    type: 'post',
                    data: {},
                    success: function (data) {

                        Components.appendComponent(component, target, data)

                    }
                });

        }
    }

    /* Append master component */
    ,appendComponent : function(component, target, data){

        if (target.hasClass('pb-droppable-area')) {
    
            if (component.length) {target.after(data);}

        } 

        if(target.hasClass('pb-new-section-inner')){
           
            if (component.length) {Components.wrapWidgetToSection(target, data)}
        }

        Components.removeDroppableArea();
        Components.sortableComponents(target);
        Components.appendHelpers();

        /* Append Helpers from Elements  */
        Elements.appendElemHelpers();
        Elements.appendColumnHelpers();

        /* Reinit Sortable Elemets */
        Elements.sortableElements();
        Elements.sortableColumns();


    }

    /* Wrap component to section .gs-section*/
    ,wrapWidgetToSection : function(target, data){
    
        var new_section_widget = '<div class="gs-section ui-sortable-handle" data-sortable-container>'+
                                    '<div class="gs-section-wrap">'+ data +'</div>'+
                                 '</div>';

        target.before(new_section_widget).removeClass('ready-to-drop');
        
    }

    /* Sortable Components */
    ,sortableComponents : function(target){

        var sortable = typeof target !== 'undefined' ? target : pageBuilder.container.find('[data-widget]');

        if (pageBuilder.container !== null && typeof sortable !== 'undefined') {

            sortable.parent().sortable({
                handle: ".pb-sort-icon",
                classes: {
                    "ui-sortable": "pb-sortable-item"
                }
            }); 

        }
        
    }

    /* Wrap widget in new section */
    ,appendSection : function(){
    
        var section = '<div class="gs-section pb-new-section-inner">'+
                            '<div class="gs-section-wrap">'+
                                '<div class="pb-add-section">'+
                                    '<div class="pb-add-section-text">'+
                                        'Drag widget here'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                       '</div>'

        var last_section = pageBuilder.container.find('.gs-section').last();

        last_section.after(section)
        
    }

    /* Append widgets controlls */
    ,appendHelpers : function(){
        
        var components = pageBuilder.container.find('[data-widget]');
        var settings_element = '<div class="pb-editor-settings">'+
                                    '<div class="pb-editor-ui">'+
                                        '<span class="pb-ui-icon pb-delete-icon icon-close pb-delete-widget pb-delete-ui" title="Remove"></span>'+
                                        '<span class="pb-ui-icon pb-widget-duplicate-icon icon-icon-file pb-duplicate-coll pb-duplicate-ui" title="Copy"></span>'+
                                        '<span class="pb-ui-icon pb-sort-icon icon-star"  title="Edit"></span>'+
                                    '</div>'+
                                '</div>';

        components.each(function(){

            var self = $(this);

            if (self.find('.pb-editor-settings').length == 0 && pageBuilder.check(self, 'data-widget')) {

                self.append(settings_element);

            }

        })


    }

    /* Remove Element */
    ,removeWidget : function(){

        var self = $(this),
            widget = self.parents('[data-widget]');

        Components.resetEditedElem(widget);

        if (widget.siblings().length > 0) {

            widget.remove();

        }else{

            widget.parents('.gs-section').remove();

        }
        
    }

    ,resetEditedElem : function(widget){
    
        if (Editor.elem !== null && widget.find('.pb-editing').length !== 0) {

            Editor.elem = null;
            $('#pb-components-btn').trigger('click');

        }
        
    }
}