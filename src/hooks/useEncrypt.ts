import { RootState } from "@redux";
import CryptoJS from "react-native-crypto-js";
import { useSelector } from "react-redux";
import {AES_KEY} from '@env'

// Encrypt
export const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(data, AES_KEY).toString();
}
// Decrypt
export const decryptData = (cipher: any) => {
    let bytes  = CryptoJS.AES.decrypt(cipher, AES_KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
