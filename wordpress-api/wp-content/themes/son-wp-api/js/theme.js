// console.log('we are ready!!!');

jQuery(document).ready( function() {

    jQuery("#api").html('Estamos prontos!!!');

    jQuery(".publish-post").click( function(e) {
        e.preventDefault(); 
        console.log('create')
        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
            },
            data:{
                'title' : 'Post from ajax',
                'status' : 'publish'
            }
        }).done( function ( response ) {
            updatePostList(response, true);
            console.log( "post publicado com sucesso" );
        });
     });

     jQuery(".show-posts").click( function(e) {
        e.preventDefault(); 
        console.log('show')

        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'GET',
            beforeSend: function(xhr){
                xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
            },
            }).done(function(response){
                updatePostList(response, false);
                console.log( "lista atualizada" );
            });
 
     });

    function updatePostList(posts, reload = false) {
    jQuery("#api-paginas").html('');
    if(reload) {
        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'GET',
            beforeSend: function(xhr){
                xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
            },
            }).done(function(response){
                updatePostList(response, false);
            });
    }else {
        posts.forEach(element => {
            jQuery("#api-paginas").append('<p>'+element.title.rendered+'</p>');
        });
    }
    }

});