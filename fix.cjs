const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');
code = code.replace("import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Clock, Share2, Copy } from 'lucide-react';", "import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Clock, Share2, Copy, Heart, Star, X } from 'lucide-react';");
fs.writeFileSync('src/pages/ProductDetail.tsx', code);
