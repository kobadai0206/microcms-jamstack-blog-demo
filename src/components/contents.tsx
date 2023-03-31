import Link from 'next/link';
import React from 'react';
import { Blog } from '../../types/blog';

const Contents = ({ blogs }: { blogs: Blog[] }) => {
	return (
		<div>
			<ul className='flex-wrap md:flex content-between'>
				{blogs.map((blog) => (
					<Link
						key={blog.id}
						href={`/blog/${blog.id}`}
						className={`w-4/12 aspect-video p-4 hover:opacity-70 transition-all hover:scale-110 ${
							blog.eyecatch ? '' : 'items-center justify-center flex'
						}`}>
						<li className=''>
							{blog.eyecatch && (
								<img
									src={blog.eyecatch.url}
									width={200}
									height={100}
									alt=''
									className='w-full h-full aspect-video object-cover'
								/>
							)}
							{blog.title}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Contents;
