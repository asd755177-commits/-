import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const seed=JSON.parse(read('content/seed.json'));
const output=`const HTML=${JSON.stringify(read('worker/page.html'))};\nconst CSS=${JSON.stringify(read('worker/style.css'))};\nconst JS=${JSON.stringify(read('worker/app.js'))};\nconst SEED=${JSON.stringify(seed)};\n${read('worker/runtime.js')}`;
fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});fs.writeFileSync('dist/server/index.js',output);fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');console.log('Built worker, '+seed.questions.length+' questions, '+seed.laws.length+' full laws');
