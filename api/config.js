// Vercel Serverless Function to expose configuration
export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json({
    KAKAO_JS_KEY: process.env.KAKAO_JS_KEY || ""
  });
}
