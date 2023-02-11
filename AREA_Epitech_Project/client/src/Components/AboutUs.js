import React from "react";
import './AboutUs.css';

function AboutUs() {
    return (
        <div className="AboutUs">
            <h1 id="title">OUR TEAM</h1>
            <div className="all_boxe">
                <div className="boxe" id="Alex">
                    <h1>
                        Alex Lehmann
                    </h1>
                </div>
                <div className="boxe" id="Thomas">
                    <h1>
                        Thomas Gireaudot
                    </h1>
                </div>
                <div className="boxe" id="Enguerrand">
                    <h1>
                        Enguerrand Van-de-Melde
                    </h1>
                </div>
                <div className="boxe" id="Maxime">
                    <h1>
                        Maxime Launay
                    </h1>
                </div>
            </div>
            <h2>Le but du projet est de mettre une application mobile et web communiquant<br></br>
            avec un même serveur permettant ainsi la réalisation d’action et de reaction.<br></br>
            La plateforme logicielle choisie à travers la création d'une application métier.
            <br></br>Avec cette équipe de vainqueur nous vous proposons notre area <br></br>
                El chancoustou restera dans nos mémoires</h2>
        </div>
    )
}

export default AboutUs;