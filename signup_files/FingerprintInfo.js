/**
 * -------------------- -------------------- -------------------- --------------------
 *        USAGE
 * -------------------- -------------------- -------------------- --------------------
 * 1. laodScript()
 *      Initializes the Fingerprintjs2 Library
 * 
 * 2. generateFingerprint(param)
 *      param : components object
 *      Generates the fingerprint from the param obj and sets the values in the hidden field
 * 
 * 3. getFingerprintDetails()
 *      calls the generateFingerprint function to get the details
 * 
 *  -------------------- -------------------- -------------------- --------------------
 *  NOTE : obj{}               => Object of parameters to store
 *         objForFingerprint{} => Object of parameters for Fingerprint generation 
 *  -------------------- -------------------- -------------------- -------------------- 
 */
function getFingerprintDetails(call){
    
    const promise=new Promise(function (resolve,reject){

    if (window.requestIdleCallback) {
        requestIdleCallback(function () {
            Fingerprint2.get(function (components) {
                resolve(generateFingerprint(components));
            })
        })
    } else {
        setTimeout(function () {
            Fingerprint2.get(function (components) {
                console.log("Timeout");
                resolve(generateFingerprint(components));
            })
        }, 500)
    }
    });
return promise;

}

function generateFingerprint(components){

        let obj = {
            Code : "",
            Resolution: "",
            AvailableResolutions: "",
            ColorDepth: "", 
            Device : "", //get from userAgent
            CPU : "",
            Memory : "", 
            OS : "",
            Language : "",
            TimeZone : "",
            TimeZoneOffset : "",
            Browser:"", //getFromUserAgent
            Fonts: [],
            Plugins: [],
            //Others: []
        }

        let objForFingerprint = {}
        
        var details = [];
        
        var componentsObj = {};
        for (let i = 0; i < components.length; i++) {
            componentsObj[components[i].key] = components[i].value;
        }
    
        for(var i=0;i<components.length;i++){
    
            if(typeof components[i].value == 'undefined'){
                components[i].value = "not available";
            }
            switch(components[i].key){
                case 'screenResolution': obj.Resolution = components[i].value.toString();
                    break;
    
                case 'availableScreenResolution': obj.AvailableResolutions = components[i].value.toString();
                    break;
    
                case 'colorDepth': obj.ColorDepth = Number(components[i].value.toString());
                    break;
    
                case 'cpuClass': obj.CPU = components[i].value.toString();
                    break;
    
                case 'deviceMemory': obj.Memory = Number(components[i].value.toString());
                    break;
    
                case 'language': obj.Language = components[i].value.toString();
                    break;
    
                case 'timezone': obj.TimeZone = components[i].value.toString();
                    break;
    
                case 'timezoneOffset': obj.TimeZoneOffset = components[i].value.toString();
                    break;
    
                case 'fonts':
                    var fonts = components[i].value.toString().split(',');
                    for(var font in fonts){
                        obj.Fonts.push(fonts[font]);
                    }
                    break;
    
                case 'plugins':
                    var plugins = components[i].value.toString().split(',');
                    for(var plugin in plugins){
                        obj.Plugins.push(plugins[plugin]);
                    }
                    break;
    
                default:
                   // obj.Others.push({ key: components[i].key.toString(), value: components[i].value.toString() })
                    break;
            }
        }
    
        //Copy obj to objForFingerprint
        objForFingerprint = JSON.parse(JSON.stringify(obj));

        //Get the OS from the UserAgent
        obj.OS = getUserOS();
      /*   obj.Device = getUserDevice();
        obj.Browser = getUserBrowser(); */
    
        var values = components.map(function (component) { return component.value })
        obj.Code = Fingerprint2.x64hash128(values.join(''), 31)
    
        details.push(obj.Code) //HASH CODE : User Fingerprint
        details.push(JSON.stringify(componentsObj))                // ALL Fingerprint Components
        details.push(JSON.stringify(obj))                          // Filtered Fingerprint Components
    

        return details
}

function getUserOS(){
    var os = "unknown";
    var nUserAgent = navigator.userAgent;

    var clientStrings = [
        {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
        {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
        {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
        {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
        {s:'Windows Vista', r:/Windows NT 6.0/},
        {s:'Windows Server 2003', r:/Windows NT 5.2/},
        {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
        {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
        {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
        {s:'Windows 98', r:/(Windows 98|Win98)/},
        {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
        {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
        {s:'Windows CE', r:/Windows CE/},
        {s:'Windows 3.11', r:/Win16/},
        {s:'Android', r:/Android/},
        {s:'Open BSD', r:/OpenBSD/},
        {s:'Sun OS', r:/SunOS/},
        {s:'Linux', r:/(Linux|X11)/},
        {s:'iOS', r:/(iPhone|iPad|iPod)/},
        {s:'Mac OS X', r:/Mac OS X/},
        {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
        {s:'QNX', r:/QNX/},
        {s:'UNIX', r:/UNIX/},
        {s:'BeOS', r:/BeOS/},
        {s:'OS/2', r:/OS\/2/},
        {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];

    for(id in clientStrings){
        var clientString = clientStrings[id]
        if(clientString.r.test(nUserAgent)){
            os = clientString.s
            break;
        }
    }

    return os
}

