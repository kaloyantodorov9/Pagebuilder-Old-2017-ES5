var Elements = {

    elem_id : null,

	init : function(){

        this.appendElemHelpers();
        this.appendColumnHelpers();
        this.sortableElements();
        this.sortableColumns();
        this.setUniqueId();
		this.bind();
		
	}

	,bind : function() {

        pageBuilder.elements.on('dragstart','[data-draggble-element]', Elements.droppableElements);
        pageBuilder.elements.on('dragend','[data-draggble-element]', Elements.unFocusDroppableArea);
        pageBuilder.container.on('dragenter','[data-element]', Elements.focusDroppableArea);
        pageBuilder.container.on('dragover','[data-element]', Elements.preventDragOver);
        pageBuilder.container.on('drop','[data-element]', Elements.dropElements);
        pageBuilder.container.on('click','.pb-delete-coll, .pb-delete-elem', Elements.removeElement);
        pageBuilder.container.on('click','.pb-duplicate-ui', Elements.duplicateElement);

	}

    ,setUniqueId : function(){
    
        var drag_handlers = pageBuilder.elements.find('[data-draggble-element]');

        if (drag_handlers.length) {

            drag_handlers.each(function(i){

                $(this).attr('id', 'pb-drag-element-' + i);

            })

        }
        
    }

    ,sortableElements  : function(){

        var element = pageBuilder.container.find('[data-element]');
    
        if (element.length) {

            element.parent().sortable({
                handle: '.pb-elem-sort-icon',
                cancel: $(this).find('.pb-coll-editor-settings'),
                start: function (event, ui) {
                    ui.item.addClass("highlight");
                },
                stop: function (event, ui) {
                    ui.item.removeClass("highlight");
                },
                classes: {
                    "ui-sortable": "pb-sortable-item"
                }
            }); 

        }
        
    }

    ,sortableColumns  : function(){

        var element = pageBuilder.container.find('[data-column]');
    
        if (element.length) {

            element.parent().sortable({
                handle: '.pb-coll-sort-icon',
                cancel: $(this).find('.pb-editor-settings'),
                start: function (event, ui) {
                    ui.item.addClass("highlight");
                },
                stop: function (event, ui) {
                    ui.item.removeClass("highlight");
                },
                classes: {
                    "ui-sortable": "pb-sortable-item"
                }
            }); 

        }
        
    }

    /* Prevent default to allow drop */
    ,preventDragOver : function(e){
    
        e.preventDefault();
        
    }

	/* Set Draggble Elements */
    ,droppableElements : function(e){
          
        e.dataTransfer.setData('html', e.target.id);

        Elements.elem_id = $(this);
        
    }

    /* Focus droppble placeholders */
    ,focusDroppableArea : function(e){
      
        var self = $(this);

        if (Elements.elem_id !== null && Elements.elem_id.attr('id').indexOf('element') !== -1) {
            pageBuilder.container.find('.ready-to-drop-element').removeClass('ready-to-drop-element');
            self.addClass('ready-to-drop-element');
        }
            
        
    }

    ,unFocusDroppableArea : function(){   

        setTimeout(function(){
            pageBuilder.container.find('[data-element]').removeClass('ready-to-drop-element');
            Elements.elem_id = null;
        },100)
        
        
    }

     /* Set Draggble Components */
    ,dropElements : function(e){

        e.preventDefault();

        var data = e.dataTransfer.getData("html", e.target),
            target = $(this);

        Elements.loadElement(data, target)
 
        
    }

    /* Load master component */
    ,loadElement : function(data, target){
    
        var element = $('#' + data);
            element_url = element.data('element');

        if (typeof element_url !== 'undefined') {

            $.ajax({
                    url: element_url,
                    type: 'post',
                    data: {},
                    success: function (data) {

                        Elements.appendElement(element, target, data)

                    }
                });

        }
    }

    /* Append master element */
    ,appendElement : function(element, target, data){

        if (target.hasClass('ready-to-drop-element') && Elements.elem_id !== null) {

            if (target.length) {

                var $data = $(data);
                target.after($data);

                if (target.hasClass('pb-elem-paceholder')) {

                    target.remove();

                }

            }

        } 

        Elements.unFocusDroppableArea();
        Elements.appendElemHelpers($data);
        Elements.appendColumnHelpers($data);
        Elements.sortableElements();
        Elements.sortableColumns();

        Elements.elem_id = null;


    }

    ,appendElemHelpers : function(data){
        
        var components = typeof data !== 'undefined' ? data : pageBuilder.container.find('[data-editable]');

        var settings_element = '<div class="pb-elem-editor-settings">'+
                                    '<div class="pb-editor-ui">'+
                                        '<span class="pb-elem-ui-icon pb-elem-delete-icon icon-close pb-delete-elem pb-delete-ui" title="Remove"></span>'+
                                        '<span class="pb-elem-ui-icon pb-elem-duplicate-icon icon-icon-file pb-duplicate-elem pb-duplicate-ui" title="Copy"></span>'+
                                        '<span class="pb-elem-ui-icon pb-elem-sort-icon icon-star"  title="Edit"></span>'+
                                    '</div>'+
                                '</div>'

        components.each(function(){

            var self = $(this);

            if (self.find('.pb-elem-editor-settings').length == 0 && !pageBuilder.check(self, 'data-column') && !pageBuilder.check(self, 'data-widget')) {

                self.append(settings_element);

            }

        })


    }

    ,appendColumnHelpers : function(data){
        
        var components = typeof data !== 'undefined' ? data : pageBuilder.container.find('[data-column]');
        var settings_element = '<div class="pb-coll-editor-settings">'+
                                    '<div class="pb-editor-ui">'+
                                        '<span class="pb-coll-ui-icon pb-coll-sort-icon icon-star"  title="Edit"></span>'+
                                        '<span class="pb-coll-ui-icon pb-coll-duplicate-icon icon-icon-file pb-duplicate-coll pb-duplicate-ui" title="Copy"></span>'+
                                        '<span class="pb-coll-ui-icon pb-coll-delete-icon icon-close pb-delete-coll pb-delete-ui" title="Remove"></span>'+
                                    '</div>'+
                                '</div>'

        components.each(function(){

            var self = $(this);

            if (self.find('.pb-coll-editor-settings').length == 0 && pageBuilder.check(self, 'data-column')) {

                self.append(settings_element);

            }

        })


    }

    /* Remove Element */
    ,removeElement : function(){

        var self = $(this),
            element = self.closest('[data-editable]'),
            siblings = element.siblings('[data-editable]');

        Elements.resetEditedElem(element);

        if (siblings.length < 1) {

            element.parent().append('<div class="pb-elem-paceholder" data-element></div>')
        }

        element.remove();
        
    }

    /* Reset Element */
    ,resetEditedElem : function(element){
    
        if (Editor.elem !== null && element.hasClass('pb-editing')) {

            Editor.elem = null;
            $('#pb-components-btn').trigger('click');

        }
        
    }

    /* Duplicate elememt */
    ,duplicateElement : function(e){
    
        var self = $(e.target),
            element = self.closest('[data-editable]'),
            element_prototype = element[0].outerHTML,
            new_element = $(element_prototype);

        Elements.getElementIds(element, new_element)
        
    }

    ,getElementIds : function(element, new_element){

        var ids = []

        if (typeof element.prop('id') !== 'undefined' && element.prop('id').match('pb-')) {

            ids.push(element.prop('id'))

        }

        element.find('[data-editable]').each(function(){

            var self = $(this);

            if (typeof self.prop('id') !== 'undefined' && self.prop('id').match('pb-')) {

                ids.push(self.prop('id'))

            }

        })

        Elements.createCloningStyles(element, ids, new_element)

        
    }

    ,createCloningStyles  : function(element, ids, new_element){

        if (ids.length !== 0) {
    
            for (var i = 0; i < ids.length; i++) {

                var id = ids[i].replace(/[0-9]/g, ''),
                    new_id = id + '' + (new Date()).getTime(),
                    elem_prop = $.extend(true,{}, Editor.chache_styles[ids[i]]);

                new_element.filter('#' + ids[i]).removeClass('pb-editing').prop('id', new_id);
                new_element.find('#' + ids[i]).removeClass('pb-editing').prop('id', new_id);

                if (typeof elem_prop !== 'undefined') {

                    Editor.chache_styles[new_id] = elem_prop;
                    Editor.addStyleTag(new_id);
                    Elements.applyCloningStyles(new_id);


                }

            }

        }

        element.after(new_element);
        Elements.sortableColumns();
        Elements.sortableElements();
        
    }

    ,applyCloningStyles  : function(new_id){
    
        var stylesheet = pageBuilder.iframe.contents().find('#pb-style-' + new_id);

        if (stylesheet.length && Editor.chache_styles.hasOwnProperty(new_id)) {

            var styles = Editor.chache_styles[new_id].styles,
                selector = '#pb-page-builder #' + new_id;

            stylesheet.text(Editor.createStyleText(selector, styles))

        }
        
    }

}