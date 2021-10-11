$(document).ready(function () {
    $('li').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + id,
            success: function(response) {
                alert(`${$target.attr('data-taskName')} removed !`);
                window.location.href = "/";
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
})