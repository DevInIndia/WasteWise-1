
const UserCircleIcon = ({ className, userImage }) => {
  return userImage ? (
    <img
      src={userImage}
      alt="User Profile"
      className={`w-16 h-16 rounded-full border-2 border-gray-300 ${className}`}
    />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-16 h-16 text-gray-400 ${className}`}
    >
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zM7.5 17.25a5.5 5.5 0 019 0 .75.75 0 001.24-.83 7 7 0 00-11.48 0 .75.75 0 001.24.83zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm-6 0a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default UserCircleIcon;
