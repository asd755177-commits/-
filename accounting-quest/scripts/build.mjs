import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const seed=JSON.parse(read('content/seed.json'));
const plan=JSON.parse(read('content/course.json'));
const output=`const HTML=${JSON.stringify(read('worker/page.html'))};\nconst CSS=${JSON.stringify(read('worker/style.css')+'\n'+read('worker/features.css'))};\nconst JS=${JSON.stringify('const COURSE_PLAN='+JSON.stringify(plan)+';\n'+read('worker/app.js')+'\n'+read('worker/features.js'))};\nconst SEED=${JSON.stringify(seed)};\nconst COURSE_PLAN=${JSON.stringify(plan)};\n${read('worker/features-runtime.js')}\n${read('worker/runtime.js')}`;
fs.mkdirSync('dist/server',{recursive:true});fs.mkdirSync('dist/.openai',{recursive:true});fs.writeFileSync('dist/server/index.js',output);fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');console.log('Built worker, '+seed.questions.length+' questions, '+seed.laws.length+' full laws');
