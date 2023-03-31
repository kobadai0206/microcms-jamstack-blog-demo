import Contents from '@/components/contents';
import Header from '@/components/header';
import { Pagination } from '@/components/pagination';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { client } from '../../../../libs/client';
import { Blog } from '../../../../types/blog';
import { Category } from '../../../../types/category';

const PER_PAGE = 6;

export default function BlogPageId({
	blogs,
	totalCount,
	category,
}: {
	blogs: Blog[];
	totalCount: number;
	category: Category[];
}) {
	const router = useRouter();

	return (
		<>
			<main className='m-auto w-5/6 '>
				<Header category={category} />
				<Contents blogs={blogs} />
				<div className='mb-20 mt-10 items-center justify-center flex'>
					<Pagination id={router.query.id} totalCount={totalCount} />
				</div>
			</main>
		</>
	);
}

export const getStaticPaths = async () => {
	const repos = await client.get({ endpoint: 'blog' });

	const range = (start: number, end: number) =>
		[...Array(end - start + 1)].map((_, i) => start + i);

	const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
		(repo) => `/blog/page/${repo}`
	);

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
	const id = context.params.id;

	const data = await client.get({
		endpoint: 'blog',
		queries: { offset: (id - 1) * 6, limit: 6 },
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
