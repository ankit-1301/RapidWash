//------------------------------------------FOOTER-------------------------------------------

import React from "react";
import img2 from "../assets/img/2.png";
function Footer() {
    return (
        <>
            <footer className="bg-black dark:bg-gray-900">
                <div className="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
                    <a href="#">
                        <img className="w-auto h-10" src={img2} alt="" />
                    </a>
                    <p className="mt-6 text-sm text-gray-500 lg:mt-0 dark:text-gray-400">© Copyright 2023 RapidWash. </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
