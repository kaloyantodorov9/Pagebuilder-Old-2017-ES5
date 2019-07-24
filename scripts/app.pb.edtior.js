var Editor = {

	/* Array for styles */
    style_id: [],
    chache_styles: header_chache_styles,

    /* Deafult Settings */
    settings:{
        container:{ 
            default: ['width','border','dimensions','background','typography'],
            main: ['width','border','dimensions', 'background','typography'],
            inline: ['width','border','dimensions'],
            grid: ['width', 'align-items-verical', 'align-items-horizontal', 'border','dimensions', 'background']
        },
        column: { 
            default: ['width','border','dimensions'],
            grid: ['width','border','dimensions', 'background']
        },
        title: {
            default: ['text-editor', 'change-title-tags', 'insert-link', 'typography', 'border', 'dimensions']
        },
        paragraph:{
            default: ['text-editor','typography','size','border','dimensions'],
            data_base : ['size','typography','border','dimensions']
        },
        image:{
            default: ['media','width','height','border','dimensions', 'insert-link',],
            grid: ['media','width','border','dimensions', 'insert-link',]
        },
        button:{
            default: ['text-editor','typography', 'edit-link', 'size','border', 'dimensions', 'background']
        }
    },

    /* Media queries breapoints */
    media_settings: {
        desktop: '',
        tablet:'@media screen and (max-width: 1025px){',
        mobile: '@media screen and (max-width: 640px){'
    },

    media_viewport: 'desktop', //default

	/* This is selected element */
    elem: null,

	init : function(){

		this.bind();
        Media.init();

	}

	,bind : function() {

        /* Pagebulider container click listeners */
        pageBuilder.container.on('click', '[data-editable]', Editor.focusEditble);
        pageBuilder.container.on('click', Editor.unFocusEditble);

        /* Form elements listeners for change and input */
		pageBuilder.editor.on('change','.pb-controlls-val', Editor.styleElem);
        pageBuilder.editor.on('input change','.pb-ui-dim-input', Editor.collectDimensionValues);
        pageBuilder.editor.on('input change','[data-tool=text-editor]', Editor.updateElementText);
        pageBuilder.editor.on('input change','.pb-insert-link-val', Editor.insertLink);
        pageBuilder.editor.on('input change','.pb-edit-link-val', Editor.editLink);
        pageBuilder.editor.on('change','.pb-change-html-tag', Editor.changeHTMLTags);
        pageBuilder.editor.on('change','.pb-link-attr-val', Editor.addLinkAttributes);

        /* Pagebulider editor click listeners */
        pageBuilder.editor.on('click','#pb-editor-menu a', Editor.showEditorMenuSection);
        pageBuilder.editor.on('click','.pb-link-dimensions', Editor.observeDimensionValues);
        pageBuilder.editor.on('click','.pb-lang-type span', Editor.changeInputLang);
        pageBuilder.editor.on('click','.pb-show-observe-tool', Editor.showHiddenTools);

        /* Screen resolution listeners */
        $('#pb-iframe-size').on('click', 'button', Editor.changeViewport);

	}

    ,isEmptyChasche : function(obj){
    
        return Object.keys(obj).length === 0;
        
    }

    ,changeViewport : function(arg){
    
        var self = $(this),
            viewport = self.data('viewport');

        if (!self.hasClass('active')) {

            self.addClass('active').siblings().removeClass('active');
            pageBuilder.iframe.removeAttr('class').addClass(viewport);

            Editor.media_viewport = viewport;

            if (pageBuilder.container.find('.pb-editing').length !== 0 && Editor.chache_styles.hasOwnProperty(Editor.elem.attr('id'))) {

                setTimeout(function(){
                    Editor.updateViewportCss();
                },50)
                
            }

        }
        
    }

    ,resetViewportCss  : function(arg){
    
        var inputs = pageBuilder.sidebar.find('input.pb-controlls-val , input.pb-ui-dim-input'),
            selects = pageBuilder.sidebar.find('select.pb-ui-handler-select');

        inputs.val('');  
        selects.prop('selectedIndex', 0);  
    }

    ,updateViewportCss  : function(arg){

        var chache_styles = Editor.chache_styles[Editor.elem.attr('id')].styles;

        if (typeof chache_styles !=='undefined' && chache_styles.hasOwnProperty(Editor.media_viewport)) {

            Editor.resetViewportCss();

            $.each(chache_styles[Editor.media_viewport], function(key, val){

                Editor.applyStyles(key, val);

            })
        }

        
    }

    /* Showing editor tabs */
	,showEditorMenuSection  : function(e){

		if(e) e.preventDefault();
	
		var self = $(this);
			type = self.data('tool-type'),
            tools = pageBuilder.editor.find('[data-type]'),
            target = pageBuilder.editor.find('[data-type='+type+']');

		if (!self.hasClass('active')) {

            tools.hide()
			self.addClass('active').siblings().removeClass('active');
			target.show();
            $('#pb-sidebar-main-menu .pb-main-nav-link').removeClass('active');

		}
		
	}

    /* Element on mouseover */
	,elemOver : function(e){

        var self = $(e.target),
            element = pageBuilder.check(self, 'data-editable') ? self : self.closest('[data-editable]')

        $('[data-editable]').removeClass('focus');
        element.addClass('focus');
        
    }

    /* Element on mouseleave */
    ,elemLeave : function(e){

        $(this).removeClass('focus');
        
    }

    /* Selecting element for editing */
    ,focusEditble : function(e){

        if(e) e.preventDefault();
    
        var self = $(e.target);

        if (!self.hasClass('pb-delete-ui') && !self.hasClass('pb-duplicate-ui')) {

            var element = pageBuilder.check(self, 'data-editable') ? self : self.closest('[data-editable]');
                options = element.attr('data-editable');

            Editor.createUniqueId(element);

            if (!element.hasClass('pb-editing') && pageBuilder.check(element, 'data-editable')) {

                pageBuilder.container.find('[data-editable]').removeClass('pb-editing');
                element.addClass('pb-editing');

                Editor.showEditor(self, element, options);
                Editor.getElementName(self);

            }
        }
        
        
    }

    ,unFocusEditble : function(e){
    
        var self = $(e.target),
            element = pageBuilder.check(self, 'data-editable') ? self : self.closest('[data-editable]');


        if (element.length == 0) {

            pageBuilder.container.find('[data-editable]').removeClass('pb-editing');
            Editor.elem = null;
            $('#pb-components-btn').trigger('click');

        }
        
    }

    ,getElementName : function(self){
    
        var data_name = pageBuilder.check(self, 'data-editable') ? self.data('editable') : self.closest('[data-editable]').data('editable'),
            name_str = data_name.split('.');

        $('#pb-edited-elem-name').text(name_str[0]);
        
    }

    /* Show editor */
    ,showEditor : function(self, element, options){

        if (typeof options !== 'undefined') {

            var _is_option = options.split('.');

            if (Editor.settings[_is_option[0]].hasOwnProperty(_is_option[1])) {

                pageBuilder.editor.addClass('active').siblings().removeClass('active');
                Editor.loadTools(self, element, options);

            }else{

                pageBuilder.editor.find('.pb-editor-form').html('');
                $('#pb-sidebar-main-menu a').eq(0).trigger('click');

            }

        }
    	
    }

    /* Get tools from selected element */
    ,getActiveTools : function(self, options, $data){
    
        var elem = self,
            settings = options.split('.'),
            options_array = Editor.settings[settings[0]][settings[1]],
            tools = [];

        if (typeof options_array !== 'undefined') {

            for (var i = 0; i < options_array.length; i++) {

                tools.push($data.filter('[data-edit='+ options_array[i] +']'));

            }

            return tools

        }
        
    }

    /* Load Tools for selected element */
    ,loadTools : function(self, element, options){

        if (typeof self !== 'undefined' && typeof options !== 'undefined') {

        	$.ajax({
        			url: 'ajax/tools/tools.php',
        			type: 'post',
        			data: {},
        			dataType: 'html',
        			success: function (data) {


        				if (data) {

                            var $data = $(data);

                            pageBuilder.editor.find('.pb-editor-form').html(Editor.getActiveTools(self, options, $data))

                            Editor.elem = element;

                            Editor.updateEditorMenu();
                            Editor.addStyleTag(Editor.elem.attr('id'));

                            Editor.getStyles();
                            Editor.getElemText(Editor.elem);
                            Editor.updateImageTool();
                            Colorpicker.init($data);

        				}
        			}
        		});

        }
    	
    }

    /* Get active tools for selected element */
    ,updateEditorMenu : function(){
        
        var tools = pageBuilder.editor.find('.pb-edit-tool'),
            tools_types = [];

        tools.each(function(){

            var type = $(this).data('type');

            if($.inArray(type, tools_types) === -1) tools_types.push(type);

        })

       Editor.resetEditorMenu(tools_types);
        
    }

    /* Reseting menu tabs */
    ,resetEditorMenu : function(tools_types){
    
        var menu_links = $('#pb-editor-menu a');

        menu_links.hide().removeClass('active');

        for (var i = 0; i < tools_types.length; i++) {

            menu_links.filter('[data-tool-type='+tools_types[i]+']').show();

        }

        menu_links.filter(':visible:first').trigger('click');
        
    }

    /* Creating unique style for element */
    ,addStyleTag : function(id){
    
    	var head = pageBuilder.iframe.contents().find('head')[0],
    		style = document.createElement('style'),
    		style_id = 'pb-style-' + id;

    		style.type = 'text/css';
    		style.id = style_id;

    	if (Editor.style_id.indexOf(style_id) === -1) {

    		Editor.style_id.push(style_id);
    		head.appendChild(style);

    	}
    	
    }

    /* Adds unique id on selected element */
    ,createUniqueId : function(self){

        var elem_class =  typeof self.attr('class') !== 'undefined' ? self.attr('class') : 'pb-element',
            elem_id = self.prop('id');


        if (!elem_id) {
            self.prop('id', elem_class.split(/\s(.+)/)[0] + '-' + (new Date()).getTime())
        }
    
        
        
    }

    /* Styling selected element in real time from fields */
    ,styleElem : function(elem){
    
        var controlls = pageBuilder.editor.find('.pb-controlls-val'),
            viewport = Editor.media_viewport;

        if (Editor.elem != null) {

           	for (var i = 0; i < controlls.length; i++) {    

           		if ($(controlls[i]).val() !== '') {

           			var that = $(controlls[i]),
                        tool = that.attr('data-tool'),
                        unit = pageBuilder.check(that, 'data-unit') ? that.attr('data-unit') : '',
                        value = that.val();

                    if (Editor.chache_styles.hasOwnProperty(Editor.elem.attr('id')) ) {

                        Editor.chache_styles[Editor.elem.attr('id')]['styles'] = Editor.createStyleObject(tool, value, unit);

                    }else{
                        
                        Editor.chache_styles[Editor.elem.attr('id')] = {};
                        Editor.chache_styles[Editor.elem.attr('id')]['styles'] = Editor.createStyleObject(tool, value, unit);

                    }

           		}

           	}

            Editor.computeStyles();
            Editor.showObservedTools($(this));

        }

        
    }

    /* Creating style object with viewport keys */
    ,createStyleObject  : function(tool, value, unit){
    
        var element = Editor.chache_styles[Editor.elem.attr('id')],
            viewport = Editor.media_viewport,
            styles_obj = {};

        if (typeof element !== 'undefined' && element.hasOwnProperty('styles')) {

            styles_obj = element.styles;

            if (styles_obj.hasOwnProperty(viewport)) {

                styles_obj[viewport][tool] = value + '' + unit + ';';

            }else{
    
                styles_obj[viewport] = {};

                styles_obj[viewport][tool] = value + '' + unit + ';';

            }

        }else{
    
            styles_obj[viewport] = {};
    
            styles_obj[viewport][tool] = value + '' + unit + ';';

        }

        return Editor.sortStyleObject(styles_obj);
        
    }

    ,sortStyleObject : function(obj){
    
        var sortable = [],
            sort_obj = {},
            pattern = Object.keys(Editor.media_settings);

        for(var key in obj){

            if(obj.hasOwnProperty(key)){
                sortable.push([key, obj[key]]);
            }
        
            sortable.sort(function(a, b){

                var x = a[0].toLowerCase(),
                    y = b[0].toLowerCase();

                return pattern.indexOf(x) - pattern.indexOf(y);

            });

        }

        for (var i = 0; i < sortable.length; i++) {
            sort_obj[sortable[i][0]] = sortable[i][1];
        }
        
        return sort_obj;
            
    }

    /* Direct typing in style attr */
    ,computeStyles : function(prop, val, unit){

    	var stylesheet = pageBuilder.iframe.contents().find('#pb-style-' + Editor.elem.attr('id')),
    		chache_styles = Editor.chache_styles[Editor.elem.attr('id')].styles;


    	if (Editor.elem !== null && stylesheet.length && typeof chache_styles !== 'undefined') {

    		var	selector = '#pb-page-builder #' + Editor.elem.attr('id');

    		stylesheet.text(Editor.createStyleText(selector, chache_styles))

    	}
    	
    }

    ,createStyleText : function(selector, styles){
        

        var text_string = '';

        $.each(styles, function(key, val){

            var value = typeof val !== 'undefined' ? JSON.stringify(val).replace(/['",]+/g, '') : '', css;

            if (key == 'desktop') {
                css = value;
            }else{
                css = value + '}';
            }

            text_string += Editor.media_settings[key] + selector + '' + css;

        })


        return text_string;
        
    }

    /* Get styles from selected element */
    ,getStyles : function(){

        Editor.getHTMLTag();
        Editor.getElemLink();

        if (Editor.chache_styles.hasOwnProperty(Editor.elem.attr('id'))) {

            var elem = Editor.chache_styles[Editor.elem.attr('id')];

            if (elem.hasOwnProperty('styles')) {

                var styles = typeof elem.styles[Editor.media_viewport] !== 'undefined' ? elem.styles[Editor.media_viewport] : Editor.getSiblingsViewports(elem);

                $.each(styles, function(key, val){
                    Editor.applyStyles(key, val);
                });

            }

        }

    }

    /* Get styles from siblings viewport */
    ,getSiblingsViewports : function(elem){
    
        var all_styles = elem.styles, sibling_styles;

        if (!all_styles.hasOwnProperty(Editor.media_viewport)) {

            switch(Editor.media_viewport) {
                case 'desktop':
                    break;
                case 'tablet':
                    sibling_styles = $.extend(true,{}, all_styles.desktop);
                    break;
                case 'mobile':
                    sibling_styles = typeof all_styles.tablet !== 'undefined' ? $.extend(true,{}, all_styles.tablet) : $.extend(true,{}, all_styles.desktop);
                    break;
                default:
                    break;
            }

        }

        return sibling_styles
        
    }

    /* Aplly styles form selected element into editor */
    ,applyStyles : function(key, val){

        if (typeof key !== 'undefined' && typeof val !== 'undefined') {

            var tool = pageBuilder.editor.find('.pb-controlls-val[data-tool='+ key +']');

            if (tool.length) {

                if (tool.hasClass('pb-ui-handler-select')) {
                    Editor.updateStylesSelects(tool, val); return            
                }

                if (tool.hasClass('pb-controll-dimensions-val')) {
                    Editor.updateStylesDimension(tool, val); return            
                }

                Editor.updateStyleInputs(tool, val);

            }

        }
        
    }

    /* Update onClick input tools */
    ,updateStyleInputs : function(tool, val){
    
        var value = val.replace(/[&\/\\px,;+()$~%.'":*?<>{}]/g, '');

        tool.val(value).trigger('change');
        
    }

    /* Update onClick select tools */
    ,updateStylesSelects : function(tool, val){


        var value = val.replace(/\;/g, ''),
            option = tool.find('option').filter(function(){ return this.value == value });

        option.prop('selected', true).trigger('change');
        
    }

    /* Update onClick dimension inputs */
    ,updateStylesDimension : function(tool, val){
    
        var value = val.replace(/\;/g, ''),
            split_valeus = value.split(' '),
            val_array = $.grep(split_valeus,function(n){ return n == 0 || n }),
            inputs = tool.parent().find('.pb-controll-dimensions');

        for (var i = 0; i < val_array.length; i++) {

            var _is_val = val_array[i],
                _is_match = _is_val.replace(/[^0-9]/g,'');

            inputs.eq(i).find('.pb-ui-dim-input').val(_is_match);
            
        }

        tool.val(value).trigger('change');
        
    }

    /* Dimension inputs live change */
    ,collectDimensionValues : function(){
    
        var self = $(this),
            container = self.parents('.pb-ui-dimensions'),
            dim_inputs = self.parent().siblings().find('input.pb-ui-dim-input'),
            controll_val = container.find('.pb-controlls-val'),
            all_inputs = container.find('input.pb-ui-dim-input'),
            observe = container.find('.pb-link-dimensions').hasClass('active'),
            value = '';

        if (observe) {
            dim_inputs.val(self.val());
        }

        all_inputs.each(function(){

            var in_val = $(this).val().length > 0 ? $(this).val() : '0';

            value += in_val + 'px ';

        })

        controll_val.val(value).trigger('change');

        
    }

    /* Switch on and off observable of dimesion inputs */
    ,observeDimensionValues : function(e){
    
        e.preventDefault();

        var self = $(this),
            container = self.parents('.pb-ui-dimensions');

        if (!self.hasClass('active')) {
            self.addClass('active');
            container.addClass('active');
        }else{
            self.removeClass('active');
            container.removeClass('active');
        }
        
    }

    /* Show if tool has hidden options */
    ,showObservedTools  : function(tool){
    
        var tool_name = tool.attr('data-tool'),
            extras = pageBuilder.editor.find('[data-observe-tool=' + tool_name + ']'),
            default_props = ['none','default','inherit','auto'];

        if (typeof extras !== 'undefined') {

            if (tool.val().length > 0 && default_props.indexOf(tool.val()) < 0) {
                extras.show()
            }else{
                extras.hide() 
            }
        
        }
        
    }

    /* Show if tool has hidden tools */
    ,showHiddenTools  : function(tool){
    
        var self = $(this),
            tool_name = self.data('show-observe-tool'),
            extras = pageBuilder.editor.find('[data-observe-tool=' + tool_name + ']');

        if (typeof extras !== 'undefined') {

            if (!self.hasClass('active')) {
                self.addClass('active');
                extras.show()
            }else{
                self.removeClass('active');
                extras.hide() 
            }
        
        }
        
    }

    /* If element has text editor option */
    ,getElemText : function(self){

        var is_settings = self.data('editable');

        if (typeof is_settings !== 'undefined' && is_settings.length > 0) {

            var settings = is_settings.split('.');

            if(Editor.settings[settings[0]][settings[1]].includes('text-editor')){

                var content_text = typeof self.contents().get(0).nodeValue == 'string' ? self.contents().get(0).nodeValue : self.contents().get(0).text;

                if (content_text.length > 0){

                    if (Editor.chache_styles.hasOwnProperty(Editor.elem.attr('id')) ) {

                        Editor.chache_styles[Editor.elem.attr('id')]['text'] = Editor.createTextLang(content_text);

                    }else{

                        Editor.chache_styles[Editor.elem.attr('id')] = {'text': Editor.createTextLang(content_text)};

                    }

                    Editor.updateTextEditor();

                }

            }   

        }
        
    }

    /* Get active language */
    ,createTextLang : function(content_text){
    
        var lang_tool = pageBuilder.editor.find('#pb-lang-type'),
            element = Editor.chache_styles[Editor.elem.attr('id')];

        if (lang_tool.length) {

            var active_lang = lang_tool.find('span.active').data('lang');

            if (typeof element !== 'undefined' && element.hasOwnProperty('text')) {

                var lang_obj = element.text;

            }else{

                var lang_obj = {};

                lang_obj[active_lang] = content_text;

            }

        }

        return lang_obj
        
    }

    ,updateTextLang : function(content_text){
    
        var lang_tool = pageBuilder.editor.find('#pb-lang-type'),
            element = Editor.chache_styles[Editor.elem.attr('id')];

        if (lang_tool.length) {

            var active_lang = lang_tool.find('span.active').data('lang');

            if (typeof element !== 'undefined' && element.hasOwnProperty('text')) {

                var lang_obj = element.text;

                lang_obj[active_lang] = content_text;

            }

        }

        return lang_obj
        
    }

    /* Update text editor from Editor.chache_styles object */
    ,updateTextEditor : function(){
    
        var text_editor = pageBuilder.editor.find('[data-tool=text-editor]'),
            element = Editor.chache_styles[Editor.elem.attr('id')],
            lang_tool = pageBuilder.editor.find('#pb-lang-type');

        if (typeof element !== 'undefined' && element.hasOwnProperty('text')) {

            var text_object = element.text,
                active_lang = lang_tool.find('span.active').data('lang'),
                text_string = typeof text_object[active_lang] !== 'undefined' ? text_object[active_lang].trim() : '';

                text_editor.val(text_string);

                if (text_editor.val().length > 0) {
                    text_editor.trigger('change').attr("placeholder", "Type text here ...");

                }

                setTimeout(function(){text_editor.focus()},50)

        }
        
    }

    /* Update text editor from Editor.chache_styles object */
    ,updateElementText : function(){
    
        var text_editor = pageBuilder.editor.find('[data-tool=text-editor]');

        if(Editor.elem !== null){

            var text = Editor.elem.contents().get(0).nodeValue,
                node = Editor.elem.contents().get(0).nodeName;

            if (typeof text == 'string' && node == '#text'){

                Editor.elem.contents().get(0).nodeValue = text_editor.val();

            }else{

                Editor.elem.children().eq(0).text(text_editor.val());

            }

            Editor.chache_styles[Editor.elem.attr('id')]['text'] = Editor.updateTextLang(text_editor.val());

        }

        
    }

    /* Check if textNode is only spaces or tabs */
    ,checkForEmptyText : function(text){

        if (typeof text !== null && typeof text !== 'undefined' && text) {

            var string = text.replace(/\s/g, '');

            return string;

        }else{

            return false;

        }
        
    }

    /* Change active language in the text editor */
    ,changeInputLang : function(arg){
    
        var self = $(this),
            text_editor = pageBuilder.editor.find('[data-tool=text-editor]');

        if (!self.hasClass('active')) {

            self.addClass('active').siblings().removeClass('active');
            text_editor.focus();
            Editor.updateTextEditor();

        }
        
    }

    /* Show element image in sidebar image-tool */
    ,updateImageTool : function(){
    
        var media_tool = pageBuilder.editor.find('[data-media-preview]'),
            media_url = Editor.elem.find('[data-placeholder-image]').attr('src');

        if (typeof media_url !== 'undefined' && media_tool.length && media_url.indexOf('placeholder') == -1) {

            media_tool.css('background-image', 'url(' + media_url + ')');

        }
        
    }

    /* Change HTML of element */
    ,changeHTMLTags : function(){
        
        var self = $(this),
            value = self.val(),
            elem = pageBuilder.container.find('.pb-editing'),
            inner_html = elem.html(),
            nodes = Editor.getNodesAttr(elem);

        var new_html = '<'+ value + ' '+ nodes +'>' +inner_html+ '</'+ value +'>';

        elem.replaceWith(new_html);

        pageBuilder.container.find('.pb-editing').removeClass('pb-editing').trigger('click');
        
    }

    /* Get element HTML tag */
    ,getHTMLTag : function(){

        var html_tool = pageBuilder.editor.find('.pb-change-html-tag')
    
        if (html_tool.length !== 0) {

            var html_tag = Editor.elem[0].tagName;

            if (typeof html_tag !== 'undefined') {
                html_tool.val(html_tag);
            }

        }
        
    }

    /* Get all attributes from element */
    ,getNodesAttr : function(elem){

        var nodes = '', name, attr;
    
        elem.each(function() {
            $.each(this.attributes, function() {

                if(this.specified) {

                    name = this.name;
                    attr = this.nodeValue;

                    nodes += name + '="' + attr + '" ';

                }

            });
        });

        return nodes;
        
    }

    /* Adding or editing link in element */
    ,insertLink : function(arg){
    
        var self = $(this),
            val = self.val(),
            node_text = Editor.elem.contents().get(0).nodeValue,
            node_elem;

        if (val.length > 0) {

            if (Editor.elem.find('.pb-dynamic-link').length) {

                Editor.elem.find('.pb-dynamic-link').attr('href', val);

                return;

            }

            if (Editor.checkForEmptyText(node_text).length) {

                Editor.insertLinkHTML(val, node_text, node_elem); 

            }else{

                node_elem = Editor.elem.children().eq(0);

                Editor.insertLinkHTML(val, node_text, node_elem);  

            }


        }else{

            Editor.removeLinkHTML();

        }
    
    }

    /* Creating link HTML and appending to element */
    ,insertLinkHTML : function(val, node_text, node_elem){


        var link = document.createElement('a');

        link.href = val;
        link.text = node_text;
        link.className = 'pb-dynamic-link';

        if (typeof node_elem !== 'undefined'){

            link.appendChild(node_elem[0])

        }

        Editor.elem.contents().get(0).remove();
        Editor.elem.prepend(link);

        
    }

    /* Remove appended link HTML */
    ,removeLinkHTML : function(){
    
        var link = Editor.elem.find('.pb-dynamic-link');

        if (link.length) {

            var html_html = link.html();

            link.replaceWith(html_html); 

        }
        
    }

    /* Get link href attribute */
    ,getElemLink : function(){

        var elem = Editor.elem[0].tagName == 'A' ? Editor.elem[0] : Editor.elem.contents().get(0);
   
        if (elem.tagName == 'A') {

            pageBuilder.editor.find('.pb-ui-handler-link').val(elem.getAttribute("href"));

        }
        
    }

    /* Editing href attribute only if Editor.elem has a href attribute */
    ,editLink : function(){
    
        var self = $(this),
            val = self.val();

        if (Editor.elem.attr('href') !== 'undefined') {

            Editor.elem.attr('href', val); 

        }
        
    }

    /* Adding attributes to link target="_blank" or rel="nofollow" */
    ,addLinkAttributes : function(){
    
        var self = $(this),
            attr = self.data('link-attr').split(':'),
            elem = Editor.elem[0].tagName == 'A' ? Editor.elem[0] : Editor.elem.contents().get(0);

        if (self.prop('checked') && elem.tagName == 'A') {

            elem.setAttribute(attr[0], attr[1]);

        }else if(!self.prop('checked') && elem.tagName == 'A'){

            elem.removeAttribute(attr[0]);

        }
        
    }

    /* Send all styles to server */
    ,saveCss : function(){
    
    	var styles = $('head').find('[id^=pb-style]');

    	styles.each(function(){

    		console.log(styles.text());

    	})
    	
    }

    ,saveElementText  : function(){

        $.each(Editor.chache_styles, function(key, val){

            console.log(key, val.text);

        })
        
    }
}

var Media = {

    container: $('#pb-media-container'),

    init : function(){
    
        this.bind();
        
    }

    ,bind  : function(){
    
        pageBuilder.sidebar.on('click','.pb-ui-media-tool', Media.showMediaGallery);

        Media.container.on('click','.pb-media-item', Media.selectMediaImage);
        Media.container.on('dblclick','.pb-media-item', Media.applyImage);
        Media.container.on('click','#gs-pb-add-image', Media.applyImage);

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                Media.closeMediaGallery(); 
            }
        });
        
    }

    /* Show Media Gallery*/
    ,showMediaGallery : function(){
        
        var self = $(this),
            gallery = $('#pb-media-container');

        if (!gallery.hasClass('active')) {

            gallery.addClass('active');

            if (gallery.find('.pb-media-item').length == 0) {
                Media.loadMediaImages(self);
            }
        }
        
    }

    ,closeMediaGallery  : function(e){

        if (e) e.preventDefault();
    
        var gallery = $('#pb-media-container');

        if (gallery.hasClass('active')) {
            gallery.removeClass('active');
            Media.container.find('.pb-media-item').removeClass('active');
        }
        
    }

    /* Load Media Images  */
    ,loadMediaImages  : function(self){
    
        var media_url = 'ajax/media.json';

        $.ajax({
                url: media_url,
                type: 'post',
                dataType: 'json',
                data: {},
                success: function (data) {

                    if (data.images.length !== 0) {

                        Media.createMediaItem(data.images);

                    }

                }
            });
        
    }

    /* Create Media Grid */
    ,createMediaItem : function(data){

        var gallery_container = $('#pb-media-container .pb-media-grid'), grid_item;

        if (gallery_container.children().length == 0) {}

        for (var i = 0; i < data.length; i++) {

            grid_item = '<div class="pb-media-item" data-media-image="'+ data[i] +'">'+
                            '<div class="pb-media-image">'+
                                '<div class="pb-background" style="background-image: url('+ data[i] +');"></div>'+
                            '</div>'+
                        '</div>';

            gallery_container.append(grid_item);

        }
        
    }

    /* Selecting Media Image */
    ,selectMediaImage : function(){
    
        var self = $(this),
            button = $('#gs-pb-add-image');

        if (!self.hasClass('active')) {

            self.addClass('active').siblings().removeClass('active');
            button.addClass('active');

        }
        
    }

    ,applyImage : function(e){
        
        if (e) e.preventDefault();    
        
        var self = $(this),
            media_url = Media.container.find('.pb-media-item.active').data('media-image'),
            media_tool = pageBuilder.sidebar.find('[data-media-preview]');

        if (self.hasClass('active') && Editor.elem !== null && typeof media_url !== 'undefined') {

            Editor.elem.find('[data-placeholder-image]').attr('src',media_url);
            media_tool.css('background-image', 'url(' + media_url + ')');
            Media.closeMediaGallery();

        }
        
    }

}

var Colorpicker = {

    init : function($data){

        var color_inputs = $data.find('[data-colorpicker]');

        if (color_inputs.length) {

            this.spectrum(color_inputs);

        }
        
    }

    ,spectrum : function(color_inputs){

        if ($('.sp-container').length) {
            $('.sp-container').remove();
        }

        color_inputs.parent().each(function(){

            var self = $(this),
                input = self.find('input');

            self.spectrum({
                showInput: true,
                preferredFormat: "hex3",
                clickoutFiresChange: true,
                color: input.val(),
                showButtons: false,
                move: function(color) {
                    input.val(color).trigger('change');
                },
                change: function(color) {
                    input.val(color).trigger('change');
                }
            });

        })
        
    }

}