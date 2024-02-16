import Link from 'next/link';
import React from 'react';
import LucideIcon from '../icons/LucideIcon';

function Header() {
	return (
		<header>
			<nav>
				<ul className="flex p-3">
					<li className="mr-2">
						<Link href="/login" title="login">
							<LucideIcon name="User" size={24} />
						</Link>
					</li>
					<li className="mr-2">
						<Link href="/write" title="write">
							<LucideIcon name="Pencil" size={24} />
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
