// func for visi

const h5 = document.getElementById("visi").getElementsByTagName("h5")[0];
const scr1 = document.getElementById("visi").getElementsByTagName("img")[0];
const scroll = document.body.getBoundingClientRect().y * -1;
let x = 0;
const minmax = (vir, min, max) => {
    if (vir < min) {
        return min
    }
    if (vir > max) {
        return max
    }
    return vir
}

// func for tri

const poly = document.getElementById("tri").getElementsByTagName('polygon')[0]
const tri = document.getElementById("tri")
const fitur = document.getElementById("fitur")
let ind = 1

const fitContent = {
    title: ['Productivity <br />Management', 'Second <br />Brain', 'Digital <br />Environment'],
    content: ['Track and manage various aspects of your life',
        'Organize your ideas and assist you sticking it into your brain',
        'Set your digital environment based on your certain needs'],
    color: ['a9d18e', "73aded", '9e84f0'],
}

const tris = () => {
    let h3 = fitur.querySelector("h3");
    let p = fitur.querySelector("p");
    let n = fitContent.title.length;
    const i = ind % n;
    h3.style.opacity = "0"; p.style.opacity = "0";
    fitur.style.backgroundColor = "#" + fitContent.color[i] + '22';
    poly.style.fill = "#" + fitContent.color[i];
    tri.style.transform = "rotate(" + ind * -120 + "deg)";
    setTimeout(() => {
        h3.style.opacity = "0.97"; p.style.opacity = "0.97";
    fitur.getElementsByTagName("h3")[0].innerHTML = fitContent.title[i];
    fitur.getElementsByTagName("p")[0].innerHTML = fitContent.content[i];
    h3.style.color = "#" + fitContent.color[i]; p.style.color = "#" + fitContent.color[i];
    }, 250)
    ind++
}

poly.addEventListener("click", tris)

// func for build

const span = document.querySelector("span");
const build = () => {
    let scroll2 = span.getBoundingClientRect().y;
    const perc = (0.7*window.innerHeight - scroll2)/(0.8*window.innerHeight);
    let imgs = span.querySelectorAll("img");
    imgs[0].style.opacity = 1;
    let w = imgs[0].offsetHeight;
    let col = 4;
    for (let i = 1; i < imgs.length; i++) {
        const g = (i <= col-1 ? i : col-1 + Math.trunc(i / col));
        let perc2 = 0
        if (i < col){
            imgs[i].style.transform = 'translate(-30%, 0)'
            perc2 = perc - (0.33*0.5*g*w/(0.8*window.innerHeight))
        }
        if (i >= col){
            imgs[i].style.transform = 'translate(0, -30%)'
            perc2 = perc - (0.5*g*w/(0.8*window.innerHeight))
        }
        if (perc2 > 0)
        {imgs[i].style.opacity = 1;
        imgs[i].style.transform = 'translate(0%, 0%)'} 
        else {
        imgs[i].style.opacity = 0;
        if (i < col){
            imgs[i].style.transform = 'translate(-30%, 0)'
        }
        if (i >= col){
            imgs[i].style.transform = 'translate(0, -30%)'
        } }
    } 
}
window.addEventListener("scroll", build)

//func for the next transition using scroll
const scrPerc = (h, comp, v) => {
    let min = (h*window.innerHeight - comp)/(v*window.innerHeight)
    return min
}

//func for tracks

let graph = document.getElementById("graph");
let bar = graph.querySelectorAll("div");
const track = () => {
    const bot = graph.getBoundingClientRect().bottom;
    const origin = 0
    const h = [50, 60, 100, 90, 80, 70, 90];
    const perc = scrPerc(1, bot, 0.3);
    for (let i = 0; i < bar.length; i++) {
        let val = Math.max(origin, minmax(perc, 0, 1)*h[i])
        bar[i].style.height = val + "%";
    }
}
window.addEventListener("scroll", track)

// func for slight up
let kece = document.getElementById('kece')
let allkece = document.getElementById('kece').children
const trans = () => {for (let i = 0; i < allkece.length; i++) {
    let post3 = kece.getBoundingClientRect().y
    allkece[i].style.transform = "translateY(" + 0.07*post3 + "%)"
    h5.style.transform = "translateY(" + 0.04*(post3+kece.offsetHeight) + "%)"
    kece.style.backgroundPosition = "0 " + -0.03*post3 + "%"
}}
window.addEventListener("scroll", trans)
