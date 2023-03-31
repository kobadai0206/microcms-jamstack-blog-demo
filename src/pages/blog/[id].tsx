import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React from 'react';
import { client } from '../../../libs/client';
import { Blog } from '../../../types/blog';
import { renderToc } from '../../../libs/render-toc';
import { TableOfContents } from '@/components/talble-of-content';
import { Category } from '../../../types/category';
import Header from '@/components/header';

const BlogPage = ({ blog, category }: { blog: Blog; category: Category[] }) => {
	dayjs.extend(utc);
	dayjs.extend(timezone);

	const toc = renderToc(blog.body);

	const creatAt = dayjs
		.utc(blog.createdAt)
		.tz('Asia/Tokyo')
		.format('YYYY/MM/DD');

	return (
		<main className='m-auto w-5/6 '>
			<Header category={category} />
			<div className='flex justify-between items-center  mb-8'>
				<h1 className='text-3xl text-slate-700'>{blog.title}</h1>
				<p className='text-slate-500'>{creatAt}</p>
			</div>
			<div className='my-10'>
				{blog.toc_visible && <TableOfContents toc={toc} />}
			</div>
			<div
				className='mb-20'
				dangerouslySetInnerHTML={{
					__html: `${blog.body}`,
				}}
			/>
		</main>
	);
};

export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'blog' });

	const paths = data.contents.map((content: any) => `/blog/${content.id}`);
	return { paths, fallback: 'blocking' };
};

export const getStaticProps = async (context: any) => {
	const id = context.params.id;
	const data = await client.get({ endpoint: 'blog', contentId: id });
	const categoryData = await client.get({ endpoint: 'categories' });

	return {
		props: {
			blog: data,
			category: categoryData.contents,
		},
	};
};

export default BlogPage;
