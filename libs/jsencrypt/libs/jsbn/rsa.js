// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  return int2char((b >> 4)&0xf) + int2char(b&0xf);
  // if(b < 0x10)
  //   return "0" + b.toString(16);
  // else
  //   return b.toString(16);
}

function toHexString(b) {
  var ret = "";
  var i = 0;
  while(i < b.length)
  {
    ret += byte2Hex(b[i]);
    i++;
  }
  return ret;
}

//! s is a array, type 2
function pkcs1pack2(s,n) {
  if(n < s.length + 11) {
    alert("Message too long for RSA");
    return null;
  }

  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    ba[--n] = s[i--];
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

//! s is a array type 1
function pkcs1unpack1(d, n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 1)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = new Array();
  while(++i < b.length) {
    var c = b[i] & 255;
    ret[ret.length] = c;
  }
  return ret;
}


// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    alert("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d,n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 2)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = "";
  while(++i < b.length) {
    var c = b[i] & 255;
    if(c < 128) { // utf-8 decode
      ret += String.fromCharCode(c);
    }
    else if((c > 191) && (c < 224)) {
      ret += String.fromCharCode(((c & 31) << 6) | (b[i+1] & 63));
      ++i;
    }
    else {
      ret += String.fromCharCode(((c & 15) << 12) | ((b[i+1] & 63) << 6) | (b[i+2] & 63));
      i += 2;
    }
  }
  return ret;
}


// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
// function RSAEncrypt(text) {
//   var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
//   if(m == null) return null;
//   var c = this.doPublic(m);
//   if(c == null) return null;
//   var h = c.toString(16);
//   if((h.length & 1) == 0) return h; else return "0" + h;
// }

//! buff is a Array, must be int8array or uint8array
// for rsa 1024, buff length less then 117
function RSAEncrypt(buff) {
  var m = pkcs1pack2(buff,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var b = c.toByteArray();
  return b;
}

//! descript cipher buff encript by private key.
// return an array() object
function RSADecrypt(buff) {
  var c = parseBigInt(toHexString(buff), 16);
  var m = this.doPublic(c);
  if(m == null) return null;
  return pkcs1unpack1(m, (this.n.bitLength()+7)>>3);
}

function RSAByteLength() {
  return (this.n.bitLength() + 7) >> 3;
}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.byteLength = RSAByteLength;
