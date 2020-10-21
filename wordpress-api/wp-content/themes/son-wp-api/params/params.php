  
<?php

function my_awesome_func( $request ) {
    // $posts = get_posts( array(
    //     'author' => $request['param'],
    // ));

    // if ( empty( $posts ) ) {
    //     return null;
    // }

    // $param = $request['param'];
    $param = $request->get_param('param');

    // $parameters = $request->get_body_params();
    // $parameters = $request->get_json_params();
    $parameters = $request->get_file_params();

    return [$param, $parameters];
}

// http://localhost:8000/wp-json/custom/v1/author/1
add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1', '/author/(?P<param>\d+)', array(
      'methods' => 'GET',
      'callback' => 'my_awesome_func',
    ));
});

add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1', '/author/(?P<param>\d+)', array(
      'methods' => 'POST',
      'callback' => 'my_awesome_func',
    ));
});

// $param = $request['some_param'];
// $param = $request->get_param( 'some_param' );

// The individual sets of parameters are also available, if needed:
// $parameters = $request->get_url_params();
// $parameters = $request->get_query_params();
// $parameters = $request->get_body_params();
// $parameters = $request->get_json_params();
// $parameters = $request->get_default_params();

// $parameters = $request->get_file_params();