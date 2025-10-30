import { useState } from 'react';

const FloatingWhatsApp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '254704086080'; // WhatsApp number without + or spaces
  const message = 'Hello! I am interested in your organic products.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Text - Positioned Absolutely */}
      <div
        className={`absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium transition-all duration-300 ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        Chat with us on WhatsApp
        {/* Arrow pointing to circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-800"></div>
        </div>
      </div>

      {/* Perfect Circle Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16  hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp Logo SVG */}
        <svg 
          viewBox="0 0 32 32 " 
          className="w-9 h-9 text-[#25D366]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.825.739 5.607 2.137 8.048L.069 31.911l8.09-2.133A15.936 15.936 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.455c-2.53 0-4.997-.708-7.136-2.045l-.512-.303-5.317 1.401 1.42-5.185-.333-.53A13.39 13.39 0 012.545 16c0-7.406 6.025-13.455 13.455-13.455S29.455 8.594 29.455 16 23.406 29.455 16 29.455z"/>
          <path d="M23.191 19.963c-.384-.192-2.274-1.123-2.627-1.251-.352-.128-.608-.192-.864.192-.256.384-1.024 1.251-1.248 1.507-.224.256-.448.288-.832.096-.384-.192-1.621-.597-3.085-1.899-1.141-.997-1.909-2.229-2.133-2.613-.224-.384-.024-.592.168-.784.173-.173.384-.448.576-.672.192-.224.256-.384.384-.64.128-.256.064-.48-.032-.672-.096-.192-.864-2.08-1.184-2.848-.32-.768-.64-.64-.864-.64-.224 0-.48-.032-.736-.032s-.672.096-.992.48c-.32.384-1.248 1.216-1.248 2.976s1.28 3.456 1.472 3.712c.192.256 2.56 3.904 6.208 5.472.864.384 1.536.608 2.08.768.864.288 1.664.256 2.304.16.704-.128 2.272-.928 2.592-1.824.32-.896.32-1.664.224-1.824-.096-.16-.352-.256-.736-.448z"/>
        </svg>
        
        {/* Ping Animation */}
        {/* <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75 -z-10"></span> */}
      </a>
    </div>
  );
};

export default FloatingWhatsApp;

