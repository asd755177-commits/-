import urllib.request,re,html,json,concurrent.futures
from pathlib import Path
P=Path(__file__).resolve().parent.parent
def clean(s):return html.unescape(re.sub('<[^>]+>','',s)).strip()
def fetch(old):
    for attempt in range(2):
        try:
            s=urllib.request.urlopen(old['url'],timeout=45).read().decode('utf-8-sig')
            name=clean(re.search(r'id="hlLawName"[^>]*>(.*?)</a>',s,re.S).group(1))
            if name!=old['name']:raise ValueError('name mismatch')
            date=re.search(r'id="trLN[N|D]Date".*?<td>(.*?)</td>',s,re.S)
            notice=re.search(r'<th>生效狀態：</th>.*?<td>(.*?)</td>',s,re.S)
            arts=[]
            pat=r'<div class="col-no">.*?<a [^>]*name="([^"]+)"[^>]*>(.*?)</a>.*?<div class="law-article">((?:\s*<div[^>]*>.*?</div>)+)\s*</div>'
            for m in re.finditer(pat,s,re.S):
                text='\n'.join(clean(p) for p in re.findall(r'<div[^>]*>(.*?)</div>',m.group(3),re.S))
                arts.append(dict(number=m.group(1),label=clean(m.group(2)),text=text,url='https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode='+old['id']+'&flno='+m.group(1)))
            if len(arts)<len(old['articles'])*.8:raise ValueError('incomplete')
            return {**old,'revision':clean(date.group(1)) if date else old['revision'],'notice':clean(notice.group(1)) if notice else '', 'articles':arts}
        except Exception:
            if attempt==1:raise
laws=json.loads((P/'content/laws.json').read_text()) if (P/'content/laws.json').exists() else json.loads((P/'content/seed.json').read_text())['laws']
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex: laws=list(ex.map(fetch,laws))
(P/'content/laws.json').write_text(json.dumps(laws,ensure_ascii=False,indent=2))
print('Fetched complete paragraphs for',len(laws),'laws,',sum(len(l['articles']) for l in laws),'articles')
