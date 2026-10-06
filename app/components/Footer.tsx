import WineLogo from "./WineLogo";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2E1054" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand block */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 bg-white/10 flex items-center justify-center rounded">
              <WineLogo />
            </div>
            <div>
              <p className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Zymowine.com</p>
              <p className="text-xs text-white/60 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;the science of fine wine&rdquo;
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Curating the finest wines from around the world. Discover authentic flavors and elevate your everyday moments.
          </p>
          <div className="flex gap-4 text-white/60">
            <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-instagram" /></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-twitter" /></a>
          </div>
          <a href="mailto:service@zymowine.com" className="text-sm text-white/70 hover:text-white transition">
            service@zymowine.com
          </a>
        </div>

        {/* Useful Pages col 1 */}
        <div>
          <p className="font-semibold mb-4 text-white/90">Useful Pages</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">View Cart</a></li>
          </ul>
        </div>

        {/* Useful Pages col 2 */}
        <div>
          <p className="font-semibold mb-4 text-white/90">Useful Pages</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition">Shipping &amp; Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© 2026 Zymo Wine. All rights reserved.</span>
          <span>Must be 21 years or older to purchase alcohol.</span>
        </div>
      </div>
    </footer>
  );
}
