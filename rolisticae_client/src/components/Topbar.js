import '../styles/Topbar.css';
import '../styles/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faDiscord} from "@fortawesome/free-brands-svg-icons";

function Topbar() {
    return <div id="sp-top-bar">
        <div className="container">
            <div className="container-inner">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="sp-column text-center text-lg-start">
                            <ul className="social-icons">
                                <li className="">
                                    <a target="_blank" rel="noopener noreferrer"
                                       href="https://www.facebook.com/groups/816585662643880"
                                       aria-label="Facebook">
                                        <FontAwesomeIcon icon={faFacebook} className="fa fa-facebook"></FontAwesomeIcon>
                                    </a>
                                </li>
                                <li className="">
                                    <a target="_blank" rel="noopener noreferrer"
                                       href="https://www.instagram.com/les.rois.fous/"
                                       aria-label="Youtube">
                                        <FontAwesomeIcon icon={faInstagram} className="fa fa-instagram"></FontAwesomeIcon>
                                    </a>
                                </li>
                                <li className="">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://discord.gg/juZh5czy"
                                        aria-label="Linkedin">
                                        <FontAwesomeIcon icon={faDiscord} className="fa fa-discord"></FontAwesomeIcon>
                                    </a>
                                </li>
                            </ul>
                            <div className="sp-module">
                                <div className="sp-module-content">
                                    <div className="mod-languages"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="sp-column text-center text-lg-end">


                            <FontAwesomeIcon icon={faEnvelope} className=""></FontAwesomeIcon>
                            <a href="mailto:RolisticaeTeam@gmail.com">
                                RolisticaeTeam@gmail.com
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Topbar;