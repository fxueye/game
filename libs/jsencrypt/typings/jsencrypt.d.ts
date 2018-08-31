
declare namespace crylib {
    class crypto {
        protected constructor();

        private static s_instance:crypto;
        public static getInstance() : crypto;

        private m_rsa:any;
        protected parseKey(pem:string);
        public init(pem?:string);
        public rsaEncrypt(m:ArrayBuffer, begin:number, length:number);
        public rsaDecrypt(c:ArrayBuffer, begin:number, length:number);
    }
}
