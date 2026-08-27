const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

if (!code.includes('useNavigate')) {
  code = code.replace("import { Link, useLocation } from 'react-router-dom';", "import { Link, useLocation, useNavigate } from 'react-router-dom';\nimport { Heart } from 'lucide-react';");
}

code = code.replace("const location = useLocation();", "const location = useLocation();\n  const navigate = useNavigate();\n  const [searchQuery, setSearchQuery] = useState('');\n\n  const handleSearch = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (searchQuery.trim()) {\n      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);\n    }\n  };\n");

// Desktop Search
code = code.replace(
  /<div className="hidden md:flex flex-1 max-w-xl relative">[\s\S]*?<\/div>/,
  `<form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more" 
                className="w-full h-9 pl-4 pr-10 rounded-sm outline-none text-[#212121] text-sm shadow-sm"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 text-[#2874f0]">
                <Search size={20} />
              </button>
            </form>`
);

// Mobile Search
code = code.replace(
  /<div className="relative">[\s\S]*?<input [\s\S]*?placeholder="Search for products\.\.\." [\s\S]*?\/>[\s\S]*?<Search size=\{18\} className="absolute left-3 top-3 text-gray-500" \/>[\s\S]*?<\/div>/,
  `<form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..." 
                className="w-full h-10 pl-10 pr-4 rounded-sm outline-none text-[#212121] text-sm"
              />
              <button type="submit" className="absolute left-3 top-3 text-gray-500">
                <Search size={18} />
              </button>
            </form>`
);

// Add Wishlist button
code = code.replace(
  /<Link to="\/orders"/,
  `<Link to="/wishlist" className="hidden md:flex items-center hover:text-white/90">
                Wishlist
              </Link>
              
              <Link to="/orders"`
);

// Add Wishlist mobile link
code = code.replace(
  /<Link to="\/cart"/,
  `<Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 border-b text-sm font-medium flex items-center gap-3 hover:bg-gray-50">
                  Wishlist
                </Link>
                <Link to="/cart"`
);


fs.writeFileSync('src/components/Navbar.tsx', code);
