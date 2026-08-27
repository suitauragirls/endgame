const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

// Ensure necessary imports are present for the reviews feature
if (!code.includes('Star')) {
  code = code.replace("import { ShoppingBag, Heart, Share2, Plus, Minus, Truck, ShieldCheck, Clock, Copy, X } from 'lucide-react';", "import { ShoppingBag, Heart, Share2, Plus, Minus, Truck, ShieldCheck, Clock, Copy, X, Star } from 'lucide-react';");
}

if (!code.includes('const [rating, setRating] = useState(5);')) {
  code = code.replace(
    "const [shareSuccess, setShareSuccess] = useState('');",
    "const [shareSuccess, setShareSuccess] = useState('');\n  const [rating, setRating] = useState(5);\n  const [reviewText, setReviewText] = useState('');\n  const [reviewerName, setReviewerName] = useState('');\n  const [reviews, setReviews] = useState([\n    { id: 1, name: 'Priya S.', rating: 5, text: 'Amazing quality!', date: 'Oct 12, 2023' },\n    { id: 2, name: 'Ananya M.', rating: 4, text: 'Looks exactly like the picture.', date: 'Oct 05, 2023' }\n  ]);\n\n  const handleReviewSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (reviewerName.trim() && reviewText.trim()) {\n      const newReview = {\n        id: Date.now(),\n        name: reviewerName,\n        rating,\n        text: reviewText,\n        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })\n      };\n      setReviews([newReview, ...reviews]);\n      setReviewText('');\n      setReviewerName('');\n      setRating(5);\n    }\n  };\n"
  );
}


const reviewSection = `
            {/* Reviews Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-[#212121] mb-6">Ratings & Reviews</h2>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="text-4xl font-bold text-[#212121]">
                  {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                </div>
                <div>
                  <div className="flex text-[#388e3c]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="text-sm text-[#878787] mt-1">{reviews.length} Ratings & Reviews</div>
                </div>
              </div>

              {/* Submit Review Form */}
              <div className="bg-[#f1f3f6] p-4 rounded-sm mb-8">
                <h3 className="font-medium text-[#212121] mb-4">Rate this product</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={\`p-1 \${star <= rating ? 'text-[#ff9f00]' : 'text-gray-300'}\`}
                      >
                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 outline-none focus:border-[#2874f0] text-sm"
                    />
                    <textarea 
                      placeholder="Write a review..." 
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 outline-none focus:border-[#2874f0] text-sm resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#2874f0] text-white px-6 py-2 rounded-sm font-medium text-sm shadow-sm hover:bg-[#1a5bbf]"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[3px] flex items-center">
                        {review.rating} <Star size={10} fill="currentColor" className="ml-1" />
                      </span>
                      <span className="text-sm font-bold text-[#212121]">{review.name}</span>
                    </div>
                    <p className="text-sm text-[#212121] mb-2">{review.text}</p>
                    <div className="text-xs text-[#878787] flex items-center gap-2">
                      <span>{review.date}</span>
                      <span className="flex items-center gap-1">
                        <img width="14" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="verified" className="grayscale opacity-50" />
                        Certified Buyer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
`;

code = code.replace('</div>\n        </div>\n      </div>\n    </div>\n  );\n};', reviewSection + '\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};');

fs.writeFileSync('src/pages/ProductDetail.tsx', code);
