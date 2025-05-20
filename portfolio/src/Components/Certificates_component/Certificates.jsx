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

    useEffect(() => {
        const handleResize = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageClick = (cert, rect) => {
        setExpandedImage(cert);
        setImageRect(rect);
        setIsExpanded(true);
    };

    const handleClose = () => {
        setExpandedImage(null);
        setImageRect(null);
        setIsExpanded(false);
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
                floatingImg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;
                setTimeout(() => setIsExpanded(true), 100);
            });
        }
    }, [expandedImage, imageRect, viewportSize]);

    return(
        <section>
            <h2>Certificados.</h2>
            <section className='certificates_img_container'>
                {certificates.map((cert) => <Tilt_effect_image key={cert.id} {...cert} onClick={(rect) => handleImageClick(cert, rect)}/>)}
            </section>
                {expandedImage && imageRect && (
                    <div className="overlay" onClick={handleClose}>
                        <h1>{expandedImage.name}</h1>
                        <img
                            className={`floating_image ${isExpanded ? 'expanded' : ''}`}
                            src={expandedImage.image}
                            alt={expandedImage.name}
                            style={{
                                top: imageRect.top,
                                left: imageRect.left,
                                width: imageRect.width,
                                height: imageRect.height,
                                transform: 'translate(0, 0) scale(1)',
                            }}
                        />
                    </div>
                )}
            </section>
    )
}