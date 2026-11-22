import{readdirSync as d,readFileSync as f,writeFileSync as w,mkdirSync as m}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
const A=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>(a/b)|0,(a,b)=>(a%b)|0,(a,b)=>Math.floor((a>>>0)/(b>>>0)),(a,b)=>(a>>>0)%(b>>>0),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
function V(p,b){
 const s=new Int32Array(256);let t=0;const c=new Int32Array(64);let q=0;const y=new Int32Array(256);
 const o=[];let pc=0,n=0,i=0,x=0;
 const P=()=>{if(!t)throw 2;return s[--t]};
 const G=v=>{if(t>255)throw 3;s[t++]=v|0};
 const B=()=>Buffer.from(o);
 const u=()=>p[pc+1]|p[pc+2]<<8;
 try{for(;;){
  if(n>=1e6)throw 10;
  if(pc<0||pc>=p.length)throw 9;
  const k=p[pc];
  if(!(k<8||k>15&&k<31||k>31&&k<35||k>47&&k<53||k>63&&k<66||k>79&&k<84))throw 5;
  const L=k==1?1:k==2?4:k>47&&k<52?2:0;
  if(pc+1+L>p.length)throw 9;
  n++;
  let j=pc+1+L;
  if(k==0)return{bytes:B(),code:0};
  else if(k==1)G((p[pc+1]<<24)>>24);
  else if(k==2)G(p.readInt32LE(pc+1));
  else if(k==3)P();
  else if(k==4){const a=P();G(a);G(a)}
  else if(k==5){const b=P(),a=P();G(b);G(a)}
  else if(k==6){const b=P(),a=P();G(a);G(b);G(a)}
  else if(k==7){const h=P(),b=P(),a=P();G(b);G(h);G(a)}
  else if(k==23)G(-P());
  else if(k==27)G(~P());
  else if(k>15&&k<35){const b=P(),a=P();if(k>18&&k<23&&!b)throw 4;G(A[k-16](a,b))}
  else if(k==48)j+=(u()<<16)>>16;
  else if(k==49){if(!P())j+=(u()<<16)>>16}
  else if(k==50){if(P())j+=(u()<<16)>>16}
  else if(k==51){if(q>63)throw 7;c[q++]=j;j=u()}
  else if(k==52){if(!q)throw 8;j=c[--q]}
  else if(k==64){const a=P();if(a<0||a>255)throw 6;G(y[a])}
  else if(k==65){const a=P(),v=P();if(a<0||a>255)throw 6;y[a]=v}
  else if(k==80){const v=P(),g=String(v);if(o.length+g.length>65536)throw 11;for(const h of g)o.push(h.charCodeAt(0))}
  else if(k==81){const v=P();if(o.length>65535)throw 11;o.push(v&255)}
  else if(k==82)G(i<b.length?b[i++]:-1);
  else if(k==83){x=P()&255;return{bytes:B(),code:x}}
  pc=j;
 }}catch(z){x=z}
 return{bytes:B(),code:x};
}
for(const id of d(I)){
 const g=`${I}/${id}/program.bin`;
 let p;
 try{p=f(g)}catch{continue}
 let b=Buffer.alloc(0);
 try{b=f(`${I}/${id}/input.bin`)}catch{}
 const r=V(p,b);
 m(`${O}/${id}`,{recursive:true});
 w(`${O}/${id}/stdout.bin`,r.bytes);
 w(`${O}/${id}/exit.txt`,r.code+"\n");
}
