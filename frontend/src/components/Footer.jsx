import React from 'react'
import { Mail, Phone } from "lucide-react";
const Footer = () => {
  return (
    <footer className="text-white">

      {/* FOOTER */}

      <div className="bg-[#D4DCD3] text-darkGreen py-10 px-6 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-left">
          <p className="text-sm">HEARD</p>
          <p className="text-sm">ENOUGH? →</p>
        </div>
        <div className="sm:col-span-1 lg:col-span-2 flex justify-start sm:justify-center lg:justify-start">
          <h2 className="text-4xl sm:text-5xl font-bold">Contact us</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-darkGreen py-10 px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        {/* Logo & Name */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 text-center sm:text-left">
          <img
            src="/_next/image?url=%2Flogo2.jpg&amp;w=128&amp;q=75"
            srcSet="/_next/image?url=%2Flogo2.jpg&amp;w=64&amp;q=75 1x, /_next/image?url=%2Flogo2.jpg&amp;w=128&amp;q=75 2x"
            alt="WasteWise Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 object-cover"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-6">WasteWise</h1>
        </div>

        {/* Company Motto */}
        <div className="text-lg sm:text-xl font-sans flex items-center justify-center sm:justify-start text-center sm:text-left">
          <p>MAKING WASTE DISPOSAL SMARTER AND EASY.</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-center sm:text-left">
          <p className="flex items-center justify-center sm:justify-start space-x-2">
            <Mail className="w-5 h-5 text-white" />
            <a href="mailto:wastewise476@gmail.com" className="hover:text-gray-300">
              wastewise476@gmail.com
            </a>
          </p>
          <p className="flex items-center justify-center sm:justify-start space-x-2">
            <Phone className="w-5 h-5 text-white" />
            <a href="tel:+9123456788" className="hover:text-gray-300">
              +91 234 567 88
            </a>
          </p>
          <p>Aligarh Muslim University, Aligarh</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer