const NewsletterComponent = () => {
  return (
    <div className="bg-gray-800 p-10 text-white flex justify-between items-center mt-5 bottom-0" >
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold my-5">Newsletter & Special Promo</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your email here"
            className="px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <a href="/about" className="hover:underline">
          About us
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/location" className="hover:underline">
          Location
        </a>
      </div>
      <div className="text-sm">
        © Copyright Comfy Villas. All right reserved.
      </div>
    </div>
  );
};

export default NewsletterComponent;
