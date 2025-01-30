import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Image from 'next/image';

const Header = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    let closeTimeout;

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <div className="bg-darkGreen h-20 w-full border-b-2 flex items-center justify-between px-4 sm:px-6 lg:px-8 text-white text-lg">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Image
                    src="/logo2.jpg"
                    width={50}
                    height={50}
                    alt="logo"
                    className="h-12 w-12 object-cover sm:h-14 sm:w-14"
                    priority
                />
                
                <p className="text-offWhite font-bold hidden sm:block">WasteWise</p>
            </div>

            {/* Hamburger Menu */}
            <button
                className="sm:hidden block text-white focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Navigation Links */}
            <ul
                className={`sm:flex sm:space-x-4 sm:items-center sm:justify-center ${
                    menuOpen ? 'block' : 'hidden'
                } absolute sm:static top-20 left-0 w-full bg-darkGreen sm:bg-transparent px-4 sm:px-0 text-center`}
            >
                <li className="p-2">
                    <Link href="/">Home</Link>
                </li>
                <li className="p-2">
                    <Link href="/Community">Community</Link>
                </li>
                <li className="p-2">
                    <Link href="/About">About</Link>
                </li>
                <li className="p-2">
                    <Link href="/profile">Profile</Link>
                </li>
            </ul>

            {/* User Profile Section */}
            {!loading &&
                (user ? (
                    <div
                        className="relative"
                        onMouseEnter={() => {
                            clearTimeout(closeTimeout); // Prevent dropdown from closing too soon
                            setDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                            closeTimeout = setTimeout(() => setDropdownOpen(false), 300); // Delay closing
                        }}
                    >
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2"
                        >
                            <Image
                                src={user.photoURL}
                                alt="User Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </button>

                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-black z-50"
                                onMouseEnter={() => clearTimeout(closeTimeout)} // Keep it open when hovered
                                onMouseLeave={() => setDropdownOpen(false)} // Close when leaving dropdown
                            >
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Sign Out
                                </button>
                                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                                    Go to Profile
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={handleSignIn}
                        className="bg-lightGreen hover:border hover:border-white text-darkGreen px-4 py-2 rounded transition-all"
                    >
                        SignIn
                    </button>
                ))}
        </div>
    );
};

export default Header;
