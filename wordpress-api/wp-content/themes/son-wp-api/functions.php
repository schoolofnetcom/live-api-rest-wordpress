<?php

// carregando nossas rotas
require_once (get_template_directory() . '/params/params.php');
require_once (get_template_directory() . '/api/resources/routes-courses.php');



function loadMyAssets() {

    wp_enqueue_script('theme-js', get_template_directory_uri() . '/js/theme.js', ['jquery'], '1.0', true);

    wp_localize_script( 'theme-js', 'wpApiSettings', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'custom' => 'schoolofnet'
    ));

}

add_action('wp_enqueue_scripts', 'loadMyAssets');


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
