import { useState } from 'react';
import { CheckCircle, CreditCard, Truck, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useNavigate, Link } from 'react-router-dom';

type Step = 'info' | 'payment' | 'confirm';

const STEPS = [
  { key: 'info', label: '收货信息', icon: Truck },
  { key: 'payment', label: '支付方式', icon: CreditCard },
  { key: 'confirm', label: '确认下单', icon: CheckCircle },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('info');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNum] = useState(`OT${Date.now().toString().slice(-8)}`);
  const [form, setForm] = useState({ name: '', phone: '', province: '', city: '', district: '', address: '', note: '' });
  const [payMethod, setPayMethod] = useState<'wechat' | 'alipay' | 'card'>('wechat');

  const subtotal = totalPrice();
  const shipping = subtotal >= 299 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInfoNext = (e: React.FormEvent) => { e.preventDefault(); setStep('payment'); };
  const handlePlaceOrder = () => { setOrderPlaced(true); clearCart(); };

  // ── Order success ──────────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-ink-50 flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-forest-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-ink-950 mb-3">订单已提交！</h2>
          <p className="text-ink-500 mb-1 text-[15px]">感谢你选择 OpenTree，你的能量之旅正式开始。</p>
          <p className="text-ink-400 text-sm mb-8">预计 3-5 个工作日内送达，请保持电话畅通。</p>
          <div className="bg-white rounded-2xl p-6 mb-6 text-left shadow-card">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[12px] text-ink-400 uppercase tracking-widest font-semibold">订单号</p>
              <p className="font-mono font-bold text-ink-800 text-sm">{orderNum}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[12px] text-ink-400 uppercase tracking-widest font-semibold">实付金额</p>
              <p className="text-2xl font-bold text-brand-600">¥{total.toFixed(0)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary-gold w-full justify-center mb-3">
            返回首页
          </button>
          <Link to="/products" className="block text-ink-400 text-sm hover:text-ink-700 transition-colors">
            继续购物
          </Link>
        </div>
      </div>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-ink-200 mb-4" />
        <h2 className="font-semibold text-ink-800 text-xl mb-2">购物袋是空的</h2>
        <p className="text-ink-400 mb-6">请先添加商品再来结算</p>
        <Link to="/products" className="btn-primary">浏览产品</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50 pt-16 lg:pt-[70px]">
      {/* Progress bar */}
      <div className="bg-white border-b border-ink-100 sticky top-16 lg:top-[70px] z-30">
        <div className="container-base py-4">
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((s, i) => {
              const stepIdx = STEPS.findIndex((x) => x.key === step);
              const isDone = i < stepIdx;
              const isCurrent = s.key === step;
              return (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                    isCurrent ? 'bg-ink-950 text-white' :
                    isDone ? 'bg-forest-100 text-forest-700' :
                    'text-ink-400'
                  }`}>
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                  </div>
                  {i < STEPS.length - 1 && <div className={`w-6 h-px ${isDone ? 'bg-forest-400' : 'bg-ink-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-base py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">
          {/* Main form */}
          <div className="lg:col-span-3">
            {/* Step: Info */}
            {step === 'info' && (
              <div className="bg-white rounded-2xl p-7 shadow-card">
                <h2 className="font-semibold text-ink-900 text-lg mb-6">收货信息</h2>
                <form onSubmit={handleInfoNext} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[12px] font-semibold text-ink-500 mb-1.5 block">收货人 *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-300 text-ink-900"
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-ink-500 mb-1.5 block">手机号 *</label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-300 text-ink-900"
                        placeholder="请输入手机号"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'province', label: '省份 *', placeholder: '省份' },
                      { key: 'city', label: '城市 *', placeholder: '城市' },
                      { key: 'district', label: '区/县 *', placeholder: '区/县' },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="text-[12px] font-semibold text-ink-500 mb-1.5 block">{f.label}</label>
                        <input
                          required
                          value={(form as any)[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-300 text-ink-900"
                          placeholder={f.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-ink-500 mb-1.5 block">详细地址 *</label>
                    <input
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-300 text-ink-900"
                      placeholder="街道、门牌号"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold text-ink-500 mb-1.5 block">备注</label>
                    <textarea
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className="w-full border border-ink-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-300 text-ink-900 resize-none"
                      rows={2}
                      placeholder="如有特殊要求请填写"
                    />
                  </div>
                  <button type="submit" className="btn-primary-gold w-full justify-center mt-2">
                    下一步：选择支付方式
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Step: Payment */}
            {step === 'payment' && (
              <div className="bg-white rounded-2xl p-7 shadow-card">
                <h2 className="font-semibold text-ink-900 text-lg mb-6">选择支付方式</h2>
                <div className="space-y-3 mb-7">
                  {[
                    { key: 'wechat', label: '微信支付', sub: '推荐', color: 'text-green-600' },
                    { key: 'alipay', label: '支付宝', sub: '', color: 'text-blue-600' },
                    { key: 'card', label: '银行卡支付', sub: '', color: 'text-ink-600' },
                  ].map((m) => (
                    <label
                      key={m.key}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        payMethod === m.key ? 'border-ink-950 bg-ink-50' : 'border-ink-100 hover:border-ink-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        value={m.key}
                        checked={payMethod === m.key}
                        onChange={() => setPayMethod(m.key as typeof payMethod)}
                        className="w-4 h-4 accent-ink-950"
                      />
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-[15px] ${m.color}`}>{m.label}</span>
                        {m.sub && <span className="badge-gold">{m.sub}</span>}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep('info')} className="btn-outline flex-1 justify-center">
                    上一步
                  </button>
                  <button onClick={() => setStep('confirm')} className="btn-primary-gold flex-1 justify-center">
                    下一步：确认订单
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step: Confirm */}
            {step === 'confirm' && (
              <div className="bg-white rounded-2xl p-7 shadow-card">
                <h2 className="font-semibold text-ink-900 text-lg mb-6">确认订单信息</h2>
                <div className="space-y-4 mb-6">
                  <div className="bg-ink-50 rounded-xl p-4 text-[14px]">
                    <p className="font-semibold text-ink-700 mb-2">收货信息</p>
                    <p className="text-ink-500">{form.name}  {form.phone}</p>
                    <p className="text-ink-500">{form.province}{form.city}{form.district}{form.address}</p>
                    {form.note && <p className="text-ink-400 mt-1">备注：{form.note}</p>}
                  </div>
                  <div className="bg-ink-50 rounded-xl p-4 text-[14px]">
                    <p className="font-semibold text-ink-700 mb-2">支付方式</p>
                    <p className="text-ink-500">
                      {{ wechat: '微信支付', alipay: '支付宝', card: '银行卡支付' }[payMethod]}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')} className="btn-outline flex-1 justify-center">
                    上一步
                  </button>
                  <button onClick={handlePlaceOrder} className="btn-primary-gold flex-1 justify-center">
                    提交订单 · ¥{total.toFixed(0)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-[120px]">
              <h3 className="font-semibold text-ink-900 mb-5">订单摘要</h3>
              <div className="space-y-3 mb-5 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.coverImage} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-ink-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-ink-800 clamp-1">{item.name}</p>
                      <p className="text-[11px] text-ink-400 mt-0.5 clamp-1">{item.subtitle}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5 border border-ink-200 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:bg-ink-100 transition-colors text-ink-500">
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[12px] font-semibold text-ink-800 w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-ink-100 transition-colors text-ink-500">
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-bold text-ink-900 text-[13px]">¥{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-500">商品小计</span>
                  <span className="text-ink-800 font-medium">¥{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-500">运费</span>
                  <span className={subtotal >= 299 ? 'text-forest-600 font-semibold' : 'text-ink-800 font-medium'}>
                    {subtotal >= 299 ? '免运费' : `¥${shipping}`}
                  </span>
                </div>
                {subtotal < 299 && (
                  <p className="text-[11px] text-ink-400">再购 ¥{(299 - subtotal).toFixed(0)} 即可免运费</p>
                )}
                <div className="flex justify-between font-bold text-[16px] pt-2 border-t border-ink-100">
                  <span className="text-ink-900">合计</span>
                  <span className="text-brand-600">¥{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
