export type Blog = {
	id: string;
	title: string;
	body: string;
	eyecatch: {
		url: string;
	};
	category: string;
	publishedAt: number;
	createdAt: number;
	toc_visible: boolean;
};
