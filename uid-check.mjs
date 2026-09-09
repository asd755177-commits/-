import ts from 'typescript';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source = fs.readFileSync('app/api/uid/route.ts','utf8');
const js = ts.transpile(source,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022});
const {GET}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
let calls=0;
const run=(uid='123')=>GET(new Request('https://example.test/api/uid?uid='+encodeURIComponent(uid)));
globalThis.fetch=async()=>{calls++; return Response.json({code:0,userInfo:{nickname:'測試暱稱'},secret:'excluded'})};
for(const uid of ['', 'abc','12.5',' 123','１２３','1'.repeat(65)]) assert.equal((await run(uid)).status,400);
assert.equal(calls,0);
let response=await run('00123'); assert.equal(response.headers.get('cache-control'),'no-store');
assert.deepEqual(await response.json(),{code:0,uid:'00123',nickname:'測試暱稱'});
for(const [code,status] of [[20308,404],[45,503]]) {globalThis.fetch=async()=>Response.json({rspHead:{code}}); response=await run(); assert.equal(response.status,status);assert.equal((await response.json()).code,code);}
for(const data of [null,{code:0},{code:0,userInfo:{nickname:123}},{code:99}]) {globalThis.fetch=async()=>Response.json(data);assert.equal((await run()).status,502);}
globalThis.fetch=async()=>new Response('not json'); assert.equal((await run()).status,502);
globalThis.fetch=async()=>{throw new TypeError('network')};assert.match((await (await run()).json()).message,/網路/);
const originalTimer=globalThis.setTimeout;
globalThis.setTimeout=(fn)=>originalTimer(fn,1);
globalThis.fetch=async(_url,{signal})=>new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('abort'))));
assert.equal((await run()).status,504);
globalThis.setTimeout=originalTimer;
console.log('PASS: validation, success allowlist, error codes, malformed responses, network failure, timeout, no-store');

