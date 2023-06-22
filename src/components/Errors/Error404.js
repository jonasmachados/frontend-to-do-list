import SvgError404 from "../SVGs/SvgError404";
import "./styles.css"
import { motion } from 'framer-motion';

const containerErrorVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: .8, duration: 1 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
    }
};

function Error404({ message }) {

    return (
        <motion.div
            className="container-error"
            variants={containerErrorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div>
                <h1>Error</h1>
                <p>Oops! Algo deu errado.</p>
            </div>

            <div>
                <SvgError404 />
            </div>

            {message && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </motion.div>
    );

}

export default Error404;