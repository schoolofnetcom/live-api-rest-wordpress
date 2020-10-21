  
<?php

function my_awesome_func_params( $request ) {
    $param = $request['param'];
    // $param = $request->get_param('param');

    // $parameters = $request->get_body_params();
    $parameters = $request->get_json_params();
    // $parameters = $request->get_query_params();
    // $parameters = $request->get_url_params();

    return [$param, $parameters];
}

// http://localhost:8000/wp-json/custom/v1/route/1
add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1/route', '/(?P<param>\d+)', array(
      'methods' => 'GET',
      'callback' => 'my_awesome_func_params',
    ));
});


function my_awesome_func_file( $request ) {
  $parameters = $request->get_file_params();

  return [$parameters];
}

// http://localhost:8000/wp-json/custom/file/v1/route/1
add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/file/v1', '/route', array(
      'methods' => 'POST',
      'callback' => 'my_awesome_func_file',
    ));
});
