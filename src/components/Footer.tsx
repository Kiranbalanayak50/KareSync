import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={assets.doctor_icon} alt="Doctor Icon" className="h-8 w-8" />
                            <h2 className="text-xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent tracking-tight">KareSync</h2>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Your trusted partner in healthcare management. We connect patients with healthcare providers, making quality healthcare accessible to everyone.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/home" className="text-gray-600 hover:text-primary text-sm">Home</a>
                            </li>
                            <li>
                                <a href="/doctors" className="text-gray-600 hover:text-primary text-sm">Find Doctors</a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-600 hover:text-primary text-sm">About Us</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-600 hover:text-primary text-sm">Contact</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600 text-sm">
                                <span className="font-medium">Email:</span> support@karesync.com
                            </li>
                            <li className="text-gray-600 text-sm">
                                <span className="font-medium">Phone:</span> +1 (555) 123-4567
                            </li>
                            <li className="text-gray-600 text-sm">
                                <span className="font-medium">Address:</span> 123 Healthcare St, Medical City, MC 12345
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 text-lg font-semibold drop-shadow-sm">
                        © {new Date().getFullYear()} KareSync. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;