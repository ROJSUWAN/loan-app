// (ทางเลือก) Cloudflare Worker proxy — ใช้เมื่อเรียก Typhoon จากเบราว์เซอร์ตรงๆ ติด CORS
// 1) dash.cloudflare.com → Workers → Create → วางโค้ดนี้ 2) Settings → Variables เพิ่ม TYPHOON_KEY
// 3) เอา URL ของ worker (เช่น https://fin-tum.xxx.workers.dev) ไปใส่ช่อง Endpoint ในแอป (ช่อง API key ในแอปใส่อะไรก็ได้)
export default {
  async fetch(req, env) {
    const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'POST, OPTIONS'};
    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    const r = await fetch('https://api.opentyphoon.ai/v1/chat/completions', {method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+env.TYPHOON_KEY}, body: await req.text()});
    return new Response(r.body, {status: r.status, headers: {...cors, 'Content-Type': r.headers.get('Content-Type') || 'application/json'}});
  }
}
