import { useState, useEffect, useRef } from 'react';
import { get_certificates } from '../../helpers/get_data';
import { Tilt_effect_image } from '../Tilt_effect_image/Tilt_effect_image';
import { Animated_titles } from '../Animated_titles/Animated-titles';
import './Certificates.css';

export const Certificates_component = () => {
    const [certificates, setCertificates] = useState([]);
    const [expandedImage, setExpandedImage] = useState(null);
    const [imageRect, setImageRect] = useState(null);
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [animationClose, setAnimationClose] = useState(false);
    const [tiltEnabled, setTiltEnabled] = useState(false);

    const floatingImgRef = useRef(null);

    const handleImageClick = (cert, rect) => {
        setExpandedImage(cert);
        setImageRect(rect);
        setIsExpanded(true);
    };

    const handleClose = () => {
        setAnimationClose(true);
        setTiltEnabled(false);

        const floatingImg = floatingImgRef.current;

        if (floatingImg && imageRect) {
            floatingImg.style.transition = 'transform 0.5s ease-in-out';
            floatingImg.style.transform = `translate(0px, 0px) scale(1)`;

            setTimeout(() => {
                setExpandedImage(null);
                setImageRect(null);
                setIsExpanded(false);
                setAnimationClose(false);
            }, 500);
        }
    };

    useEffect(() => {
        get_certificates()
            .then((res) => {
                setCertificates(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (expandedImage && imageRect) {
            const floatingImg = floatingImgRef.current;

            const targetX =
                viewportSize.width / 2 - (imageRect.left + imageRect.width / 2);
            const targetY =
                viewportSize.height / 2 - (imageRect.top + imageRect.height / 2);

            const scaleX = Math.min(
                (viewportSize.width * 0.8) / imageRect.width,
                3
            );
            const scaleY = Math.min(
                (viewportSize.height * 0.8) / imageRect.height,
                3
            );
            const scale = Math.min(scaleX, scaleY);

            requestAnimationFrame(() => {
                floatingImg.style.transition = 'transform 0.5s ease-in-out';
                floatingImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale}) rotateY(360deg)`;

                // Guardamos la transform base para tilt
                floatingImg.dataset.baseTransform = floatingImg.style.transform;

                setTimeout(() => {
                    setIsExpanded(true);
                    setTiltEnabled(true);
                }, 500);
            });
        }
    }, [expandedImage, imageRect, viewportSize]);

    useEffect(() => {
        if (expandedImage) {
            const scrollBarWidth =
                window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [expandedImage]);

    const handleMouseMoveExpanded = (e) => {
    if (!tiltEnabled) return;

    const el = floatingImgRef.current;
    if (!el) return;

    el.style.transition = 'none';

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let rotateX, rotateY;

    if (expandedImage?.id === 7) {
        rotateX = ((centerY - y) / centerY) * 5; // efecto más suave
        rotateY = ((x - centerX) / centerX) * 5;
    } else {
        // Tilt normal para los demás
        rotateX = ((centerY - y) / centerY) * 15;
        rotateY = ((x - centerX) / centerX) * 15;
    }

    const baseTransform = el.dataset.baseTransform || '';
    el.style.transform = `${baseTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeaveExpanded = () => {
    if (!tiltEnabled) return;

    const el = floatingImgRef.current;
    if (!el) return;

    const baseTransform = el.dataset.baseTransform || '';
    el.style.transition = 'transform 0.5s ease-in-out';
    el.style.transform = `${baseTransform} rotateX(0deg) rotateY(0deg)`;
};

    return (
        <section>
            <h2>Certificados.</h2>
            <section className='certificates_img_container'>
                {certificates.map((cert) => (
                    <Tilt_effect_image
                        key={cert.id}
                        {...cert}
                        onClick={(rect) => handleImageClick(cert, rect)}
                    />
                ))}
            </section>
            {expandedImage && imageRect && (
                <div
                    className={`overlay ${
                        animationClose ? 'animation_close' : ''
                    }`}
                    onClick={handleClose}
                >
                    <h2 className='certificate_title'>
                        <Animated_titles content={expandedImage.name} />
                    </h2>
                    <div
                        className={`floating_image_wrapper ${
                            isExpanded ? 'expanded' : ''
                        }`}
                        onMouseMove={handleMouseMoveExpanded}
                        onMouseLeave={handleMouseLeaveExpanded}
                        onClick={handleClose}
                    >
                        <img
                            ref={floatingImgRef}
                            src={expandedImage.image}
                            alt={expandedImage.name}
                            className={`floating_image ${
                                animationClose ? 'floating_image_close' : ''
                            }`}
                            style={{
                                top: imageRect?.top,
                                left: imageRect?.left,
                                width: imageRect?.width,
                                height: imageRect?.height,
                            }}
                        />
                    </div>
                    <h3
                        className={`certificate_code ${
                            animationClose ? 'cortificate_code_close' : ''
                        }`}
                    >
                        <Animated_titles
                            content={`Código : ${expandedImage.code}`}
                        />
                    </h3>
                </div>
            )}
        </section>
    );
};