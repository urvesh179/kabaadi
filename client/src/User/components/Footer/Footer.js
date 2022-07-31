import React from 'react';

import classes from './Footer.css';
import home from '../../../images/home3.png';
import call from '../../../images/call.png';
import email from '../../../images/email.png';
import Logo from '../../../images/kabadi-mart.png'
import instagram from '../../../images/instagram.png'
import git from '../../../images/git.png'
import linkdin from '../../../images/linkdin.png'


const Footer = () => {

    return (
        <footer className={classes.container}>
            <div className={classes.info}>
                <div className={classes.container1}>
                    <img src={Logo} className={classes.logo} alt="logo" />
                    <h5 className={classes.brandname}>Kabadimart</h5>
                    <img src={instagram} height="25px" width="25px" style={{ borderRadius: "5px", margin: "10px 20px 0 50px", cursor: "pointer" }} alt="instagram" />
                    <img src={git} height="25px" width="25px" style={{ borderRadius: "5px", margin: "10px 20px 0 0px", cursor: "pointer" }} alt="git" />
                    <img src={linkdin} height="25px" width="25px" style={{ borderRadius: "5px", margin: "10px 5px 0 0px", cursor: "pointer" }} alt="linkdin" />
                </div>
                <div className={classes.container2}>
                    <h5 className={classes.links} style={{ marginTop: "7px", color: "#828282", fontWeight: "bold", textAlign: "center" }}>Office Address</h5>
                    <p className={classes.links1} style={{ color: "#444", fontWeight: "bold" }}>
                        <img src={home} height="25px" width="30px" style={{ borderRadius: "5px" }} alt="home" /> 405/406 Luxuria Business Hub, Near VR mall, <br /><span style={{ margin: "10px 0 0 35px" }}>Surat - Dumas Rd, Surat, Gujarat 395007</span></p>
                    <p className={classes.links2} style={{ color: "#444", fontWeight: "bold" }}>
                        <img src={email} height="25px" width="25px" style={{ borderRadius: "5px" }} alt="email" /> recruitment@lanetteam.com</p>
                    <p className={classes.links3} style={{ color: "#444", fontWeight: "bold" }}>
                        <img src={call} height="25px" width="25px" style={{ borderRadius: "5px" }} alt="call" />  +91-7229030202</p>
                </div>
                <div className={classes.container3}>
                    <h5 style={{ cursor: "pointer" }}>About Us</h5>
                    <h5 style={{ cursor: "pointer" }}>Contact</h5>
                    <h5 style={{ cursor: "pointer" }}>Privacy Policy</h5>
                    <h5 style={{ cursor: "pointer" }}>Terms And Conditions</h5>
                </div>
            </div>
            <div className={classes.container4}>
                <h5>&copy; 2020 Copyright:lanetteam</h5>
            </div>
        </footer>

    );
}



export default Footer;