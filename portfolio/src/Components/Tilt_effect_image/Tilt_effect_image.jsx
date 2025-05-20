import { useRef } from 'react';
import './Tilt_effect_image.css'

export const Tilt_effect_image = ({ name, image, id, onClick }) => {
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = imgRef.current;
        const rect = el.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * 15;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        imgRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    const handleClick = () => {
        const rect = imgRef.current.getBoundingClientRect();
        onClick(rect);
    };

    return (
        <div
            className="tilt_wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img
                ref={imgRef}
                className={`${id != 7 ? 'tilt_effect_image' : 'tilt_effect_image_7'}`}
                onClick={onClick}
                src={image}
                alt={name}
            />
        </div>
    );
};