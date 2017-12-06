$(document).ready(function() {
    $('.tabs .tab-links a').on('click', function(e)  {
        let currentAttrValue = $(this).attr('href');
        e.preventDefault();
        // Show/Hide Tabs
        let alpha = '.tabs ' + currentAttrValue;
        $(alpha).slideDown(400).siblings().slideUp(400);

        console.log($('#exampleModalLabel').position);
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

    });
});

// Show/Hide Tabs
