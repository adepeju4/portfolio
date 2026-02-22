import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import {markdownSchema} from 'sanity-plugin-markdown'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? import.meta.env.VITE_SANITY_PROJECT_ID ?? 'nbo9fpie';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? import.meta.env.VITE_SANITY_DATASET ?? 'production';

export default defineConfig({
	name: 'portfolio-studio',
	title: 'Portfolio',

	projectId,
	dataset,

	plugins: [
		structureTool(),
		markdownSchema(),
		visionTool({ defaultApiVersion: '2024-01-01' })
	],

	schema: {
		types: schemaTypes
	},

	basePath: '/studio'
});
