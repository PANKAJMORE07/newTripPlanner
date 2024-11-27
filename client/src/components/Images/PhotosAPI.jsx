const getImageFromSearch = async (destination, place) => {
    try {
        const query = `${place}, ${destination}`;
        console.log('Searching for:', query);

        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${import.meta.env.VITE_GOOGLE_SEARCH_API_KEY}&cx=07a67d3c8cfba40be`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', data.error);
            return null;
        }

        if (data.items && data.items.length > 0) {
            return data.items[0].link;
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
};

// Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// New function to fetch images with rate limiting
const getImagesWithRateLimit = async (destination, items, batchSize = 1) => {
    const results = [];
    
    for (let i = 0; i < items.length; i++) {
        try {
            // Add a longer delay between requests (3 seconds)
            await delay(3000);
            
            const image = await getImageFromSearch(destination, items[i].name);
            results.push(image);
            
            console.log(`Fetched image ${i + 1} of ${items.length}`);
        } catch (error) {
            console.error(`Error fetching image ${i + 1}:`, error);
            results.push(null);
        }
    }
    
    return results;
};

// Specific function for fetching a single destination photo
const getDestinationPhoto = async (destination) => {
    try {
        // Create a more specific query for better destination photos
        const query = `${destination} city skyline tourist attraction`;
        console.log('Searching for destination photo:', query);

        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${import.meta.env.VITE_GOOGLE_SEARCH_API_KEY}&cx=07a67d3c8cfba40be&num=1`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            console.log('Found destination photo');
            return data.items[0].link;
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching destination photo:', error);
        return null;
    }
};

export { getImageFromSearch, getImagesWithRateLimit, getDestinationPhoto };
