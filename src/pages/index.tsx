'use client';
import './../../public/fonts/fonts.css';
import { TouchEvent, useEffect, useRef, useState } from 'react';
import style from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { WheelEvent } from 'react';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import Deboncer from '@/lib/commonFnc/Deboncer';
import NavigationBox from '@/components/common/Navigation';
const Home = () => {
	const [mainBodyStyle, setMainBodyStyle] = useState<{
		transform: string;
		transition: string;
	}>({ transform: '', transition: '' });
	const [translateValue, setTranslateValue] = useState(0);
	const [touchStartY, setTouchStartY] = useState<number>(0);
	const photoBoxDom = useRef<HTMLElement>(null);
	const scale1 = useRef<HTMLDivElement>(null);
	const scale2 = useRef<HTMLDivElement>(null);
	const [isTablet, setITablet] = useState<boolean>(false);
	const [isMobile, setIsmobile] = useState<boolean>(false);
	const [isNavOpen, setisNavOpen] = useState<boolean>(false);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		document.body.style.margin = '0';
		// next의 global css에 들어가는 margin값을 제거함.
		if (typeof window) {
			// 만약 해당 webapp이 웹 브라우저에서 실행된다면, window의 width값을 가져와서 모바일/태블린/pc 사이즈 판단.

			if (window.innerWidth < 760) {
				setIsmobile(true);
			} else if (window.innerWidth < 1249) {
				setITablet(true);
			} else if (window.innerWidth < 760) {
				setIsmobile(false);
			}
		}
		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.margin = '0';
		};
	}, [mainBodyStyle, isMobile, isTablet, isNavOpen]);

	const handleWheel2 = Deboncer((event: WheelEvent) => {
		// 애니메이션 삽입 코드
		if (event.deltaY < 0) {
			// scroll up
			if (photoBoxDom.current) {
				if (translateValue != 330) {
					if (translateValue === 0) {
						console.log('translateValue is zero');

						return null;
					}
					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue - 100
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					setTranslateValue((prev) => prev - 100);
				} else if (translateValue === 330) {
					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue - 30
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					setTranslateValue((prev) => prev - 30);
				}
			}
		} else if (event.deltaY > 0) {
			//scroll down
			if (photoBoxDom.current) {
				if (translateValue >= 300) {
					if (translateValue >= 330) {
						console.log('full');

						return null;
					}
					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue + 30
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					return setTranslateValue((prev) => prev + 30);
				}

				photoBoxDom.current.style.transform = `translate3d(0, -${
					translateValue + 100
				}vh, 0)`;
				photoBoxDom.current.style.transition = 'all 700ms ease 0s';
				return setTranslateValue((prev) => prev + 100);
			}
		}
	}, 300);
	function touchStartFn(event: TouchEvent) {
		setTouchStartY(event.touches[0].clientY);
	}

	/**
	 * @param event:TouchEvent 객체
	 * @var touchStartY: event.touches[0].clientY 의 값으로, 터치 시작 좌표
	 * @var event.changedTouches[0].clientY : 터치가 끝나는 지점 좌표
	 * @var direcTion : 총 이동 거리로 50이상 거리 이동시 translate3D 계산 유무 결정함
	 * handleWhell2또한 이것과 동일함. 단 handleWheel2는 Deboncer로 감싸져있음.
	 */
	function touchEndFn(event: TouchEvent) {
		const direcTion: number = event.changedTouches[0].clientY - touchStartY;
		if (direcTion > 100) {
			//scroll down
			if (photoBoxDom.current) {
				if (translateValue != 330) {
					if (translateValue === 0) {
						console.log('translateValue is zero');

						return null;
					}
					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue - 100
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					setTranslateValue((prev) => prev - 100);
				} else if (translateValue === 330) {
					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue - 30
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					setTranslateValue((prev) => prev - 30);
				}
			}
		}
		if (direcTion < -100) {
			//scroll up
			if (photoBoxDom.current) {
				if (translateValue >= 300) {
					if (translateValue >= 330) {
						return null;
					}

					photoBoxDom.current.style.transform = `translate3d(0, -${
						translateValue + 30
					}vh, 0)`;
					photoBoxDom.current.style.transition = 'all 700ms ease 0s';
					return setTranslateValue((prev) => prev + 30);
				}

				photoBoxDom.current.style.transform = `translate3d(0, -${
					translateValue + 100
				}vh, 0)`;
				photoBoxDom.current.style.transition = 'all 700ms ease 0s';
				return setTranslateValue((prev) => prev + 100);
			}
		}
	}
	const arrowStyle: React.CSSProperties = {
		width: '20vw',
		height: '5vh',
		opacity: 1,
		position: 'absolute',
		zIndex: 30,
		top: '38%',
		padding: 'auto 0%',
		filter: 'invert(100%)',
	};
	const arrowStyleM: React.CSSProperties = {
		width: '20vw',
		height: '3vh',
		opacity: 1,
		position: 'absolute',
		zIndex: 30,
		top: '45%',
		padding: 'auto 0%',
		filter: 'invert(100%)',
	};
	SwiperCore.use([Scrollbar, A11y, Navigation]);

	/**
	 * @param event:MouseEvent 가 발생한 지점의 HTMLElement
	 * @var style: 각각의 사진 element의 css값
	 * @var event.changedTouches[0].clientY : 터치가 끝나는 지점 좌표
	 * 마우스가 들어오고 나가는 이벤트가 발생한 곳의 HTMLelement를 가져와서 특정 img element의 css값에 scale값을 변경
	 */

	function scaleUp(event: any) {
		if (
			scale1?.current instanceof HTMLElement &&
			scale2?.current instanceof HTMLElement
		) {
			const style = scale1.current.style;
			const style2 = scale2.current.style;
			if (style) {
				if (event?.target.className.indexOf('section01ImgContainer') >= 0) {
					style.transform = 'scale(1.09)';
					console.log('scale up 1');
					if (style2) {
						style2.transform = 'scale(1)';
						console.log('scale down 2');
					}
				}
			}
			if (style2) {
				if (event?.target.className.indexOf('section02ImgContainer') >= 0) {
					style2.transform = 'scale(1.09)';
					console.log('scale up 2');
					if (style) {
						style.transform = 'scale(1)';
						console.log('scale down 1');
					}
				}
			}
		}
	}
	/**
	 * @param event:MouseEvent 가 발생한 지점의 HTMLElement
	 * @var style: 각각의 사진 element의 css값
	 * @var event.changedTouches[0].clientY : 터치가 끝나는 지점 좌표
	 * 마우스가 들어오고 나가는 이벤트가 발생한 곳의 HTMLelement를 가져와서 특정 img element의 css값에 scale값을 변경
	 */

	// const scaleDown = Deboncer((event: any) => {
	// 	if (
	// 		scale1?.current instanceof HTMLElement &&
	// 		scale2?.current instanceof HTMLElement
	// 	) {
	// 		const style = scale1.current.style;
	// 		const style2 = scale2.current.style;

	// 		if (style) {
	// 			if (event?.target.className.indexOf('section01ImgContainer') >= 0) {
	// 				style.transform = 'scale(1)';
	// 				console.log('scale down 1');
	// 			}
	// 		}
	// 		if (style2) {
	// 			if (event?.target.className.indexOf('section02ImgContainer') >= 0) {
	// 				style2.transform = 'scale(1)';
	// 				console.log('scale down 2');
	// 			}
	// 		}
	// 	}
	// }, 50);
	//
	function NavFnc() {
		return setisNavOpen(!isNavOpen);
	}
	const handleEventPropagation = (
		event: React.MouseEvent | React.TouchEvent,
	) => {
		event.stopPropagation();
	};

	return (
		<motion.main
			className={style.Bodymain}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: [0.09, 0.03, 0.19, 0.72], duration: 0.5 }}
			viewport={{ once: true }}
		>
			<div className={style.NavBtn} onClick={NavFnc}>
				<NavigationBox isMobile={isMobile} isNavopen={isNavOpen} />
			</div>

			<section
				className={style.PhotoBox}
				onWheel={handleWheel2}
				onTouchEnd={(event: TouchEvent) => touchEndFn(event)}
				onTouchStart={(event: TouchEvent) => touchStartFn(event)}
				ref={photoBoxDom}
				style={mainBodyStyle}
			>
				<article className={style.Section0} id='section0'>
					<section className={style.section0Box}>
						<motion.div
							className={style.logoImgContainer}
							initial={{ opacity: 0, transform: 'translateY(50vh)' }}
							animate={{ opacity: 1, transform: 'translateY(0vh)' }}
							transition={{ ease: [0.09, 0.03, 0.19, 0.72], duration: 3 }}
							viewport={{ once: true }}
						>
							<Image src='/logoImg/logo.png' fill={true} alt='TeaonLogo' />
						</motion.div>
						<motion.div
							className={style.logoText}
							initial={{ opacity: 0, transform: 'translateY(50vh)' }}
							animate={{ opacity: 1, transform: 'translateY(0vh)' }}
							transition={{ ease: 'easeOut', duration: 3.3 }}
							viewport={{ once: true }}
						>
							<span>
								we are a company that conducts real estate sales, interior
								design, and construction.
							</span>
							<span> Please make many inquiries.</span>
						</motion.div>
					</section>
				</article>
				<article className={style.Section1} id='section1'>
					<section className={style.section01Box}>
						<div>
							<Link href={'/property'}>
								<div
									className={style.section01ImgContainer}
									onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
										scaleUp(event)
									}
									onMouseOver={(event: React.MouseEvent<HTMLElement>) =>
										scaleUp(event)
									}
									ref={scale1}
								>
									<motion.div
										initial={{ opacity: 0, transform: 'translateX(-20vw)' }}
										whileInView={{ opacity: 1, transform: 'translateX(0vw)' }}
										transition={{ ease: 'easeOut', duration: 1.8 }}
										viewport={{ once: true }}
									>
										PROPERTY
									</motion.div>
								</div>
							</Link>
						</div>
						<div>
							<Link href={'/interior'}>
								<div
									className={style.section02ImgContainer}
									ref={scale2}
									onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
										scaleUp(event)
									}
									onMouseOver={(event: React.MouseEvent<HTMLElement>) =>
										scaleUp(event)
									}
								>
									<motion.div
										initial={{ opacity: 0, transform: 'translateX(20vw)' }}
										whileInView={{ opacity: 1, transform: 'translateX(0vw)' }}
										transition={{ ease: 'easeOut', duration: 2 }}
										viewport={{ once: true }}
									>
										INTERIOR
									</motion.div>
								</div>
							</Link>
						</div>
					</section>
				</article>
				<article className={style.Section2} id='section2'>
					<section className={style.section02Box}>
						<motion.h2
							className={style.section02Title}
							initial={{
								opacity: 0,
								transform: `translateX(-20vw)`,
							}}
							whileInView={{ opacity: 1, transform: 'translateX(0vw)' }}
							transition={{ ease: 'easeOut', duration: 1.8 }}
							viewport={{ once: true }}
						>
							TAEON PROJECT
						</motion.h2>
						<div className={style.section02TextBox}>
							<motion.div
								className={style.section02Div}
								initial={{ opacity: 0, transform: 'translateX(-20vw)' }}
								whileInView={{ opacity: 1, transform: 'translateX(0vw)' }}
								transition={{ ease: 'easeOut', duration: 2.1 }}
								viewport={{ once: true }}
							>
								<span>Teaon, leading the future</span>
								<span>with resilience and relentless</span>
								<span>pursuit of challenges.</span>
							</motion.div>
							<motion.span
								className={style.Section2Kr}
								initial={{ opacity: 0, transform: 'translateX(-20vw)' }}
								whileInView={{ opacity: 1, transform: 'translateX(0vw)' }}
								transition={{ ease: 'easeOut', duration: 2.4 }}
								viewport={{ once: true }}
							>
								강인함으로 도전하는 태온, 미래를 선도합니다
							</motion.span>
						</div>

						<div className={style.section2ImgContainer}>
							<Image
								src='/logoImg/teaon_logo.png'
								fill={true}
								alt='teaonLogo'
							/>
						</div>
					</section>
				</article>
				<article className={style.ImageContainer} id='section3'>
					<section className={style.slideSection}>
						<div className={style.slideTitleBox}>
							<span className={style.slideSpan}>MODEL HOUSE</span>
						</div>
						<Swiper
							modules={[Scrollbar, A11y, Navigation]}
							spaceBetween={50}
							loop={true}
							slidesPerView={1}
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							scrollbar={{ draggable: true }}
							className={style.SlidBody}
						>
							<div
								className='swiper-button-next'
								style={{ ...arrowStyleM, right: '-2vw' }}
							>
								<Image
									alt='nextBtn'
									fill={true}
									src='/slidePhoto/nextBtn.svg'
								/>
							</div>
							<div
								className='swiper-button-prev'
								style={{ ...arrowStyleM, left: '-2vw' }}
							>
								<Image
									alt='nextBtn'
									fill={true}
									src='/slidePhoto/prevBtn.svg'
								/>
							</div>
							<SwiperSlide
								className={style.swiperContents}
								onClick={(event: React.MouseEvent) =>
									handleEventPropagation(event)
								}
								onTouchStart={(event: React.TouchEvent) =>
									handleEventPropagation(event)
								}
							>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto1.png'
										alt='Teaoncarosel1'
										fill={true}
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide className={style.swiperContents}>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto2.png'
										alt='Teaoncarosel2'
										fill={true}
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide className={style.swiperContents}>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto3.png'
										alt='Teaoncarosel3'
										fill={true}
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide className={style.swiperContents}>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto4.png'
										alt='Teaoncarosel4'
										fill={true}
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide className={style.swiperContents}>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto5.png'
										alt='Teaoncarosel5'
										fill={true}
									/>
								</div>
							</SwiperSlide>
							<SwiperSlide className={style.swiperContents}>
								<div className={style.myimg}>
									<Image
										src='/slidePhoto/slidephoto6.png'
										alt='TeaonLogo4'
										fill={true}
									/>
								</div>
							</SwiperSlide>
						</Swiper>
					</section>
				</article>
				<article className={style.footer} id='section4'>
					<div className={style.footerImg}>
						<Image alt='footerImg' src='/logoImg/teaon_logo.png' fill={true} />
					</div>
					<div className={style.footerInfoBox}>
						<div className={style.footerInfo}>
							<span>
								<span className={style.footerSpanFirst}>CEO</span>
								<span className={style.koreanFooter}>조승원</span>
							</span>
							<span className={style.Emails}>
								<span className={style.footerSpanFirst}>EMAIL</span>
								<span>chosw5@naver.com</span>
							</span>
							<span>
								<span className={style.footerSpanFirst}>ADDRESS</span>
								<span className={style.koreanFooter}>
									서울 중구 서애로 27 303호
								</span>
							</span>
						</div>
						<div className={style.warnBox}>
							<div className={style.copylight}>
								Copyrights © 2023, TAEON. All rights reserved.
							</div>
							{isTablet || isMobile ? (
								<div className={style.footerWarnT}>
									<span>상기 이미지는 소비자의 이해를 돕기위해</span>
									<span>제작된 것으로 실제와 다를 수 있습니다.</span>
								</div>
							) : (
								<div className={style.footerWarn}>
									<span>
										본 홈페이지에 사용된 CG, 일러스트, 이미지 등은 소비자의
										이해를 돕기 위해 제작된 것으로 실제와 다를 수 있으며,&nbsp;
									</span>

									<span>
										인·허가 과정 및 시행사, 시공사 사정 등 기타 제반 사유에
										의하여 변경 될 수 있으니 계약전 반드시 확인하시기 바랍니다.
									</span>
								</div>
							)}
						</div>
					</div>
				</article>
			</section>
		</motion.main>
	);
};

export default Home;
