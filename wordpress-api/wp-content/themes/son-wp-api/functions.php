<?php

// PROTEGENDO ROTAS PARA USUÁRIOS NÃO LOGADOS
// add_filter( 'rest_authentication_errors', function( $result ) {

//     if ( true === $result || is_wp_error( $result ) ) {
//         return $result;
//     }

//     if ( ! is_user_logged_in() ) {
//         return new WP_Error(
//             'rest_not_logged_in',
//             __( 'Ops! Favor faça login antes de buscar dados.' ),
//             array( 'status' => 401 )
//         );
//     }

//     return $result;
// });

// INSERINDO OBJETO NO JAVASCRIPT PARA UTILIZAR
function loadMyAssets() {

    wp_enqueue_script('theme-js', get_template_directory_uri() . '/js/theme.js', ['jquery'], '1.0', true);

    wp_localize_script( 'theme-js', 'wpApiSettings', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'custom' => 'schoolofnet',
        'live' => 'wordpress-api'
    ));

}

add_action('wp_enqueue_scripts', 'loadMyAssets');

// FILTRO PARA ALTERAR CONFIGURAÇÕES DO POST
// add_filter( 'register_post_type_args', 'my_post_type_args', 10, 2 ); 
function my_post_type_args( $args, $post_type ) {
 
    if ( 'book' === $post_type ) {
        $args['show_in_rest'] = false;
 
        // Optionally customize the rest_base or rest_controller_class
        // $args['rest_base']             = 'books';
        // $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
    }
 
    return $args;
}


// carregando nossas rotas
require_once (get_template_directory() . '/custom/params.php');
require_once (get_template_directory() . '/api/resources/routes-courses.php');
// registrando cpt
require_once (get_template_directory() . '/cpt/books.php');