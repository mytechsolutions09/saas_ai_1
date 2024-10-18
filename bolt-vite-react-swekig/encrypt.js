import crypto from 'crypto';
import fs from 'fs';

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // This should be stored securely, not in the code
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

// Read the .env file
const envContent = fs.readFileSync('.env', 'utf8');

// Encrypt the content
const encrypted = encrypt(envContent);

// Write the encrypted content to a new file
fs.writeFileSync('.env.encrypted', JSON.stringify(encrypted));

console.log('Encrypted .env file created: .env.encrypted');

// To decrypt (for testing purposes)
const decrypted = decrypt(encrypted);
console.log('Decrypted content:', decrypted);