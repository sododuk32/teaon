import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import style from './about.module.css';
import './../../public/fonts/fonts.css';
import Navigation from '@/components/common/Navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
function about() {
	const [isMobile, setIsmobile] = useState<boolean>(false);
	const [isNavOpen, setisNavOpen] = useState<boolean>(false);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		document.body.style.margin = '0';
	});
	function NavFnc() {
		return setisNavOpen(!isNavOpen);
	}
	return (
		<motion.section
			className={style.aboutBody1}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: [0.09, 0.03, 0.19, 0.72], duration: 3 }}
			viewport={{ once: true }}
		>
			<div className={style.NavBtn} onClick={NavFnc}>
				<Navigation isMobile={isMobile} isNavopen={isNavOpen} />
			</div>
			<div className={style.aboutBody2}>
				<Link href={'/'}>
					<article className={style.logoBox}>
						<Image alt='TeaonLogo' src='/logoImg/logo.png' fill={true} />
					</article>
				</Link>
				<article className={style.aboutText}>
					<ul className={style.aboutListBox}>
						<li>
							<h1>ABOUT</h1>
						</li>
						<li>
							<span>끈임없는 도전과 강인함을 바탕으로 </span>
							<span>고객들에게 최상의 서비스를 제공하는 태온입니다.</span>
						</li>
						<li>
							<span>태온의 주요 가치 중 하나는 끊임없는 도전입니다.</span>
							<span>혁신적인 기술과 첨단 장비를 적극적으로 도입하여</span>
							<span>고객들에게 가장 효율적이고 안정적인</span>
							<span>해결책을 제공하고 있으며,</span>
							<span>새로운 기술과 동향을 지속적으로 연구하고</span>
							<span>습득하여 항상 선도적인 위치에 서 있습니다.</span>
						</li>
						<li>
							<span>끈임없는 도전과 강인함을 바탕으로 </span>
							<span>고객들에게 최상의 서비스를 제공하는 태온입니다.</span>
						</li>
						<li>
							<span>또한, 강인함이라는 가치도 태온의 핵심입니다.</span>
							<span>
								어떤 어려움이든 우리는 굴하지 않고 극복해 나갈것입니다.
							</span>
						</li>
						<li>
							<span>태온은 어떤 프로젝트라도 성공적으로</span>
							<span>완료하기 위해 노력하며, 고객의 요구에</span>
							<span>항상 만족시킬 수 있는</span>
							<span>최고의 결과물을 제공합니다. </span>
						</li>
					</ul>
				</article>
			</div>
		</motion.section>
	);
}

export default about;
