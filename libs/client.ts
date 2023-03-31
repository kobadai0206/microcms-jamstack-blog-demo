import { createClient } from 'microcms-js-sdk';

export const client = createClient({
	serviceDomain: 'kobadaiblog',
	apiKey: process.env.API_KEY,
});
