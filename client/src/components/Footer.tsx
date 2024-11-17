
const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-semibold font-[Kablammo]">Co-Work</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white hover:underline">About Us</a>
              <a href="#" className="text-gray-300 hover:text-white hover:underline">Contact Us</a>
              <a href="#" className="text-gray-300 hover:text-white hover:underline">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white hover:underline">Terms & Conditions</a>
            </div>
          </div>
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Co-Work. All Rights Reserved. Made with ❤️ by <a href="https://raushan.xyz" className="text-white hover:underline">Raushan</a>
          </p>
        </div>
      </footer>
  )
}

export default Footer;