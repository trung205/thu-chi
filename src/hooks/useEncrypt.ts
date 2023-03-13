import CryptoJS from "react-native-crypto-js";
 
let aesKey = 'abcdef123456abcd' 
// Encrypt
export const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(data, aesKey).toString();
}
// Decrypt
export const decryptData = (cipher: any) => {
    let bytes  = CryptoJS.AES.decrypt(cipher, aesKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}