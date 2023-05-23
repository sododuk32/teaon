import React, { useEffect, useState } from 'react';
import style from './Navigation.module.css';
import Hamburger from '@/components/common/Hamburger';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavigationProps {
	isMobile: boolean;
	isNavopen: boolean;
}
/**
 * @param isMobile:해당 컴포넌트가 열린 환경이 모바일인지 유무.
 * @param isNavopen:네비게이션바가 열렸는지 유무
 * @param NavigationProps: 해당 함수의 type Interface
 * @var thisColor: Navopen변수에 따라 색상 변경
 * @var Hamburger : Hamburger라는 메뉴에 사용되는 svg 를 색상,크기 값을 넣어 호출
 */
function Navigation({ isMobile, isNavopen }: NavigationProps) {
	const [thisColor, setcolor] = useState('');

	useEffect(() => {
		console.log(thisColor);
		if (isNavopen) {
			setcolor('#0B1D38');
		} else {
			setcolor('#999DA0');
		}
	}, [isNavopen, thisColor]);

	return (
		<div className={style.NavBox}>
			{isNavopen ? (
				<div className={style.NavContainer}>
					<ul className={style.Ulist}>
						<li>
							<Link href={'/about'}>ABOUT</Link>
						</li>
						<li>
							<Link href={'/property'}>PROPERTY</Link>
						</li>
						<li>
							<Link href={'/interior'}>INTERIOR</Link>
						</li>
					</ul>
				</div>
			) : null}
			<div className={style.NavBtn}>
				{isMobile ? (
					<Hamburger height={8} width={8} color={thisColor} />
				) : (
					<Hamburger height={6} width={6} color={thisColor} />
				)}
			</div>
		</div>
	);
}

export default Navigation;
