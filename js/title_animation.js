function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animate_change(elem, new_content, callback) {
    
    let current_content = elem.innerHTML;
    console.log(current_content);
    if(current_content == new_content) {
        if (callback) callback();  // ✅ done, trigger next
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
    let rand_timeout = randint(100,200);

    return setTimeout(animate_change, rand_timeout, elem, new_content, callback);
}

let title1 = document.getElementById('header_title_1');
let title2 = document.getElementById('header_title_2');
let bannerImg = document.querySelector('.header-logo');

// Array of banner images to cycle through
const bannerImages = [
    'banner_1.png', 
    'banner_2.png',
    'banner_3.png',
    'banner_4.png'
];

let currentBannerIndex = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to change banner image with fade effect
function changeBannerImage(newImageSrc, callback) {
    if (!bannerImg) return;
    
    // Create a new image element to preload the image
    const newImg = new Image();
    
    newImg.onload = () => {

        setTimeout(() => {
            // Change the source
            bannerImg.src = newImageSrc;
            bannerImg.alt = 'VisArt Logo';
            
            // Call callback after fade in completes
            setTimeout(() => {
                if (callback) callback();
            }, 500);
        }, 500);
    };
    
    newImg.onerror = () => {
        console.warn(`Failed to load banner image: ${newImageSrc}`);
        if (callback) callback();
    };
    
    // Start loading the new image
    newImg.src = newImageSrc;
}

// Function to cycle through banner images
function cycleBannerImages() {
    currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
    const nextBanner = bannerImages[currentBannerIndex];
    
    changeBannerImage(nextBanner, () => {
        // Schedule next banner change
        setTimeout(cycleBannerImages, randint(100, 200)); // 5-15 minutes
    });
}

async function title_animate() {
    await banner_animate([0,1,2,3]);
    await animate_change(title1, 'visualize', () => {
        animate_change(title2, 'articulate', () => {
            animate_change(title2, 'art', () => {
                    animate_change(title1, 'vis');
            })

        });
    });
    banner_animate([3,2,1,0]);
    setTimeout(title_animate,randint(2*60*1000,30*60*1000));

}

async function banner_animate(frames) {
    for(let i=0;i<frames.length;i++) {
        changeBannerImage(bannerImages[frames[i]]);
        await sleep(50);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(title_animate,randint(0,100));

});