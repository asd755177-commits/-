export const dynamic = 'force-dynamic';

const reply = (body: object, status = 200) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store' },
});

export async function GET(request: Request) {
  const uid = new URL(request.url).searchParams.get('uid') ?? '';
  if (!/^[0-9]+$/.test(uid) || uid.length > 64) {
    return reply({ message: 'UID 格式錯誤，請輸入純數字 UID（不支援 Show ID／Gold ID）' }, 400);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://rpc.voicemaker.media:443/webhook/coin_seller/user_info?uid=${encodeURIComponent(uid)}`, {
      signal: controller.signal, cache: 'no-store', redirect: 'error',
      headers: { Accept: 'application/json' },
    });
    let data;
    try { data = await response.json(); }
    catch (error) {
      if (controller.signal.aborted) throw error;
      return reply({ message: '查詢服務回傳格式錯誤，請稍後再試' }, 502);
    }
    const code = data?.rspHead?.code ?? data?.code;
    if (code === 20308) return reply({ code: 20308, message: '查無此 UID，請重新確認' }, 404);
    if (code === 45) return reply({ code: 45, message: '查詢服務尚未完成 IP 授權，請聯絡客服' }, 503);
    if (!response.ok) return reply({ message: '查詢服務暫時無法使用，請稍後再試' }, 502);
    if (code === 0 && typeof data?.userInfo?.nickname === 'string') {
      return reply({ code: 0, uid, nickname: data.userInfo.nickname });
    }
    return reply({ message: '查詢服務回傳格式或狀態異常，請稍後再試' }, 502);
  } catch {
    return reply({ message: controller.signal.aborted ? '查詢逾時，請稍後再試' : '查詢網路連線失敗，請稍後再試' }, controller.signal.aborted ? 504 : 502);
  } finally { clearTimeout(timer); }
}

