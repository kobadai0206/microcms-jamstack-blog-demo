import Contents from '@/components/contents';
import Header from '@/components/header';
import { GetStaticProps } from 'next';
import React from 'react';
import { client } from '../../../libs/client';
import { Blog } from '../../../types/blog';
import { Category } from '../../../types/category';

type Context = {
	params: { id: string };
	locales: undefined;
	locale: undefined;
	defaultLocale: undefined;
};

const CategoryPageId = ({
	blogs,
	totalCount,
	category,
}: {
	blogs: Blog[];
	totalCount: number;
	category: Category[];
}) => {
	if (blogs.length === 0) {
		return (
			<div className='m-auto w-5/6'>
				<Header category={category} />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2'>
					ブログコンテンツがありません
				</div>
			</div>
		);
	}

	return (
		<main className='m-auto w-5/6 '>
			<Header category={category} />
			<Contents blogs={blogs} />
			{/* <div className='mb-20 mt-10 items-center justify-center flex'>
				<Pagination id={router.query.id} totalCount={totalCount} />
			</div> */}
		</main>
	);
};

export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'categories' });

	const paths = data.contents.map((content: any) => `/category/${content.id}`);
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
	const id = context.params.id;
	const data = await client.get({
		endpoint: 'blog',
		queries: { filters: `category[equals]${id}` },
	});
	const categoryData = await client.get({ endpoint: 'categories' });

	return {
		props: {
			blogs: data.contents,
			totalCount: data.totalCount,
			category: categoryData.contents,
		},
	};
};

export default CategoryPageId;
