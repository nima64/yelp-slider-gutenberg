/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {TextControl,Placeholder,Button} from '@wordpress/components';
import {ReviewSlider} from './slider';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */


async function updateReviews(endpoint,url,api_key,setAttributes)
{
	let fd = new FormData();
	fd.append('key',api_key);
	fd.append('url',url);

	let reviewsJSON = await fetch( endpoint,{
		method:'POST',
		headers:{
			'Authorization':'Bearer ' + api_key 
		},
		body:fd
	})
	.then(
		response => response.json()
	)
	.then(json => {
		if(url && api_key){
			setAttributes({reviews:json.reviews});
		}
	})
	.catch( error => console.log(error)) ;
}


export default function Edit({attributes,setAttributes}) {
	const {editMode,isLoading} = attributes;

	const _updateReviews = () =>{
		const endpoint = "http://localhost/wordpress/wp-json/yelp-reviews-slider/reviews"; 

		let inputs = document.body.querySelectorAll('.api-input_container input[type="text"]');
		let url = inputs[0].value;
		let api_key = inputs[1].value;
		updateReviews(endpoint,url,api_key,setAttributes);
		setAttributes({editMode:false,isLoading:true});
		console.log(attributes.reviews)
	}

	const getLoadingPlaceHolder = () => (
		<Placeholder
			isColumnLayout={true}
			label="Please wait while we load your data"
		>
		</Placeholder>
	);

	const getNothingPlaceHolder = () => (
		<Placeholder
			isColumnLayout={true}
			label="Your Yelp api hasn't been saved yet"
		>
		</Placeholder>
	);

	const getEditPlaceHolder = () => (
		<Placeholder
			isColumnLayout={true}
			label="Yelp Reviews"
			icon="editor-code"
			instructions="Add your yelp api key and URL you will like to grab the reviews from, it will display 3 of your reviews on your page"
		>
			<div>URL</div>
			<TextControl className="api-input_container" 
				value={attributes.reviews_url}
				onChange={(reviews_url)=>setAttributes({reviews_url})} 
			/>
			<div>API KEY</div>
			<TextControl className="api-input_container" 
				value={attributes.api_key}
				onChange={(api_key)=>setAttributes({api_key})} 
			/>
			<div>
				<Button
					isPrimary={true}	
					onClick={_updateReviews}
				>
					Save
				</Button>
			</div>
		</Placeholder>
	);

	const getSliderPlaceHolder = () => (
		isLoading?
			getLoadingPlaceHolder()
		:
			getNothingPlaceHolder()
	);

	if( editMode) {
		return getEditPlaceHolder()
	}

	return (
		<>
		{
		attributes.reviews ?
			<ReviewSlider cardsData={attributes.reviews}/>
		:
			getSliderPlaceHolder()
		}
		</>
	);
}
