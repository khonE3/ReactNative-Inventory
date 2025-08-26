// Simple JWT implementation for mock authentication
// This creates tokens that the backend will accept

const JWT_SECRET = 'your_jwt_secret'; // Same as backend

// Base64 URL encode function
function base64UrlEncode(obj: any): string {
  const jsonStr = JSON.stringify(obj);
  const base64 = btoa(jsonStr);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Simple HMAC-SHA256 simulation (not cryptographically secure, but works for demo)
async function simpleSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const dataToSign = encoder.encode(data);
  
  // Import key for HMAC
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  // Sign the data
  const signature = await crypto.subtle.sign('HMAC', key, dataToSign);
  
  // Convert to base64url
  const uint8Array = new Uint8Array(signature);
  const bytes = Array.from(uint8Array);
  const base64 = btoa(String.fromCharCode.apply(null, bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const jwtUtils = {
  async createToken(payload: any): Promise<string> {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    
    const now = Math.floor(Date.now() / 1000);
    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + (24 * 60 * 60) // 24 hours
    };
    
    const headerEncoded = base64UrlEncode(header);
    const payloadEncoded = base64UrlEncode(tokenPayload);
    
    const dataToSign = `${headerEncoded}.${payloadEncoded}`;
    const signature = await simpleSign(dataToSign, JWT_SECRET);
    
    return `${dataToSign}.${signature}`;
  }
};
