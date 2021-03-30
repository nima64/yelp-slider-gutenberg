<?php
/**
 * Plugin Name:     Yelp Reviews Slider Block
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     yelp-reviews-slider-block
 *
 * @package         create-block
 */


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
require __DIR__ . '/vendor/autoload.php';
use GuzzleHttp\Psr7\Request;

function create_block_yelp_reviews_slider_block_init() {
	register_block_type_from_metadata( __DIR__ );

	//GLIDE JS
    $core = "https://cdn.jsdelivr.net/npm/@glidejs/glide@latest/dist/css/glide.core.min.css"; 
    $theme = "https://cdn.jsdelivr.net/npm/@glidejs/glide@latest/dist/css/glide.theme.min.css";
    wp_register_style('glide_core',$core);
    wp_register_style('glide_theme',$theme);
    wp_register_style('glide_styles',false,['glide_core','glide_theme']);

    wp_register_script('glidejs',
        'https://cdn.jsdelivr.net/npm/@glidejs/glide@latest/dist/glide.min.js'
    );
    wp_register_script('yelp-reviews-slider_front-end',
        plugins_url('slider_script.js',__FILE__) ,
    );

	wp_enqueue_style('glide_styles');
	wp_enqueue_script('glidejs');
	add_action('wp_enqueue_scripts','loadFrontEndScripts');

}

function loadFrontEndScripts(){
	if (has_block('create-block/yelp-reviews-slider-block')) {
		wp_enqueue_script('yelp-reviews-slider_front-end');
	}
}

function reviews_endpoint($request){
	$url = isset($_POST['url']) ? $_POST['url'] : ''; 
	$api_key =  isset($_POST['key']) ? $_POST['key'] : '';
	if (!empty($api_key) && !empty($url)){
		$client = new GuzzleHttp\Client();
		$res = $client->request('GET',$url,[
			'headers' => [
				'Authorization' => 'Bearer ' . $api_key 
			]
		]);
		return json_decode($res->getBody()); //wordpresss will encode back into a json,so needs to be php ary
	}

	return ['ERROR' => 'api key and client id is required'];
}

function register_api_route(){
	register_rest_route(
		'yelp-reviews-slider',
		'reviews',[
			'methods' => 'POST',
			'callback' => 'reviews_endpoint',
		]
		
	);
}
add_action('rest_api_init', 'register_api_route');
add_action( 'init', 'create_block_yelp_reviews_slider_block_init' );
