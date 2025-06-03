import { useState, useEffect } from 'react'
import { get_certificates } from '../../helpers/get_data'
import { Tilt_effect_image } from '../Tilt_effect_image/Tilt_effect_image'
import './Certificates.css'

export const Certificates_component = () => {

    const [certificates, setCertificates] = useState([])

    const [expandedImage, setExpandedImage] = useState(null);
    const [imageRect, setImageRect] = useState(null);
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isExpanded, setIsExpanded] = useState(false);
    const [animationClose, setAnimationClose] = useState(false)

    const handleImageClick = (cert, rect) => {
        setExpandedImage(cert);
        setImageRect(rect);
        setIsExpanded(true);
    };

    const handleClose = () => {
        const floatingImg = document.querySelector('.floating_image');
        setAnimationClose(true);

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
                        setCertificates(res)
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
    },[])

    useEffect(() => {
        if (expandedImage && imageRect) {
            const floatingImg = document.querySelector('.floating_image');

            const targetX = viewportSize.width / 2 - (imageRect.left + imageRect.width / 2);
            const targetY = viewportSize.height / 2 - (imageRect.top + imageRect.height / 2);

            const scaleX = Math.min(viewportSize.width * 0.8 / imageRect.width, 3);
            const scaleY = Math.min(viewportSize.height * 0.8 / imageRect.height, 3);
            const scale = Math.min(scaleX, scaleY);

            requestAnimationFrame(() => {
                floatingImg.style.transition = 'transform 0.5s ease-in-out';
                floatingImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale}) rotateY(360deg)`;
                setTimeout(() => setIsExpanded(true), 100);
                });
            }
        }, [expandedImage, imageRect, viewportSize]);

/*     useEffect(() => {
        if (expandedImage && imageRect) {
            const floatingImg = document.querySelector('.floating_image');

            const targetX = viewportSize.width / 2 - (imageRect.left + imageRect.width / 2);
            const targetY = viewportSize.height / 2 - (imageRect.top + imageRect.height / 2);

            const scaleX = Math.min(viewportSize.width * 0.8 / imageRect.width, 3);
            const scaleY = Math.min(viewportSize.height * 0.8 / imageRect.height, 3);
            const scale = Math.min(scaleX, scaleY);

            requestAnimationFrame(() => {
                floatingImg.style.transition = 'transform 0.5s ease-in-out';
                floatingImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;
                setTimeout(() => setIsExpanded(true), 100);
            });
        }
    }, [expandedImage, imageRect, viewportSize]); */

    useEffect(() => {
        if (expandedImage) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [expandedImage]);


    return(
        <section>
            <h2>Certificados.</h2>
            <section className='certificates_img_container'>
                {certificates.map((cert) => <Tilt_effect_image key={cert.id} {...cert} onClick={(rect) => handleImageClick(cert, rect)}/>)}
            </section>
                {expandedImage && imageRect && (
                    <div className={`overlay ${animationClose ? 'animation_close' : ''}`} onClick={handleClose}>
                        <h1>{expandedImage.name}</h1>
                        <div
                            className={`floating_image_wrapper ${isExpanded ? 'expanded' : ''}`}
                            onClick={handleClose}
                        >
                            <img
                                src={expandedImage.image}
                                alt={expandedImage.name}
                                className={`floating_image ${animationClose ? 'floating_image_close' : ''}`}
                                style={{
                                    top: imageRect?.top,
                                    left: imageRect?.left,
                                    width: imageRect?.width,
                                    height: imageRect?.height,
                                }}
                            />
                        </div>
                    </div>
                )}
            </section>
    )
}