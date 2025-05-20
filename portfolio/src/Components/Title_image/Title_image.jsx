import { Magnetic_profile_image } from '../Magnetic_profile_image/Magnetic_profile_image'
import './Title_image.css'

export const Title_image = () => {

    return(
            <div className='title_image_container'>
                <div className='title_subtitle_container'>
                    <h1 className="title">
                        {"Franco J. Beccari".split("").map((char, index) => (
                            <span
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            >
                            {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                    <h2 className='subtitle'>
                        {"Front-end web developer.".split("").map((char, index) => (
                            <span
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            >
                            {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                </div>
                <div>
                    <Magnetic_profile_image />
                </div>
            </div>
    )
}