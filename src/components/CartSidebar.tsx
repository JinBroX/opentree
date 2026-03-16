import { useCartStore } from '../store/cartStore';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';

export default function CartSidebar() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { t, lang } = useLang();

  const formatPrice = (p: number) =>
    lang === 'zh' ? `¥${p.toLocaleString()}` : `$${(p / 7.2).toFixed(0)}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-ink-700" />
            <span className="font-semibold text-ink-900 text-[17px]">{t.cart.title}</span>
            {items.length > 0 && (
              <span className="min-w-[22px] h-[22px] bg-brand-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1.5">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 rounded-xl hover:bg-ink-100 transition-colors text-ink-500 hover:text-ink-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <ShoppingBag className="w-16 h-16 text-ink-200 mb-4" />
            <p className="text-ink-500 font-medium mb-2">{t.cart.empty}</p>
            <p className="text-ink-400 text-sm mb-6">{t.cart.emptyHint}</p>
            <button onClick={toggleCart}>
              <Link to="/products" className="btn-primary text-[13px]">
                {t.cart.shopNow}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-3 rounded-2xl bg-ink-50 hover:bg-ink-100 transition-colors">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink-900 text-[14px] leading-snug clamp-1">{item.name}</p>
                    <p className="text-ink-400 text-[12px] mt-0.5 clamp-1">{item.subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-ink-900 font-semibold text-[13px] w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-ink-200 flex items-center justify-center text-ink-600 hover:bg-ink-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-ink-900 text-[14px]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-ink-400 hover:text-red-500 transition-colors"
                          aria-label={t.cart.remove}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-ink-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-ink-500 text-[15px]">{t.cart.subtotal}</span>
                <span className="font-bold text-ink-950 text-xl">{formatPrice(totalPrice())}</span>
              </div>
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="btn-primary-gold w-full text-[15px] justify-center"
              >
                {t.cart.checkout}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={toggleCart}
                className="w-full text-ink-400 text-[13px] hover:text-ink-600 transition-colors py-1"
              >
                {lang === 'zh' ? '继续购物' : 'Continue Shopping'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
