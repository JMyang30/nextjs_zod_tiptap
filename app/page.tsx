import Link from 'next/link';
import React from 'react';

const page = () => (
	<>
		<div>page</div>
		<ul>
			<li>
				<Link href="/write">wrtie page</Link>
			</li>
		</ul>
	</>
);

export default page;
