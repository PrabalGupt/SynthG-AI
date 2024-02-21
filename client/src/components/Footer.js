import React from 'react'

function Footer() {
    return (
        <>
        <div className='footer'>
            <ul className="footer-page-list">
                <li className="footer-page-list-name">About</li>
                <li className="footer-page-list-name">How To Use</li>
                <li className="footer-page-list-name">Team</li>
                <li className="footer-page-list-name">Explore</li>
                <li className="footer-page-list-name">Legal</li>
            </ul>
            <div className="footer-second-column">
                <h3 className='follow-us-heading'>Follow Us</h3>
                <div className="social-media-container">
                    <img src="images/github-icon.svg" alt="" className="social-media-icon" />
                    <p className="social-media-name">Gihtub</p>
                </div>
                <div className="social-media-container">
                    <img src="images/x-icon.svg" alt="" className="social-media-icon" />
                    <p className="social-media-name">Twitter</p>
                </div>
                <div className="social-media-container">
                    <img src="images/linkedin-icon.svg" alt="" className="social-media-icon" />
                    <p className="social-media-name">LinkedIn</p>
                </div>
            </div>
            <div className="footer-third-column">
                <h3 className='contact-us-heading'>Contact Us</h3>
                <div className="contact-us-container">
                    <img src="images/email-icon.svg" alt="" className="contact-us-icon" />
                    <p className="contact-us-name">jksinghthegreat@gmail.com</p>
                </div>
                <div className="contact-us-container">
                    <img src="images/phone-icon.svg" alt="" className="contact-us-icon" />
                    <p className="contact-us-name">+91 8287907769</p>
                </div>
            </div>
        </div>
        <p className="copyright">Copyright &copy; All content on this website is subjected to copyright</p>
        </>
    )
}

export default Footer