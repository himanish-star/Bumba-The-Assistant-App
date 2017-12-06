$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        let currentAttrValue = $(this).attr('href');
        e.preventDefault();
        // Show/Hide Tabs
        let alpha = '.tabs ' + currentAttrValue;
        $(alpha).fadeIn(400).siblings().hide();
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');
            });
});

// Show/Hide Tabs
