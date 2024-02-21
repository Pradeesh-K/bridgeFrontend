// VideoPlayer.js

import React from 'react';

const VideoPlayer = () => {
    return (
        <div>
            <video width="320" height="240" controls>
                <source src="your_video.mp4" type="video/mp4" />
                <source src="your_video.ogg" type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
