/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {ReviewSlider} from './slider';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes,setAttributes}) {
	const getMissingText = () => {
		return (
			<p { ...useBlockProps.save() }>
				{ __(
					'Yelp Reviews Slider Block – hello from the saved content!',
					'yelp-reviews-slider-block'
				) }
			</p>
		)
	}
	return (
		<>
		{
			attributes.reviews?
				<ReviewSlider cardsData={attributes.reviews}/>
			:
				getMissingText()
		}
		</>
	);
}
