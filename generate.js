const crypto = require("crypto");

const generateSecretKey = () => {
  // Menentukan panjang secret key dalam byte (contoh: 32 byte)
  const keyLengthInBytes = 32;

  // Menghasilkan secret key secara acak menggunakan kriptografi Node.js
  const secretKey = crypto.randomBytes(keyLengthInBytes).toString("hex");

  return secretKey;
};

// Menghasilkan secret key dan mencetaknya
const secretKey = generateSecretKey();
console.log("Generated Secret Key:", secretKey);
