// import {ASN1} from "../libs/asn1/asn1";
// import {Base64} from "../libs/asn1/Base64";
// import {Hex} from "../libs/asn1/Hex";

// import {RSAKey} from "../libs/jsbn/rsa";
// import {BitInteger} from "../libs/jsbn/jsbn";

namespace crylib
{
    const s_rt:string = "10110111101101011011011110101101";

    export class crypto
    {
		protected constructor() {
        }

        private static s_instance:crypto = null;
        public static getInstance() : crypto {
            if(this.s_instance == null)
            {
                this.s_instance = new crypto();
            }
            return this.s_instance;
        }

        private m_rsa:any;

        public init(pem?:string)
        {
            this.m_rsa = new RSAKey();
            if(pem != null) this.parseKey(pem);
        }

        protected parseKey(pem:string)
        {
            try {
                let modulus:string | number = 0;
                let public_exponent:string | number = 0;
                const reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
                const der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
                let asn1 = ASN1.decode(der);

                // Fixes a bug with OpenSSL 1.0+ private keys
                if (asn1.sub.length === 3) {
                    asn1 = asn1.sub[2].sub[0];
                }
                if (asn1.sub.length === 2) {

                    // Parse the public key.
                    const bit_string = asn1.sub[1];
                    const sequence = bit_string.sub[0];

                    modulus = sequence.sub[0].getHexStringValue();
                    let public_exponent = sequence.sub[1].getHexStringValue();

                    this.m_rsa.setPublic(modulus, public_exponent);
                } else {
                    return false;
                }
                return true;
            } catch (ex) {
                return false;
            }
        }

        public rsaEncrypt(m:ArrayBuffer, begin:number, length:number)
        {
            let leftLength:number = length;
            let trunk_size = this.m_rsa.byteLength() - 11;
            let c:any[] = [];
            while(leftLength > 0)
            {
                let mlen: number = leftLength > trunk_size ? trunk_size : leftLength;
                let mbuf:Uint8Array = new Uint8Array(m, begin + length - leftLength, mlen);
                let cbuf:any[] = this.m_rsa.encrypt(mbuf);
                if(cbuf != null)
                {
                    for(var i = 0; i < cbuf.length; ++i) c[c.length] = cbuf[i];
                }
                
                leftLength -= mlen;
            }
            return c;
        }

        public rsaDecrypt(c:ArrayBuffer, begin:number, length:number)
        {
            let leftLength:number = length;
            let trunk_size = this.m_rsa.byteLength();
            let m:any[] = [];
            while(leftLength > 0)
            {
                let clen:number = leftLength > trunk_size ? trunk_size : leftLength;
                let cbuf:Int8Array = new Int8Array(c, begin + length - leftLength, clen);
                let mbuf:any[] = this.m_rsa.decrypt(cbuf);
                if(mbuf != null)
                {
                    for(var i = 0; i < mbuf.length; ++i) m[m.length] = mbuf[i];
                }

                leftLength -= clen;
            }
            return m;
        }
    }

}