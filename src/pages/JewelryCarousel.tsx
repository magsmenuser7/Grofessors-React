import React, { useState } from 'react';
import '../App.css';

const products = [
  { id: 1, title: 'Royal Gold', price: '$1,200', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80', desc: 'Handcrafted 24k gold necklace with intricate detailing.' },
  { id: 2, title: 'Solitaire Ring', price: '$3,500', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80', desc: 'A flawless 2-carat diamond set in platinum.' },
  { id: 3, title: 'Ocean Pearls', price: '$850', img: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=400&q=80', desc: 'Genuine South Sea pearls with silver clasp.' },
  { id: 4, title: 'Emerald Cut', price: '$2,100', img: 'https://images.unsplash.com/photo-1603974372039-adc49044b3bd?auto=format&fit=crop&w=400&q=80', desc: 'Deep green emerald pendant with gold chain.' },
  { id: 5, title: 'Vintage Ruby', price: '$1,800', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80', desc: 'Antique style ruby ring from the 1920s collection.' },
  { id: 6, title: 'Sterling Cuff', price: '$450', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80', desc: 'Modern minimalistic silver cuff for daily wear.' },
  { id: 7, title: 'Luxury Time', price: '$5,200', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80', desc: 'Swiss movement gold watch with leather strap.' },
  { id: 8, title: 'Crystal Studs', price: '$950', img: 'https://images.unsplash.com/photo-1602751584552-8ba42d523f42?auto=format&fit=crop&w=400&q=80', desc: 'High clarity crystal studs suitable for evening wear.' },
];

const JewelryCarousel = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // Close modal handler
  const closePreview = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="scene">
        {/* If a product is selected, add the 'paused' class to stop rotation */}
        <div className={`carousel ${selectedProduct ? 'paused' : ''}`}>
          {products.map((product, index) => {
            // Calculate rotation for each item (360 degrees / number of items)
            const rotateY = index * (360 / products.length);
            
            return (
              <div 
                key={product.id} 
                className="card"
                style={{ 
                  transform: `rotateY(${rotateY}deg) translateZ(var(--carousel-radius))` 
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <img src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedProduct && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePreview}>&times;</button>
            <img src={selectedProduct.img} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>
              {selectedProduct.price}
            </p>
            <p style={{ color: '#bbb', margin: '15px 0' }}>
              {selectedProduct.desc}
            </p>
            <button className="buy-btn">Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default JewelryCarousel;