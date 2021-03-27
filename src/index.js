/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import {ToolbarGroup} from '@wordpress/components';
import { BlockControls, useBlockProps, AlignmentToolbar} from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/yelp-reviews-slider-block', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,
	attributes:{
		title:{
			type: "string",
			default: "Yelp Reviews"
		},
		reviews:{
			type: "array"
		},
		editMode: {
			type: 'boolean',
			default: true,
		},
		isLoading: {
			type: 'boolean',
			default: false,
		},
		reviews_url:{
			type: "string"
		},
		api_key:{
			type: "string"
		},
		client_id:{
			type: "string"
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit(props){
		const {attributes,setAttributes} = props;
		const {editMode} = attributes;
		const getBlockControls = () =>{
			return (
			<BlockControls>
				<AlignmentToolbar
				/>
				<ToolbarGroup
					controls={[
						{
							icon:'edit',
							title:'EDIT',
							onClick: () => {
								setAttributes({ editMode: !editMode })
								//dont render until data recieved
								// console.log(editMode);
							},
							isActive: editMode
						}
					]}
				/>
			</BlockControls>
			);
		};

		return (
			<div { ...useBlockProps() }>
				{getBlockControls()}
				<Edit {...props} />
			</div>
		)

	},

	/**
	 * @see ./save.js
	 */
	save,
} );
