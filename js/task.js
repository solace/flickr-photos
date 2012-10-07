var makeLikeable = (function ($, undefined) {
    var hearts = $.browserCookie('heartStore');
    if (hearts == undefined)
        hearts = {};
    else
        hearts = JSON.parse(hearts);

    /**
     * Add heart buttons to photos
     *
     * Reads from heartStore to preset the button state.
     */
    function addButtons() {
        $.each($('#photos .photo img'),function(i,img) {
            img = $(img);
            var className = 'icon-heart';
            if (hearts[img.attr('src')] == undefined)
                className += '-empty';
            var button = $('<a class="btn" href="#"><i class="'+className+'"></i></a>').on('click',toggleHeart);
            img.parent().prepend(button);
        });
    }

    /**
     * Toggles the heart and heart empty buttons.
     *
     * Writes to heartStore to persist selections.
     *
     * Note: There is a known limitation: As the photos might scroll off
     * the API feed, if they have been hearted, they will remain in the
     * cookie JSON object.  There is no cleanup.  Aside from expiring the
     * whole cookie, individual items would need to be expired in some way.
     *
     * @param e
     */
    function toggleHeart(e) {
        e.preventDefault();
        var o = $(this);
        var icon = o.find('i');
        var img = o.next('img').get(0);
        if (icon.hasClass('icon-heart-empty')) {
            icon.removeClass('icon-heart-empty').addClass('icon-heart');
            hearts[img.src] = true;
        }
        else {
            icon.removeClass('icon-heart').addClass('icon-heart-empty');
            delete(hearts[img.src]);
        }
        $.browserCookie('heartStore',JSON.stringify(hearts));
    }

    return function() {
        addButtons();
    };
}(jQuery));