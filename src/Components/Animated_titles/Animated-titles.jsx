export const Animated_titles = ({ content }) => {

    return(
        <>
            {`${content}`.split("").map((char, index) => (
                <span
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </>
    )
}