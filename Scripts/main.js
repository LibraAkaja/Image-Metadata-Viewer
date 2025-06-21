import { addText, changeCSS, createDElement } from "./dynamic.js";

const startBtn = document.querySelector("#start");

// startBtn.addEventListener("onmouseover",()=>{
    
// },{once:true});

startBtn.addEventListener("click",()=>{
    changeCSS(".root","display","none");
    changeCSS(".child","z-index","1");
    changeCSS(".child","visibility","visible");
},{once:true});

document.querySelector(".uploadBtn").addEventListener("click", function(){
    document.querySelector("#uploadImg").click();
});

document.querySelector("#uploadImg").addEventListener("change", function(event){
    const file = event.target.files[0];
    if(file){
        console.log("Image file selected!: ",file.name);
        const reader = new FileReader();
        reader.onload = function(e){
            document.querySelector("#imgPrev2").src = e.target.result;
            changeCSS("#imgPrev2","display","block");
            setTimeout(()=>{
                changeCSS("#useImg","visibility","visible");
            },1000);
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector("#useImg").addEventListener("click",()=>{
    changeCSS(".uploadBtn","display","none");
    changeCSS("#useImg","display","none");

    changeCSS(".metaData","visibility","visible");
},{once:true});

/* Main program */

document.querySelector("#uploadImg").addEventListener("change", async function(){
    const file = this.files[0];
    if(!file) return;
    const arrayBuffer = await file.arrayBuffer();
    try{
        const tags = ExifReader.load(arrayBuffer, {expanded: true});
        displayGroupedMetadata(tags);
    }
    catch(err){
        addText(".metaData","Failed to read metadata: "+err.message);
    }
});

function cleanValue(raw) {
  if (typeof raw === 'string') {
    const cleaned = raw.replace(/\u0000/g, '').trim();
    return cleaned === '' ? 'None' : cleaned;
  }
  if (Array.isArray(raw)) {
    return raw.map(cleanValue).join(', ');
  }
  if (typeof raw === 'object' && raw !== null) {
    return cleanValue(raw.description || raw.value || '');
  }
  return String(raw);
}

function convertGPSToDecimal(gpsData, ref){
    if(!Array.isArray(gpsData) || gpsData.length !== 3) return null;
    const [deg, min, sec] = gpsData.map(Number);
    let decimal = deg + min/60 + sec/3600;
    if(ref === 'S' || ref === 'W') decimal = -decimal;
    return decimal;
}

function displayGroupedMetadata(tags){
    let html = "<div class='metadata-table'>";
    for(const section in tags){
        html += `<h3>${section.toUpperCase()} Metadata</h3>`;
        html += "<table border='1' cellpadding='5' cellspacing='0'>";
        html += "<tr><th>Tag</th><th>Description</th></tr>";
    
        for(const tag in tags[section]) {
            const raw = tags[section][tag];
            const value = cleanValue(raw);
            html += `<tr><td>${tag}</td><td>${value}</td></tr>`;
        }
        html += "</table><br>";
    }
    
    const gps = tags?.exif;
    if(gps?.GPSLatitude && gps?.GPSLongitude){
        const lat = convertGPSToDecimal(gps.GPSLatitude.value || gps.GPSLatitude, gps.GPSLatitudeRef?.description || 'N');
        const lon = convertGPSToDecimal(gps.GPSLongitude.value || gps.GPSLongitude, gps.GPSLongitudeRef?.description || 'E');
        if(!isNaN(lat) && !isNaN(lon)){
            html += `
            <h3>📍 GPS Location</h3>
            <p>Latitude: ${lat.toFixed(6)}, Longitude: ${lon.toFixed(6)}</p>
            <p><a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">View on Google Maps</a></p>
            `;
        }
    }
    html += "</div>";
    document.querySelector(".metaData").innerHTML = html;
}