import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

const PER_PAGE = 6;

export const Pagination = ({
	totalCount,
	id,
}: {
	totalCount: number;
	id: any;
}) => {
	const back = Number(id) - 1;
	const next = Number(id) + 1;
	const range = (start: number, end: number) =>
		[...Array(end - start + 1)].map((_, i) => start + i);

	// const pagination = (c: any, m: any) => {
	// 	var current = c,
	// 		last = m,
	// 		delta = 2,
	// 		left = current - delta,
	// 		right = current + delta + 1,
	// 		range = [],
	// 		rangeWithDots = [],
	// 		l;

	// 	for (let i = 1; i <= last; i++) {
	// 		if (i == 1 || i == last || (i >= left && i < right)) {
	// 			range.push(i);
	// 		}
	// 	}

	// 	for (let i of range) {
	// 		if (l) {
	// 			if (i - l === 2) {
	// 				rangeWithDots.push(l + 1);
	// 			} else if (i - l !== 1) {
	// 				rangeWithDots.push('...');
	// 			}
	// 		}
	// 		rangeWithDots.push(i);
	// 		l = i;
	// 	}

	// 	return rangeWithDots;
	// };
	// const paginationNumbers = pagination(
	// 	range,
	// 	range(1, Math.ceil(totalCount / PER_PAGE)).length
	// );

	return (
		<ul className='flex space-x-6 items-center'>
			{back !== 0 && (
				<Link href={`/blog/page/${back}`} className=' p-2'>
					<ArrowBackIosNewIcon />
				</Link>
			)}
			{range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
				<li
					key={index}
					className={`border w-10 h-10 items-center flex justify-center rounded-full ${
						Number(id) === number ? 'bg-slate-300' : ''
					}`}>
					<Link href={`/blog/page/${number}`} className={`px-4 py-2 `}>
						{number}
					</Link>
				</li>
			))}
			{Number(id) !== Math.ceil(totalCount / PER_PAGE) && (
				<Link href={`/blog/page/${next}`} className=' p-2'>
					<ArrowForwardIosIcon />
				</Link>
			)}
		</ul>
	);
};
