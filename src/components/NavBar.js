import React, { useState } from "react"
import "../styles/NavBar.css"
import Gradient from 'rgt'
import TorokuIcon from '../assets/images/icon_toroku_red.png';
import {useLocation} from "react-router-dom";
import {links} from "../Constant";

export default function NavBar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const location = useLocation();

    return (
        <nav className="navigation">

            <a href="/">
                <div className="toroku-logo-container">
                    <div className="toroku-logo">
                        <img src={TorokuIcon} alt={""} color="#F20732"
                             style={{
                                 width: "100%",
                                 height: "100%",
                                 margin: 0,
                             }}/>
                    </div>
                </div>
            </a>
            <a href="/" className="brand-name">
                Toro
                <Gradient dir="left-to-right" from="#F20732" to="#EF0A62">
                    ku.dev
                </Gradient>
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white">
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }>
                <ul>
                    {
                        links.map((e) => {
                            return (
                                <a key={e.link} href={e.link} className={location.pathname === e.link ? "navigation-button-selected" : "navigation-button"}>
                                    <li className={location.pathname === e.link ? "navigation-border-selected" : "navigation-border"}>
                                        <p>
                                            {e.name}
                                        </p>
                                    </li>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
        </nav>
    );
}