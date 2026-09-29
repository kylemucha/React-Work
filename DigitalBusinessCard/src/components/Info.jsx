import headshot from "../pictures/kylemucha-headshot.png"
import emailButton from "../pictures/email-button.png"
import linkedinButton from "../pictures/linkedin-button.png"
export default function Info () {
    return (
        <>
            <header>
                <img className="headshot" src={headshot} alt="Picture of Kyle Mucha" />
                <h1>Kyle Mucha</h1>
                <p className="job-title">Future Software Engineer</p>
                <a className="website-link" href="#" target="_blank">kylemucha.about</a>
            </header>
            <div className="button-row">
                <a className="button" href="mailto:kylemuchaswe@gmail.com">
                        <img src={emailButton} alt="Button to Email"></img>
                </a>
                <a className="button" href="https://www.linkedin.com/in/kylemuchaa/" target="_blank">
                        <img src={linkedinButton} alt="Button to lead to Linkedin"></img>
                </a>
            </div>
        </>
    )
}