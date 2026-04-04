const API_URL = "https://script.google.com/macros/s/AKfycbxCmQoImm_VobivkedNiwhRnidUE-ydAGWcim8xs7yDE1GC-Wb_djYNjByXbVzPfHw3sg/exec";

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const generateAIAnalysis = async () => {
  try {
    // Calling the proxied endpoint to avoid CORS issues
    // Added redirect: 'follow' and mode: 'cors' for GAS compatibility
    const response = await fetch(`${API_URL}?action=analysis`, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow'
    });
    
    console.log("AI Analysis Raw Response:", response);
    
    if (!response.ok) throw new Error(`AI Fetch failed via proxy (Status: ${response.status})`);
    
    const data = await response.json();
    console.log("AI Analysis JSON Data:", data);
    
    // Extract the analysis string and split into bullet points
    let points = [];
    if (data && typeof data.analysis === 'string') {
      points = data.analysis.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'))
        .map(line => line.replace(/\*\*/g, ''))
        .slice(0, 4);
    } else if (Array.isArray(data)) {
      points = data.slice(0, 4);
    }

    return points.length > 0 ? points : ["No intelligence report available at this time."];
  } catch (error) {
    console.error("AI Analysis Error (via proxy):", error);
    return ["Failed to generate intelligence report through the proxy."];
  }
};
