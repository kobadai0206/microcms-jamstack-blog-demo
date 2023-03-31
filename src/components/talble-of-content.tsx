type Toc = {
	id: string;
	text: string;
};

export const TableOfContents = ({ toc }: { toc: Toc[] }) => {
	return (
		<div className='flex'>
			<p className='border-slate-500 border-solid border-y pr-10 py-8'>目次</p>
			<ul className='border-slate-500 border-solid border-y space-y-2 py-6'>
				{toc.map((data) => (
					<li key={data.id}>
						<a href={`#${data.text}`}>{data.text}</a>
					</li>
				))}
			</ul>
		</div>
	);
};
