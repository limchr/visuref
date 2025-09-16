function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    await banner_animate([0,1,2,3], [50,50,50,50]);

    await animate_change(title1, 'visualize', 20, 50);
    await animate_change(title2, 'articulate', 20, 50);
    await animate_change(title2, 'art', 20, 50);
    await animate_change(title1, 'vis', 20, 50);
    
    await banner_animate([3,2,1,0], [200,50,50,50]);
    setTimeout(title_animate,randint(2*60*1000,30*60*1000));

}

async function banner_animate(frames, sleep_times) {
    for(let i=0;i<frames.length;i++) {
        changeBannerImage(bannerImages[frames[i]]);
        await sleep(sleep_times[i]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(title_animate,randint(0,100));

});