const Footer = () => {
  return (
    <footer className="bg-green-800 text-green-100 py-4 px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
      
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} HR System. All Right Reserved.
        </p>

       
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-green-400 transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
