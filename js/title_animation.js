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

function title_animate() {
    animate_change(title1, 'visualize', () => {
        animate_change(title2, 'articulate', () => {
            animate_change(title2, 'art', () => {
                    animate_change(title1, 'vis');
            })

        });
    });
    setTimeout(title_animate,randint(2*60*1000,30*60*1000));

}


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(title_animate,randint(3000,30000));

});