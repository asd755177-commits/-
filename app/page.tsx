'use client';

import { useState } from 'react';

const methods = {
  card: { label: '信用卡', note: '線上刷卡，即時完成', prices: [100, 200, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000] },
  store: { label: '超商', note: '取得繳費代碼後至超商付款', prices: [1000, 2000, 3000, 4000, 5000, 8000, 10000, 15000, 19999] },
} as const;

type Method = keyof typeof methods;

const cardPaymentUrls: Record<number, string> = {
  100: 'https://tinyurl.funpoint.com.tw/88A20A', 200: 'https://tinyurl.funpoint.com.tw/3FEA38', 500: 'https://tinyurl.funpoint.com.tw/9264B2',
  1000: 'https://tinyurl.funpoint.com.tw/4A8B80', 2000: 'https://tinyurl.funpoint.com.tw/2426BA', 3000: 'https://tinyurl.funpoint.com.tw/CD9FC2',
  5000: 'https://tinyurl.funpoint.com.tw/F216C6', 10000: 'https://tinyurl.funpoint.com.tw/247647', 20000: 'https://tinyurl.funpoint.com.tw/C9EF4F',
  30000: 'https://tinyurl.funpoint.com.tw/A34B90', 50000: 'https://tinyurl.funpoint.com.tw/F90149',
};
const storePaymentUrls: Record<number, string> = {
  1000: 'https://tinyurl.funpoint.com.tw/31FDED', 2000: 'https://tinyurl.funpoint.com.tw/942D30', 3000: 'https://tinyurl.funpoint.com.tw/459C05',
  4000: 'https://tinyurl.funpoint.com.tw/121EB7', 5000: 'https://tinyurl.funpoint.com.tw/7C4839', 8000: 'https://tinyurl.funpoint.com.tw/EE0C67',
  10000: 'https://tinyurl.funpoint.com.tw/628208', 15000: 'https://tinyurl.funpoint.com.tw/8FB885', 19999: 'https://tinyurl.funpoint.com.tw/573B7C',
};

export default function Home() {
  const [method, setMethod] = useState<Method>('card');
  const [selected, setSelected] = useState(0);
  const currentPrice = methods[method].prices[selected];
  const currentPoints = (currentPrice * 48).toLocaleString();
  const paymentUrl = method === 'card' ? cardPaymentUrls[currentPrice] ?? null : storePaymentUrls[currentPrice] ?? null;
  const changeMethod = (next: Method) => { setMethod(next); setSelected(0); };

  return <main>
    <header className="topbar"><a className="brand" href="#">碩尹有限公司</a><nav><a href="#packages">儲值方案</a></nav></header>
    <section className="page shell">
      <div className="intro"><p className="step">快速、安全、簡單</p><h1>選擇儲值方案</h1><p>1 元台幣可兌換 48 點，請先選擇付款方式。</p></div>
      <section className="panel" id="packages" aria-labelledby="package-title">
        <div className="panelHead"><div><span className="number">1</span><div><h2 id="package-title">付款方式與點數方案</h2><p>兌換比例：TWD 1＝48 點</p></div></div><span className="secure">● 安全加密付款</span></div>
        <div className="methodTabs" role="tablist" aria-label="付款方式">{(Object.keys(methods) as Method[]).map(key => <button key={key} role="tab" aria-selected={method === key} className={method === key ? 'active' : ''} onClick={() => changeMethod(key)}><span>{key === 'card' ? '▰' : '店'}</span><div><strong>{methods[key].label}</strong><small>{methods[key].note}</small></div></button>)}</div>
        <div className="methodLabel"><strong>{methods[method].label}儲值金額</strong><span>共 {methods[method].prices.length} 種方案</span></div>
        <div className="packageGrid">{methods[method].prices.map((price, index) => <button key={price} type="button" className={`packageCard ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index}><span className="coin" aria-hidden="true">★</span><strong>{(price * 48).toLocaleString()}</strong><span className="price">TWD {price.toLocaleString()}</span><span className="check" aria-hidden="true">✓</span></button>)}</div>
      </section>
      <section className="checkout" aria-labelledby="checkout-title"><div><span className="number">2</span><div><h2 id="checkout-title">確認並結帳</h2><p>{methods[method].label}・已選擇 {currentPoints} 點</p></div></div><div className="summary"><span>應付金額</span><strong>TWD {currentPrice.toLocaleString()}</strong></div>{paymentUrl ? <a className="checkoutButton" href={paymentUrl} target="_blank" rel="noopener noreferrer">前往結帳 <span>→</span></a> : <button className="checkoutButton unavailable" type="button" disabled>尚未開放</button>}</section>
      <section className="help"><h2>付款安心有保障</h2><p>信用卡與超商具有不同儲值上限，請依需要選擇。正式上線前請確認金流與相關服務政策。</p></section>
    </section>
    <footer><div className="shell"><span>© 2026 碩尹有限公司</span><span><a href="https://voicemaker.media/terms_zh-TW.html" target="_blank" rel="noopener noreferrer">服務條款</a>　<a href="https://voicemaker.media/privacy_zh-TW.html" target="_blank" rel="noopener noreferrer">隱私政策</a>　<span>聯絡客服</span></span></div></footer>
  </main>;
}
