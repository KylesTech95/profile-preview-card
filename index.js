const drive = (data) => {
    //renaming the input
    var name_data = data[0].people
    //Global variables within drive() function
    var fname = document.querySelector('.firstname');
    var body = document.querySelector('body')
    var lname = document.querySelector('.lastname');
    var address = document.querySelector('.address');
    var img = document.querySelector('figure>div>img')
    var pic_bg = document.querySelector('.img-div')
    const add_picture = () => {img.setAttribute('src', `${name_data.photo}`)}
    var mouse = { x: undefined, y: undefined };
    var mouse_display = document.querySelector('.mouse-dis');
    var stat = document.querySelector('i');
    
    //add data to the card
    add_picture()
    lname.innerHTML = name_data.last.slice(0, 1) + '.'
    fname.innerHTML = name_data.first
    address.innerHTML = `${name_data.address} ${name_data.city} ${name_data.state} ${name_data.zip}`

    //We are testing the mouse position in relation to the body. 
    //We want the mouse to stay within the profile picture.
    document.addEventListener('mousemove', (e) => {
        mouse = { x: e.pageX, y: e.pageY }
        let bg_W = pic_bg.getBoundingClientRect().width, bg_H = pic_bg.getBoundingClientRect().height,
            bg_X = pic_bg.getBoundingClientRect().x, bg_Y = pic_bg.getBoundingClientRect().y;
        let isLess_x = (mouse, bg_width, bg_x) => mouse <= (bg_x + bg_width)+15, isMore_x = (mouse, bg_x) => (mouse >= (bg_x+15)),
            isLess_y = (mouse, bg_height, bg_y) => mouse <= (bg_y + bg_height)+15, isMore_y = (mouse, bg_y) => (mouse >= (bg_y-15));
        var pic_test = () => {
            let mouse_x = () => {
                if(mouse.x > (bg_X + bg_W) / 2){
                    let pos = (mouse.x/mouse.x)
                     return pos -= 3
                }
                else{
                    let pos = mouse.x/mouse.x
                      return pos += 3
                }
            }
            let mouse_y = () => {
                if(mouse.y > (bg_Y + bg_H) / 2){
                    let pos = mouse.y/mouse.y
                     return (pos -= 5)
                }
                else{
                    let pos2 = mouse.y/mouse.y
                    return pos2 += 5
                }
            }
            //Object - key(name_data.online) : value(color of status)
            const color_stat={
                true:'lime', //online
                false:'red', //offline
                null:'grey'  //idle
            }      
        if ((isLess_y(mouse.y, bg_H, bg_Y) && isMore_y(mouse.y, bg_Y)) && (isLess_x(mouse.x, bg_W, bg_X) && isMore_x(mouse.x, bg_X))) {
            stat.style = `color: ${color_stat[name_data.online]}; transition: .3s ease;`
            img.style = 'transition: .2s ease;box-shadow: 0 0 6px .15px ghostwhite;'
            mouse_display.style = "background:lime;opacity:.8;transition:.3s ease;"
            pic_bg.style = `transition: .3s ease;transform: rotate(${(mouse_x()+mouse_y())}deg) scale(.9875);cursor:pointer;width:170px;box-shadow: none`;
        }
        else {
            stat.style = `color: ${color_stat['null']}; transition: .2s ease;`
            pic_bg.style = `transition: .2s ease;transform: none; background: rgb(184, 174, 174); width: 160px;)`
            mouse_display.style = "background: red;opacity:.8;transition:.2s ease;"
            img.style = 'transition: .2s ease;box-shadow: 0 0 6px .2px ghostwhite;box-shadow: 0 0 10px .05px #333;'

        }

        }
        pic_test()
    })
    //mousemove tooltip (My truth teller)
    //Green = true
    //Red = false
    document.addEventListener('mousemove', (e) => {
        mouse = { x: e.pageX, y: e.pageY }
        mouse_display.childNodes[0].innerHTML = 'x: ' + mouse.x + ": y: " + mouse.y
    })
}

//________________________________________________________________________
const upload_JSON = () => {
    //upload data
    var xml = new XMLHttpRequest();
    xml.open('GET', 'names.json', true)
    xml.onload = (data) => {
        drive(JSON.parse(data.target.response))
    }
    xml.send()
}
upload_JSON()
