$.fn.outside = function(method,once) {
    
    var $this = this;
    
    $this.unbindOutsideClick()

    $(window).bind('click',function(e) {
        var click_function = arguments.callee;

        $this.data('window_outside_click', click_function)

        if( !$this.is(e.target) && $(e.target).parents().filter(function(){
            return $this.is(this)
        }).length == 0 ) {
            $this.trigger('outside', e)
            if(once) {
                $this.unbind('outside', method)
                $(window).unbind('click', click_function)
            }
        }
    })

    $this.on('outside', method)

    return this;
}

$.fn.unbindOutsideClick = function() {
    var click_handler = this.data('window_outside');
    $(window).unbind('click', click_handler)
}

jQuery.fn.closestToOffset = function(offset) {

    var el = null, el_offset,
        x = offset.left,
        y = offset.top,
        distance,
        dx,
        dy,
        min_distance;

    this.each(function() {

        var $t = $(this);
            el_offset = $t.offset();
            right = el_offset.left + $t.width();
            bottom = el_offset.top + $t.height();

        if (x >= el_offset.left && x <= right && y >= el_offset.top && y <= bottom) {
            el = $t;
            return false;
        }

        var offsets = [
            [el_offset.left, el_offset.top],
            [right, el_offset.top],
            [el_offset.left, bottom],
            [right, bottom],
        ];
        
        for (var off in offsets) {

            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            distance = Math.sqrt(dx * dx + dy * dy);

            if (min_distance === undefined || distance < min_distance) {
                min_distance = distance;
                el = $t;
            }
        }
    });

    return el;
};
