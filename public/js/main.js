$(function () {
    $('#deleteArticle').on('click', function (e) {
        var id = $(e.target).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/article/' + id,
            success: function (res) {
                alert('Deleting article');
                window.location.href = '/';
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});
//# sourceMappingURL=main.js.map