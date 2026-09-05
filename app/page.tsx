'use client';

import { useState, type FormEvent } from 'react';

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
  const [uid, setUid] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const plan = plans[selected];

  function confirmAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = uid.trim();
    if (!/^[0-9]+$/.test(value)) {
      setError('請輸入只含數字的 SUGO UID。');
      return;
    }
    setAccount(value);
    setError('');
  }

  return <main>
    <header className="topbar"><a className="brand" href="#">碩尹有限公司</a><nav><a href="#account">儲值帳號</a><a href="#packages">儲值方案</a></nav></header>
    <section className="page shell">
      <div className="intro"><p className="step">SUGO 儲值中心</p><h1>選擇儲值方案</h1><p>1 元台幣可兌換 48 點，信用卡與超商使用同一付款入口。</p></div>

      <section className="panel" id="account" aria-labelledby="account-title" style={{ marginBottom: 22, scrollMarginTop: 90 }}>
        <div className="panelHead"><div><span className="number">1</span><div><h2 id="account-title">儲值帳號</h2><p>請使用 SUGO UID，展示 ID 與靚號無法使用。</p></div></div></div>
        <div style={{ padding: '24px 28px' }}>
          {account ? <div>
            <p style={{ margin: '0 0 12px', overflowWrap: 'anywhere' }}><strong>已填寫 UID：{account}</strong><span style={{ display: 'block', marginTop: 8, color: '#697386', fontSize: 14 }}>尚未驗證帳號身分</span></p>
            <button className="checkoutButton" type="button" onClick={() => setAccount('')}>修改帳號</button>
          </div> : <form onSubmit={confirmAccount}>
            <label htmlFor="sugo-uid" style={{ display: 'block', fontWeight: 700, marginBottom: 10 }}>SUGO UID</label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <input id="sugo-uid" name="uid" value={uid} onChange={event => { setUid(event.target.value); setError(''); }} type="text" inputMode="numeric" autoComplete="off" placeholder="請輸入 SUGO UID" required aria-invalid={Boolean(error)} aria-describedby={error ? 'uid-error account-note' : 'account-note'} style={{ minWidth: 0, flex: '1 1 220px', border: '1px solid #a9b2bf', borderRadius: 10, padding: '14px 16px', fontSize: 16, color: '#1d2433', background: '#fff' }} />
              <button className="checkoutButton" type="submit">確認填寫</button>
            </div>
            {error && <p id="uid-error" role="alert" style={{ color: '#b42318', marginTop: 10 }}>{error}</p>}
          </form>}
          <p id="account-note" role="status" style={{ fontSize: 14, lineHeight: 1.7, color: '#697386', margin: '16px 0 0' }}>帳號登入與驗證尚未開放。UID 僅暫存在本頁，不會傳送到付款頁，也不會自動入點。</p>
        </div>
      </section>

      <section className="panel" id="packages" aria-labelledby="package-title" style={{ scrollMarginTop: 90 }}>
        <div className="panelHead"><div><span className="number">2</span><div><h2 id="package-title">選擇儲值方案</h2><p>兌換比例：TWD 1＝48 點</p></div></div><span style={{ fontSize: 14, color: '#697386' }}>信用卡／超商</span></div>
        <div className="methodLabel"><strong>最低儲值 TWD 1,000</strong><span>共 7 種方案</span></div>
        <div className="packageGrid">{plans.map((item, index) => <button key={item.amount} type="button" className={`packageCard ${selected === index ? 'selected' : ''}`} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`儲值 ${number(item.amount)} 元，${number(item.amount * 48)} 點`}><span className="coin" aria-hidden="true">★</span><strong>{number(item.amount * 48)}</strong><span style={{ fontSize: 14, color: '#697386' }}>點</span><span className="price">TWD {number(item.amount)}</span><span className="check" aria-hidden="true">✓</span></button>)}</div>
      </section>

      <section className="checkout" aria-labelledby="checkout-title">
        <div><span className="number">3</span><div><h2 id="checkout-title">確認並付款</h2><p>進入付款頁後選擇信用卡或超商。</p></div></div>
        <div className="summary" aria-live="polite"><span>已選擇 {number(plan.amount * 48)} 點</span><strong>TWD {number(plan.amount)}</strong></div>
        <a className="checkoutButton" href={plan.url} target="_blank" rel="noopener noreferrer">前往付款 <span aria-hidden="true">→</span></a>
      </section>

      <section className="help"><h2>付款與儲值說明</h2><p>每個方案使用同一付款入口，可在付款頁選擇信用卡或超商。付款完成後請保留交易憑證；目前尚未提供付款後自動入點，請先向幣商確認入點處理方式。僅限 TW 幣商替 TW 區域帳號儲值。</p></section>
    </section>
    <footer><div className="shell"><span>© 2026 碩尹有限公司</span><span><a href="https://voicemaker.media/terms_zh-TW.html" target="_blank" rel="noopener noreferrer">服務條款</a>　<a href="https://voicemaker.media/privacy_zh-TW.html" target="_blank" rel="noopener noreferrer">隱私政策</a>　<span>聯絡客服</span></span></div></footer>
  </main>;
}
