import { useState } from 'react'
import './About_me.css'

export const About_me = () => {

    const[animationDirection, setAnimationDirection] = useState(null)

    const handleUp = () => {
        setAnimationDirection('upwards')
        setTimeout(() => {
            setAnimationDirection(null)
        }, 2100)
    }
    const handleRight = () => {
        setAnimationDirection('rightwards')
        setTimeout(() => {
            setAnimationDirection(null)
        }, 2100)        
    }
    const handleDown = () => {
        setAnimationDirection('downwards')
        setTimeout(() => {
            setAnimationDirection(null)
        }, 2100)        
    }
    const handleLeft = () => {
        setAnimationDirection('leftwards')
        setTimeout(() => {
            setAnimationDirection(null)
        }, 2100)        
    }

    return(
        <section className="about_me_and_buttons_container">
            <div className='about_me_container'>
                <div className='about_me_animation_container'>
                    <h2 className={`about_me_title${animationDirection}`}>Acerca de mi.</h2>
                    <p className={`about_me_paragraph ${animationDirection ? animationDirection : ''}`}>Comencé a estudiar desarrollo Front End en 2022, motivado por mi interés en crear experiencias web interactivas y funcionales. Si bien suelo utilizar librerías de estilos para agilizar el desarrollo, disfruto programar mis propias animaciones y funciones en CSS para tener mayor control y personalización sobre el resultado final. A lo largo de mi formación realicé múltiples cursos en Coderhouse, donde exploré distintas tecnologías y enfoques, lo cual me permitió definir un camino claro. Finalmente elegí especializarme en ReactJS, ya que me pareció el framework más directo, versátil y con mayor proyección dentro del ecosistema Front End.</p>
                </div>
            </div>
            <div className='about_me_container_buttons'>
                <div>
                    <button onClick={handleUp} disabled={animationDirection}>Arriba</button>
                </div>
                <div>
                    <button onClick={handleLeft} disabled={animationDirection}>Izquierda</button>
                    <button onClick={handleRight} disabled={animationDirection}>Derecha</button>
                </div>
                <div>
                    <button onClick={handleDown} disabled={animationDirection}>Abajo</button>
                </div>
            </div>
        </section>
    )
}