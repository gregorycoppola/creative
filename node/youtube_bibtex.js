const axios = require('axios');

// Function to extract video ID and timestamp from YouTube URL
function extractVideoIDAndTimestamp(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const timestampRegExp = /t=(\d+)/;
    const match = url.match(regExp);
    const timestampMatch = url.match(timestampRegExp);

    return {
        videoID: (match && match[2].length === 11) ? match[2] : null,
        timestamp: timestampMatch ? timestampMatch[1] : null
    };
}

// Function to fetch video metadata using the YouTube Data API
async function fetchVideoMetadata(videoID, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&key=${apiKey}&part=snippet,contentDetails`;
    try {
        const response = await axios.get(url);
        return response.data.items[0]; // Assuming the first item is the video
    } catch (error) {
        console.error('Error fetching video metadata:', error);
        return null;
    }
}

// Function to create a BibTeX entry
function createBibTeXEntry(videoMetadata, timestamp) {
    const { title, channelTitle, publishedAt } = videoMetadata.snippet;
    const year = new Date(publishedAt).getFullYear();
    const accessedDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    let note = `Accessed: ${accessedDate}`;
    if (timestamp) {
        note += `, Timestamp: ${timestamp} seconds`;
    }

    const bibEntry = `@misc{youtube_${videoMetadata.id},
  title = {${title}},
  author = {${channelTitle}},
  year = {${year}},
  howpublished = {YouTube video},
  url = {https://youtu.be/${videoMetadata.id}},
  note = {${note}}
}`;
    return bibEntry;
}

// Main function
async function main() {
    const youtubeURL = process.argv[2]; // Get YouTube URL from command line argument
    const apiKey = 'AIzaSyBQA5EgeZac_NmFTPRw6ZDDc97PJrjQnwU'; // Replace with your API key

    const { videoID, timestamp } = extractVideoIDAndTimestamp(youtubeURL);
    if (!videoID) {
        console.log('Invalid YouTube URL');
        return;
    }

    const videoMetadata = await fetchVideoMetadata(videoID, apiKey);
    if (!videoMetadata) {
        console.log('Failed to fetch video metadata');
        return;
    }

    const bibTeXEntry = createBibTeXEntry(videoMetadata, timestamp);
    console.log(bibTeXEntry);
}

main();
