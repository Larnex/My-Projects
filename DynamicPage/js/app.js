$(function () {
    $("nav ul li a").click(function () {
        let page = $(this).attr('href');
        $("body").load(`../${page}`, function () {
            $("#main-content").hide(0, function () {
                $(this).slideDown("slow");
            });
        });

        return false;
    })
});