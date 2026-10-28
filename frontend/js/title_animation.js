function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
    let rnd = randint(0,arr.length-1);
    return arr[rnd];
}

async function animate_change(elem, new_content, wait_min, wait_max) {
    let current_content = elem.innerHTML;
    while(true) {
        if(current_content == new_content) {
            return;
        }

        for(let i=0;i<new_content.length;++i) {
            if(current_content.length > i) {
                if(current_content[i] != new_content[i]) {
                    current_content[i] = new_content[i];
                    break;
                }
            } else {
                current_content = current_content + new_content[i];
                break;
            }
        }
        if(current_content.length > new_content.length) {
            current_content = current_content.substr(0,current_content.length-1); 
        }

        elem.innerHTML = current_content;
        let rand_timeout = randint(wait_min,wait_max);
        await sleep(rand_timeout);
    }
}



// Helper function to parse RGB color string to array [r, g, b]
function parseColor(colorStr) {
    // Handle rgb() format
    if (colorStr.startsWith('rgb(')) {
        const values = colorStr.slice(4, -1).split(',').map(v => parseInt(v.trim()));
        return values;
    }
    // Handle computed style that might return other formats
    const style = document.createElement('div');
    style.style.color = colorStr;
    document.body.appendChild(style);
    const computed = window.getComputedStyle(style).color;
    document.body.removeChild(style);
    
    if (computed.startsWith('rgb(')) {
        const values = computed.slice(4, -1).split(',').map(v => parseInt(v.trim()));
        return values;
    }
    
    // Default fallback
    return [0, 0, 0];
}

// Function to animate color change for any element
async function animate_color_fade(elementId, targetColor, animationTime) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get current color
    const currentColorStr = window.getComputedStyle(element).color;
    const currentColor = parseColor(currentColorStr);
    const target = parseColor(targetColor);
    
    const steps = 50; // Number of animation steps
    const stepTime = animationTime / steps;
    
    for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        
        // Interpolate between current and target color
        const r = Math.round(currentColor[0] + (target[0] - currentColor[0]) * progress);
        const g = Math.round(currentColor[1] + (target[1] - currentColor[1]) * progress);
        const b = Math.round(currentColor[2] + (target[2] - currentColor[2]) * progress);
        
        element.style.color = `rgb(${r}, ${g}, ${b})`;
        await sleep(stepTime);
    }
}






let title1 = document.getElementById('header_title_1');
let title2 = document.getElementById('header_title_2');
let bannerImg = document.querySelector('.header-logo');

// Array of banner images to cycle through
const bannerImages = [
    'small_banner_1.png', 
    'small_banner_2.png',
    'small_banner_3.png',
    'small_banner_4.png'
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to change banner image with fade effect
function changeBannerImage(newImageSrc) {
    if (!bannerImg) return;
    const newImg = new Image();
    newImg.onload = () => {
        bannerImg.src = newImageSrc;
        bannerImg.alt = 'VisArt Logo';
    };
    newImg.src = newImageSrc;
}


async function title_animate() {
    await banner_animate([0,1,2,3], [50,50,500,50]);

    let w1 = choice(['visualize','visual','visible']);
    let w2 = choice(['articulation','artwork','artistry']);

    let min_time = 100;
    let max_time = 200;

    await animate_change(title1, w1, min_time, max_time);
    await animate_change(title2, w2, min_time, max_time);
    await animate_change(title2, 'art', min_time, max_time);
    await animate_change(title1, 'vis', min_time, max_time);
    
    await banner_animate([3,2,1,0], [200,50,50,50]);

}

async function banner_animate(frames, sleep_times) {
    for(let i=0;i<frames.length;i++) {
        changeBannerImage(bannerImages[frames[i]]);
        await sleep(sleep_times[i]);
    }
}

async function rand_anim() {
    await sleep(randint(5000,30000));
    while(true) {
        let anim = choice(['text', 'color']);
        if(anim == 'text') {
            await title_animate();
        } else if(anim == 'color') {
            await title_color_animate();
        }
        await sleep(randint(2*60*1000,30*60*1000));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    rand_anim();
});




async function title_color_animate() {
    const title1Element1 = document.getElementById('header_title_1');
    const title1Element2 = document.getElementById('header_title_2');
    const title1Element3 = document.getElementById('header_title_3');
    // Get the original color (from CSS: rgb(100, 0, 0))
    const originalColorStr1 = window.getComputedStyle(title1Element1).color;
    const originalColorStr2 = window.getComputedStyle(title1Element2).color;
    const originalColorStr3 = window.getComputedStyle(title1Element3).color;
    
    await Promise.all([
    animate_color_fade('header_title_1', 'rgb(44, 44, 44)', 10000),
    animate_color_fade('header_title_2', 'rgb(44, 44, 44)', 10000),
    animate_color_fade('header_title_3', 'rgb(44, 44, 44)', 10000)
    ]);
    await banner_animate([0,1,2,3], [50,50,500,50]);

    await Promise.all([
    animate_color_fade('header_title_1', originalColorStr1, 500),
    animate_color_fade('header_title_2', originalColorStr2, 500),
    animate_color_fade('header_title_3', originalColorStr3, 500)
    ]);
    
    await banner_animate([3,2,1,0], [200,50,50,50]);

}
