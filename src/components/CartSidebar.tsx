import { useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-earth-600" />
            <h2 className="font-semibold text-stone-800 text-lg">购物袋</h2>
            {items.length > 0 && (
              <span className="bg-earth-100 text-earth-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} 件
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-earth-300" />
              </div>
              <div>
                <p className="text-stone-500 text-sm">购物袋是空的</p>
                <p className="text-stone-400 text-xs mt-1">去挑选你的能量产品吧</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary text-xs px-6 py-2.5"
              >
                去购物
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-4 bg-stone-50 rounded-2xl"
                >
                  <img
                    src={item.product.coverImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 text-sm line-clamp-2 leading-snug">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {Object.values(item.selectedVariants).join(' · ')}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-white rounded-full border border-stone-200 px-1">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1.5 hover:text-earth-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1.5 hover:text-earth-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-earth-600 text-sm">
                          ¥{(item.product.price * item.quantity).toFixed(0)}
                        </span>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="p-1 hover:text-red-500 transition-colors text-stone-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-sm">合计</span>
              <span className="text-2xl font-bold text-stone-800">
                ¥{totalPrice().toFixed(0)}
              </span>
            </div>
            <p className="text-xs text-stone-400 text-center">满 ¥299 免运费 · 7天无理由退换</p>
            <button
              onClick={handleCheckout}
              className="w-full btn-primary justify-center text-sm py-4"
            >
              前往结算
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
