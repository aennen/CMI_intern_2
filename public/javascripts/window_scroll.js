function window_scroll(page) {
        $("#" + page).animate({scrollTop: 0}, 600, function(e) {
            e.preventDefault();
        });
            }