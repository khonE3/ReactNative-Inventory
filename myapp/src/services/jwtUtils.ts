// Simple JWT implementation for mock authentication using React Native compatible crypto
// This creates tokens that the backend will accept

import * as CryptoJS from 'crypto-js';

const JWT_SECRET = 'your_jwt_secret'; // Same as backend

// Base64 URL encode function
function base64UrlEncode(obj: any): string {
  const jsonStr = JSON.stringify(obj);
  const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(jsonStr));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// HMAC-SHA256 signing using CryptoJS
function simpleSign(data: string, secret: string): string {
  const signature = CryptoJS.HmacSHA256(data, secret);
  const base64 = CryptoJS.enc.Base64.stringify(signature);
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
    const signature = simpleSign(dataToSign, JWT_SECRET);
    
    return `${dataToSign}.${signature}`;
  }
};
