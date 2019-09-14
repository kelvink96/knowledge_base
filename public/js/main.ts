$(() => {
    $('#deleteArticle').on('click', (e) => {
        const id = $(e.target).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/article/' + id,
            success: (res) => {
                alert('Deleting article');
                window.location.href = '/';
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
});