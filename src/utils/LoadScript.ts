export const loadScript = (url: string, callback: () => void) => {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (existingScript) {
    if (window.google && window.google.maps) {
      console.log("Google 지도가 이미 로드되었습니다.");
      callback();
    } else {
      console.log("기존 스크립트가 존재하지만, Google 지도가 로드되지 않았습니다.");
      existingScript.addEventListener("load", callback);
    }
  } else {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = callback;
    script.onerror = () => {
      console.error("Error loading Google Maps script.");
    };
    document.head.appendChild(script);
  }
};
