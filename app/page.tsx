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
const customPaymentUrl = 'https://tinyurl.funpoint.com.tw/74B61D';
const number = (value: number) => value.toLocaleString('zh-TW');

export default function Home() {
  const [uid, setUid] = useState('');
  const [uidConfirmed, setUidConfirmed] = useState(false);
  const [selected, setSelected] = useState<number | 'custom'>(0);
  const [customAmount, setCustomAmount] = useState('');
  const isCustom = selected === 'custom';
  const amount = isCustom ? Number(customAmount) : plans[selected].amount;
  const hasAmount = Number.isInteger(amount) && amount >= 1000 && amount <= 19999;
  const paymentUrl = isCustom ? customPaymentUrl : plans[selected].url;
  const canPay = hasAmount && uidConfirmed && uid.trim().length > 0;

  return <main>
    <section className="page shell">
      <div className="brandHero"><img className="heroPromo" src="/sugo-promo.png" alt="為心動加值，與有趣的人連線" /><div className="heroCopy"><p className="step">SUGO 儲值中心</p><h1>快速儲值</h1><p>輸入帳號 UID、選擇金額，即可前往信用卡或超商付款。</p></div></div>
      <section className="uidPanel" aria-labelledby="uid-title">
        <div className="panelHead"><div><span className="number">1</span><div><h2 id="uid-title">儲值帳號</h2><p>請填寫 SUGO UID，確保點數入到正確帳號。</p></div></div><img className="uidLogo" src="/sugo-lite.png" alt="SUGO Lite" /></div>
        <div className="uidForm"><label htmlFor="sugo-uid">SUGO UID</label><div className="uidRow"><input id="sugo-uid" value={uid} onChange={event => { setUid(event.target.value); setUidConfirmed(false); }} placeholder="請輸入 SUGO UID" autoComplete="off" /><button type="button" onClick={() => setUidConfirmed(uid.trim().length > 0)} disabled={!uid.trim()}>確認 UID</button></div><p className="fieldNote">UID 僅用於本次儲值流程，請再次確認英數字是否正確。</p>{uidConfirmed && <p className="successNote" role="status">UID 已確認：{uid.trim()}</p>}</div>
      </section>
      <section className="panel" id="packages" aria-labelledby="package-title" style={{ scrollMarginTop: 90 }}>
        <div className="panelHead"><div><span className="number">2</span><div><h2 id="package-title">選擇儲值方案</h2><p>兌換比例：TWD 1＝48 點</p></div></div><span style={{ fontSize: 14, color: '#697386' }}>信用卡／超商</span></div>
        <div className="methodLabel"><strong>最低儲值 TWD 1,000</strong><span>固定方案 7 種</span></div>
        <div className="packageGrid">
          {plans.map((item, index) => <button key={item.amount} type="button" className={'packageCard ' + (selected === index ? 'selected' : '')} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={'儲值 ' + number(item.amount) + ' 元，' + number(item.amount * 48) + ' 點'}><span className="coin" aria-hidden="true">★</span><strong>{number(item.amount * 48)}</strong><span style={{ fontSize: 14, color: '#697386' }}>點</span><span className="price">TWD {number(item.amount)}</span><span className="check" aria-hidden="true">✓</span></button>)}
          <button type="button" className={'packageCard customCard ' + (isCustom ? 'selected' : '')} onClick={() => setSelected('custom')} aria-pressed={isCustom} aria-label="其他金額，自訂儲值金額"><span className="coin" aria-hidden="true">＋</span><strong>其他金額</strong><span style={{ fontSize: 14, color: '#697386' }}>自訂儲值金額</span><span className="check" aria-hidden="true">✓</span></button>
        </div>
        {isCustom && <div className="customAmount"><label htmlFor="custom-amount">輸入自訂金額（TWD）</label><input id="custom-amount" type="number" min="1000" max="19999" step="1" inputMode="numeric" value={customAmount} onChange={event => setCustomAmount(event.target.value)} placeholder="例如 4,000" aria-describedby="custom-note" /><p id="custom-note">請輸入 1,000 至 19,999 的整數金額。</p></div>}
      </section>
      <section className="checkout" aria-labelledby="checkout-title">
        <div><span className="number">3</span><div><h2 id="checkout-title">確認並付款</h2><p>進入付款頁後選擇信用卡或超商。</p></div></div>
        <div className="summary" aria-live="polite"><span>{!uidConfirmed ? '請先確認 UID' : hasAmount ? '已選擇 ' + number(amount * 48) + ' 點' : '請先輸入自訂金額'}</span><strong>{hasAmount ? 'TWD ' + number(amount) : '—'}</strong></div>
        {canPay ? <a className="checkoutButton" href={paymentUrl} target="_blank" rel="noopener noreferrer">前往付款 <span aria-hidden="true">→</span></a> : <button className="checkoutButton unavailable" type="button" disabled>{!uidConfirmed ? '確認 UID 後付款' : '輸入金額後付款'}</button>}
      </section>
      <section className="help"><h2>付款與儲值說明</h2><p>每個方案使用同一付款入口，可在付款頁選擇信用卡或超商。付款完成後請保留交易憑證；自訂金額請依付款頁顯示為準。目前尚未提供付款後自動入點，僅限 TW 幣商替 TW 區域帳號儲值。</p></section>
    </section>
    <footer><div className="shell"><span>SUGO 儲值中心</span><span><a href="https://voicemaker.media/terms_zh-TW.html" target="_blank" rel="noopener noreferrer">服務條款</a>　<a href="https://voicemaker.media/privacy_zh-TW.html" target="_blank" rel="noopener noreferrer">隱私政策</a>　<span>聯絡客服</span></span></div></footer>
  </main>;
}

