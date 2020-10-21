// console.log('we are ready!!!');

jQuery(document).ready( function() {

    jQuery("#api").html('Estamos prontos!!!');

    jQuery(".publish-post").click( function(e) {
        e.preventDefault(); 

        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
                xhr.setRequestHeader( 'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcy1hcGkiLCJpYXQiOjE2MDMzMTE3MzIsIm5iZiI6MTYwMzMxMTczMiwiZXhwIjoxNjAzOTE2NTMyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.PWeKaqc6q4tgFoSSh5Oqko-9_pSS8PDHBGdR6R1kFXs' );
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

        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'GET',
            headers: {  
                'X-WP-Nonce': wpApiSettings.nonce,
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcy1hcGkiLCJpYXQiOjE2MDMzMTE3MzIsIm5iZiI6MTYwMzMxMTczMiwiZXhwIjoxNjAzOTE2NTMyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.PWeKaqc6q4tgFoSSh5Oqko-9_pSS8PDHBGdR6R1kFXs' 
            },
            success: function(response) {
                console.log('success entered')
                updatePostList(response, false);
            },
            error: function(response) {
                console.log(response);
            }
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
        console.log( "lista atualizada" );
    }
    }

});