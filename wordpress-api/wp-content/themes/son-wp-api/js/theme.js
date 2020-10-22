// console.log('we are ready!!!');

jQuery(document).ready( function() {

    jQuery(".publish-post").click( function(e) {
        e.preventDefault(); 

        jQuery.ajax({
            url: wpApiSettings.root + 'wp/v2/posts',
            method: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', wpApiSettings.nonce );
                // xhr.setRequestHeader( 'Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTYwMzMxMzg1NCwibmJmIjoxNjAzMzEzODU0LCJleHAiOjE2MDM5MTg2NTQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19._gNYbm5uuaQmuh-pvu3Z-bjiJ41GkF-EA_6gAC_e8lg' );
            },
            data:{
                'title' : 'Post from ajax 1',
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
                // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTYwMzMxMzg1NCwibmJmIjoxNjAzMzEzODU0LCJleHAiOjE2MDM5MTg2NTQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19._gNYbm5uuaQmuh-pvu3Z-bjiJ41GkF-EA_6gAC_e8lg' 
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
    jQuery("#api-posts").html('');
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
            jQuery("#api-posts").append('<p>'+element.title.rendered+'</p>');
        });
        console.log( "lista atualizada" );
    }
    }

});