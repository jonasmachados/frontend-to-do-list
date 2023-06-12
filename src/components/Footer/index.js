import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import "./styles.css"

const Footer = () => {
    return (
        <div className="container-footer">
            <div className="social-icon">
                <a href="https://twitter.com/JonasMachado01/">
                    <i><FaTwitter /></i>
                </a>
                <a href="https://www.instagram.com/jonasmachado01/">
                    <i> <AiFillInstagram /></i>
                </a>
                <a href="https://www.linkedin.com/in/jonas-machados/">
                    <i><FaLinkedinIn /></i>
                </a>
            </div>
            <p>Trabalhando para tornar o mundo 
                um lugar melhor.</p>
            <p>Copyright 2023. All Rights Reserved</p>
        </div>
    );
};

export default Footer;