import { useState } from 'react';
import { ArrowRight, CheckCircle, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

type Step = 'info' | 'payment' | 'confirm';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('info');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    address: '',
    note: '',
  });
  const [payMethod, setPayMethod] = useState<'wechat' | 'alipay' | 'card'>('wechat');

  const subtotal = totalPrice();
  const shipping = subtotal >= 299 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInfoNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setStep('confirm');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center pt-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sage-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-stone-800 mb-3">订单已提交！</h2>
          <p className="text-stone-500 mb-2">感谢你选择 OpenTree，你的能量之旅正式开始。</p>
          <p className="text-stone-400 text-sm mb-8">预计 3-5 个工作日内送达，请保持电话畅通。</p>
          <div className="bg-white rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm text-stone-500 mb-1">订单号</p>
            <p className="font-mono font-semibold text-stone-800">
              OT{Date.now().toString().slice(-8)}
            </p>
            <p className="text-sm text-stone-500 mt-3 mb-1">实付金额</p>
            <p className="text-2xl font-bold text-earth-600">¥{total.toFixed(0)}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full justify-center"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold text-stone-800 mb-8">结算</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {(['info', 'payment', 'confirm'] as Step[]).map((s, i) => {
            const labels = ['收货信息', '支付方式', '确认订单'];
            const isActive = step === s;
            const isDone =
              (step === 'payment' && s === 'info') ||
              (step === 'confirm' && (s === 'info' || s === 'payment'));
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive ? 'bg-earth-600 text-white' : isDone ? 'bg-sage-100 text-sage-700' : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      isActive ? 'bg-white text-earth-600' : isDone ? 'bg-sage-500 text-white' : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isDone ? '✓' : i + 1}
                  </span>
                  {labels[i]}
                </div>
                {i < 2 && <ArrowRight className="w-4 h-4 text-stone-300" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'info' && (
              <form onSubmit={handleInfoNext} className="bg-white rounded-3xl p-8 space-y-5">
                <h2 className="font-semibold text-stone-800 text-lg flex items-center gap-2">
                  <Truck className="w-5 h-5 text-earth-600" />
                  收货信息
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      收货人 <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="请输入姓名"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      手机号码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="请输入手机号"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">省份</label>
                    <input
                      value={form.province}
                      onChange={(e) => setForm({ ...form, province: e.target.value })}
                      placeholder="省份"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">城市</label>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="城市"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    详细地址 <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="街道、楼栋、门牌号"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">备注（可选）</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="如有特殊要求，请在此说明"
                    rows={2}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-earth-300 bg-stone-50 resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  下一步：选择支付方式
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-3xl p-8 space-y-5">
                <h2 className="font-semibold text-stone-800 text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-earth-600" />
                  选择支付方式
                </h2>
                {[
                  { id: 'wechat', label: '微信支付', icon: '💚', desc: '使用微信扫码支付' },
                  { id: 'alipay', label: '支付宝', icon: '💙', desc: '使用支付宝扫码支付' },
                  { id: 'card', label: '银行卡', icon: '💳', desc: '使用银联信用卡/借记卡' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      payMethod === method.id
                        ? 'border-earth-500 bg-earth-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payMethod === method.id}
                      onChange={() => setPayMethod(method.id as typeof payMethod)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-medium text-stone-800">{method.label}</p>
                      <p className="text-stone-400 text-sm">{method.desc}</p>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      payMethod === method.id ? 'border-earth-500 bg-earth-500' : 'border-stone-300'
                    }`}>
                      {payMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </label>
                ))}

                {/* Demo note */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-sm font-medium">💡 演示说明</p>
                  <p className="text-amber-700 text-xs mt-1">
                    这是一个演示支付流程，实际部署时请接入微信支付 / 支付宝 API。
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('info')}
                    className="btn-secondary flex-1 justify-center text-sm"
                  >
                    返回修改
                  </button>
                  <button
                    onClick={() => setStep('confirm')}
                    className="btn-primary flex-1 justify-center text-sm"
                  >
                    下一步：确认订单
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="bg-white rounded-3xl p-8 space-y-6">
                <h2 className="font-semibold text-stone-800 text-lg">确认订单信息</h2>

                <div className="bg-stone-50 rounded-2xl p-5">
                  <p className="text-sm font-medium text-stone-700 mb-3">收货地址</p>
                  <p className="text-stone-600 text-sm">
                    {form.name} &nbsp; {form.phone}
                  </p>
                  <p className="text-stone-500 text-sm mt-1">
                    {form.province} {form.city} {form.address}
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-5">
                  <p className="text-sm font-medium text-stone-700 mb-3">支付方式</p>
                  <p className="text-stone-600 text-sm">
                    {payMethod === 'wechat' ? '微信支付' : payMethod === 'alipay' ? '支付宝' : '银行卡'}
                  </p>
                </div>

                {form.note && (
                  <div className="bg-stone-50 rounded-2xl p-5">
                    <p className="text-sm font-medium text-stone-700 mb-1">备注</p>
                    <p className="text-stone-500 text-sm">{form.note}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="btn-secondary flex-1 justify-center text-sm"
                  >
                    返回修改
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary flex-1 justify-center text-sm"
                  >
                    确认下单 ¥{total}
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl p-6 sticky top-24">
              <h2 className="font-semibold text-stone-800 mb-5">订单汇总</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3">
                    <img
                      src={item.product.coverImage}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-700 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {Object.values(item.selectedVariants).join(' · ')}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-stone-400">×{item.quantity}</span>
                        <span className="text-sm font-semibold text-stone-700">
                          ¥{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-stone-500">
                  <span>商品小计</span>
                  <span>¥{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>运费</span>
                  <span className={shipping === 0 ? 'text-sage-600 font-medium' : ''}>
                    {shipping === 0 ? '免运费' : `¥${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-800 text-lg pt-2 border-t border-stone-100">
                  <span>合计</span>
                  <span className="text-earth-600">¥{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
