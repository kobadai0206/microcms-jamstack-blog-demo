import Link from 'next/link';
import React from 'react';
import { Category } from '../../types/category';

const Header = ({ category }: { category: Category[] }) => {
	return (
		<div className='flex items-center justify-between px-3'>
			<div className='my-7 items-center mb-8'>
				<Link href='/' className='w-1/4 block'>
					<h2 className='text-slate-500 font-extrabold md:text-7xl text-3xl '>
						Blog
					</h2>
				</Link>
			</div>
			<div>
				<ul className='flex space-x-5'>
					{category.map((category) => (
						<li key={category.id}>
							<Link href={`/category/${category.id}`}>{category.name}</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Header;
