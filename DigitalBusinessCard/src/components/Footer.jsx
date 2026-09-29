import facebook from "../pictures/facebook-icon.png"
import github from "../pictures/github-icon.png"
import instagram from "../pictures/instagram-icon.png"
import twitter from "../pictures/twitter-icon.png"

export default function Footer () {
    return (
        <footer>
            <div className="social-icon-container">
                <a href="https://x.com/" target="_blank">
                    <img className="social-icon" src={twitter} alt="Twitter or X Icon"></img>
                </a>
                <a href="https://facebook.com/" target="_blank">
                    <img className="social-icon" src={facebook} alt ="Facebook or Meta Icon"></img>
                </a>
                <a href="https://instagram.com/" target="_blank">
                    <img className="social-icon" src={instagram} alt="Instagram Icon"></img>
                </a>
                <a href="https://github.com/" target="_blank">
                    <img className="social-icon" src={github} alt="Github Icon"></img>
                </a>
            </div>
        </footer>
    )
}