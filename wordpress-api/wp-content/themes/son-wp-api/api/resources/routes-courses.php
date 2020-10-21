<?php

function my_list_course_func($request) {
    $data = [
        1 => 'PHP',
        2 => 'JAVASCRIPT',
        3 => 'PYTHON',
    ];
    $response = new WP_REST_Response( $data );
    return rest_ensure_response($response);
}

function my_show_course_func($request) {
    $data = [
        1 => 'PHP',
        2 => 'JAVASCRIPT',
        3 => 'PYTHON',
    ];

    // $index = $request['id'];
    $index = $request->get_param('id');

    if(!$data[$index]) {
        return new WP_Error( 'invalid-key', 'este id não existe', ['status' => 400] );
    }

    $responseData = [ $index => $data[$index] ];

    $response = new WP_REST_Response( $responseData );
    return rest_ensure_response($response);
}

function my_update_course_func($request) {
    $data = [
        1 => 'PHP',
        2 => 'JAVASCRIPT',
        3 => 'PYTHON',
    ];

    $index = $request->get_param('id');
    $newCourse = $request->get_json_params();

    if(!$newCourse['course']) {
        return new WP_Error( 'invalid-key', 'a chave deve ser course', ['status' => 400] );
    }

    $data[$index] = $newCourse['course'];

    $response = new WP_REST_Response( $data );

    return rest_ensure_response($response);
}

function my_create_course_func($request) {
    $data = [
        1 => 'PHP',
        2 => 'JAVASCRIPT',
        3 => 'PYTHON',
    ];

    $newCourse = $request->get_json_params();

    if(!$newCourse['course']) {
        return new WP_Error( 'invalid-key', 'a chave deve ser course', ['status' => 400] );
    }

    array_push($data, $newCourse['course']);

    $response = new WP_REST_Response( $data );

    return rest_ensure_response($response);
}

function my_delete_course_func($request) {
    $data = [
        1 => 'PHP',
        2 => 'JAVASCRIPT',
        3 => 'PYTHON',
    ];

    $id = $request->get_param('id');

    $newData = array_filter($data, function($k) use ($id) {
        return $k != $id;
    }, ARRAY_FILTER_USE_KEY);

    if($data === $newData) {
        return new WP_Error( 'invalid-id', 'este id não existe', ['status' => 400] );
    }

    $response = new WP_REST_Response( $newData );

    return rest_ensure_response($response);
}


add_action( 'rest_api_init', function () {

    register_rest_route( 'son/v1', '/cursos', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'my_list_course_func',
        'args' => array(),
        'permission_callback' => function () {
            return current_user_can( 'read' );
        }
    ));

    register_rest_route( 'son/v1', '/cursos/(?P<id>\d+)', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'my_show_course_func',
        'args' => array(
            'id' => array(
                'validate_callback' => 'is_numeric'
            ),
        ),
        'permission_callback' => function () {
            return current_user_can( 'read' );
        }
    ));

    register_rest_route( 'son/v1', '/cursos/(?P<id>\d+)', array(
        'methods' => WP_REST_Server::EDITABLE,
        'callback' => 'my_update_course_func',
        'args' => array(
            'id' => array(
                'validate_callback' => 'is_numeric'
            ),
        ),
        'permission_callback' => function () {
            return current_user_can( 'edit_posts' );
        }
    ));

    register_rest_route( 'son/v1', '/cursos', array(
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'my_create_course_func',
        'args' => array(),
        'permission_callback' => function () {
            return current_user_can( 'publish_posts' );
        }
    ));

    register_rest_route( 'son/v1', '/cursos/(?P<id>\d+)', array(
        'methods' => WP_REST_Server::DELETABLE,
        'callback' => 'my_delete_course_func',
        'args' => array(
            'id' => array(
                'validate_callback' => 'is_numeric'
            ),
        ),
        'permission_callback' => function () {
            return current_user_can( 'delete_others_posts' );
        }
    ));
});


// Create the response object
// $response = new WP_REST_Response( $data );

// Add a custom status code
// $response->set_status( 201 );

// METHODS
// WP_REST_Server::READABLE  -> GET
// WP_REST_Server::EDITABLE  -> PUT
// WP_REST_Server::CREATABLE -> POST
// WP_REST_Server::DELETABLE -> DELETE