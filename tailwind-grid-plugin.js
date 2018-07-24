// https://github.com/tailwindcss/plugin-examples/blob/master/plugins/css-grid/index.js
// http://korywakefield.com/iota/

const _ = require('lodash');

module.exports = ({ grids = _.range(1, 13), gaps = {}, variants = ['responsive'] }) => {
	return ({ e, addUtilities }) => {
		addUtilities(
			[
				{ '.grid': { display: 'grid' } },
				{ '.grid-dense': { gridAutoFlow: 'dense' } },
				..._.map(gaps, (size, name) => ({
					[`.grid-gap-${e(name)}`]: { gridGap: size }
				})),
				...grids.map(columns => ({
					[`.grid-columns-${columns}`]: {
						gridTemplateColumns: `repeat(${columns}, 1fr)`
					}
				})),
				..._.range(1, _.max(grids) + 1).map(span => ({
					[`.col-span-${span}`]: {
						gridColumnStart: `span ${span}`
					}
				})),
				..._.range(1, _.max(grids) + 2).map(line => ({
					[`.col-start-${line}`]: {
						gridColumnStart: `${line}`
					},
					[`.col-end-${line}`]: {
						gridColumnEnd: `${line}`
					}
				})),
				{
					'.grid-justify-center': {
						justifyItems: 'center'
					}
				}
			],
			variants
		);
	};
};
