'use client';

import { useState } from 'react';

const plans = [
  { amount: 1000, url: 'https://tinyurl.funpoint.com.tw/E5078C' },
  { amount: 2000, url: 'https://tinyurl.funpoint.com.tw/874C46' },
  { amount: 3000, url: 'https://tinyurl.funpoint.com.tw/8B2A24' },
  { amount: 5000, url: 'https://tinyurl.funpoint.com.tw/1CBD94' },
  { amount: 10000, url: 'https://tinyurl.funpoint.com.tw/B3FD74' },
  { amount: 15000, url: 'https://tinyurl.funpoint.com.tw/9947CB' },
  { amount: 19999, url: 'https://tinyurl.funpoint.com.tw/29043A' },
] as const;
const number = (value: number) => value.toLocaleString('zh-TW');

export default function Home() {
  const [selected, setSelected] = useState(0);
  const plan = plans[selected];

  return <main>
    <header className="topbar"><a className="brand" href="#">碩尹有限公司</a><nav><a href="#packages">儲值方案</a></nav></header>
    <section className="page shell">
      <div className="intro"><p className="step">SUGO 儲值中心</p><h1>選擇儲值方案</h1><p>1 元台幣可兌換 48 點，信用卡與超商使用同一付款入口。</p></div>

<section className="panel" id="packages" aria-labelledby="package-title" style={{ scrollMarginTop: 90 }}>
        <div className="panelHead"><div><span className="number">1</span><div><h2 id="package-title">選擇儲值方案</h2><p>兌換比例：TWD 1＝48 點</p></div></div><span style={{ fontSize: 14, color: '#697386' }}>信用卡／超商</span></div>
        <div className="methodLabel"><strong>最低儲值 TWD 1,000</strong><span>共 7 種方案</span></div>
        <div className="packageGrid">{plans.map((item, index) => <button key={item.amount} type="button" className={`packageCard ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`儲值 ${number(item.amount)} 元，${number(item.amount * 48)} 點`}><span className="coin" aria-hidden="true">★</span><strong>{number(item.amount * 48)}</strong><span style={{ fontSize: 14, color: '#697386' }}>點</span><span className="price">TWD {number(item.amount)}</span><span className="check" aria-hidden="true">✓</span></button>)}</div>
      </section>

      <section className="checkout" aria-labelledby="checkout-title">
        <div><span className="number">2</span><div><h2 id="checkout-title">確認並付款</h2><p>進入付款頁後選擇信用卡或超商。</p></div></div>
        <div className="summary" aria-live="polite"><span>已選擇 {number(plan.amount * 48)} 點</span><strong>TWD {number(plan.amount)}</strong></div>
        <a className="checkoutButton" href={plan.url} target="_blank" rel="noopener noreferrer">前往付款 <span aria-hidden="true">→</span></a>
      </section>

      <section className="help"><h2>付款與儲值說明</h2><p>每個方案使用同一付款入口，可在付款頁選擇信用卡或超商。付款完成後請保留交易憑證；目前尚未提供付款後自動入點，請先向幣商確認入點處理方式。僅限 TW 幣商替 TW 區域帳號儲值。</p></section>
    </section>
    <footer><div className="shell"><span>© 2026 碩尹有限公司</span><span><a href="https://voicemaker.media/terms_zh-TW.html" target="_blank" rel="noopener noreferrer">服務條款</a>　<a href="https://voicemaker.media/privacy_zh-TW.html" target="_blank" rel="noopener noreferrer">隱私政策</a>　<span>聯絡客服</span></span></div></footer>
  </main>;
}
