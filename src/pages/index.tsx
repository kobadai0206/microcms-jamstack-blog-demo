import Contents from '@/components/contents';
import Header from '@/components/header';
import { Pagination } from '@/components/pagination';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { client } from '../../libs/client';
import { Blog } from '../../types/blog';
import { Category } from '../../types/category';

export default function Home({
	blogs,
	totalCount,
	category,
}: {
	blogs: Blog[];
	totalCount: number;
	category: Category[];
}) {
	return (
		<main className='m-auto w-5/6 '>
			<Header category={category} />
			<Contents blogs={blogs} />
			<div className='mb-20 mt-10 items-center justify-center flex'>
				<Pagination id={1} totalCount={totalCount} />
			</div>
		</main>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await client.get({
		endpoint: 'blog',
		queries: { offset: 0, limit: 6 },
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
