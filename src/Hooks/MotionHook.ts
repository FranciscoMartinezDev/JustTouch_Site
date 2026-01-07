import { Variants } from "framer-motion";


export const useFramerMotion = () => {
    const fadeLeft: Variants = {
        hidden: { opacity: 0, x: -50 },
        show: {
            opacity: [0, 1, 1],
            x: 0,
            transition: {
                duration: .5,
                ease: "easeInOut"
            }
        },
        exit: { opacity: 0, x: -50 }
    };

    const fadeRight: Variants = {
        hidden: { opacity: 0, x: 50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: .5,
                ease: "easeInOut"
            }
        },
        exit: { opacity: 0, x: 50 }
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: .5,
                delay,
                ease: "easeInOut"
            }
        }),
        exit: { opacity: 0, y: 50 }
    };

    return {
        fadeLeft,
        fadeRight,
        fadeUp
    }
}

