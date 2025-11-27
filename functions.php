<?php
/**
 * Theme Functions
 * Add this code to your WordPress theme's functions.php file
 */

/**
 * Enqueue Training Tabs CSS and JavaScript
 */
function malik_enqueue_training_tabs_assets() {
    // Enqueue the fixed CSS for tabs
    wp_enqueue_style(
        'malik-training-tabs',
        get_template_directory_uri() . '/training-tabs-fixed.css',
        array(),
        '1.0.0',
        'all'
    );

    // Enqueue the JavaScript for tabs functionality
    wp_enqueue_script(
        'malik-training-tabs',
        get_template_directory_uri() . '/training-tabs.js',
        array(), // No dependencies
        '1.0.0',
        true // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'malik_enqueue_training_tabs_assets');

/**
 * Training Tabs Shortcode
 *
 * Usage: [training_tabs]
 *
 * This shortcode renders the complete training tabs section
 * including both "Alap tréning" and "VIP tréning" cards with
 * responsive tab navigation below 1140px.
 */
function malik_training_tabs_shortcode() {
    // Start output buffering
    ob_start();

    // Load the template part
    get_template_part('template-parts/training-tabs-section');

    // Return the buffered content
    return ob_get_clean();
}
add_shortcode('training_tabs', 'malik_training_tabs_shortcode');

/**
 * Optional: Add shortcode to Gutenberg
 * This makes the shortcode easier to use in the block editor
 */
function malik_register_training_tabs_block() {
    // Check if Gutenberg is available
    if (!function_exists('register_block_type')) {
        return;
    }

    // Register a shortcode block for easy insertion
    wp_enqueue_script(
        'malik-training-tabs-block',
        get_template_directory_uri() . '/training-tabs-block.js',
        array('wp-blocks', 'wp-element', 'wp-editor'),
        '1.0.0',
        true
    );
}
add_action('enqueue_block_editor_assets', 'malik_register_training_tabs_block');
