## About ##
A slider block for wordpress gutenberg editor  
To generate the slider add your yelp api and the url of the business you'd like to fetch reviews from.  
NOTE: the yelp api only allows 3 reviews.

## How does it work? ## 
When you input your url and api key, the data is sent through fetch to a local endpoint in your server which will   
make an api request then return a reviews json

The endpoint is created under your-base-url/wp-json/yelp-reviews-slider/reviews see yelp-reviews-slider.php for more info,

## Installation ##
npm install  
php composer.phar install 

## Built with ##
Glidejs  
GuzzleHttp / CURL  
Gutenberg / React

