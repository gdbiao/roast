/**
 * Defines the API route we are using.
 */
var api_url = '';
var gaode_maps_js_api_key = '2cb116060897f77887039277c239f690';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://roast.test/api/v1';
        break;
    case 'production':
        api_url = 'http://roast.demo.laravelacademy.org/api/v1';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
}