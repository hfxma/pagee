const span = document.getElementById("minitask").querySelector('span')
const plus = document.getElementById("minitask").querySelector('.fa-plus')
const erase = document.getElementById("minitask").querySelector('.fa-trash')
const miho = document.getElementById("minitask-todo").querySelectorAll('input.todo');
const minmax = (el, b, c) => {
    if (el < b) {
        return b
    } if (el > c){
        return c
    } return el
}
const perc = (el, meter) => {
    if ((el * 100) / meter < 0){
        return 0
    } if ((el * 100) / meter > 100){
        return 100
    }
    return (el * 100) / meter
}
const check = () => {
    miho.forEach(i => {
        let pic = i.querySelector('::after')
        if (i.checked) {
            pic.style.background = "url(./pics/checked.png)"
        } else {
            pic.style.background = "url(./pics/unchecked.png)"
        }
    })
}
function add() {
    const list = document.querySelectorAll("input.todo")
    if(list.length >= 6){
        const alert = document.getElementById("alert-todo")
        alert.innerHTML = "the todo list is full! delete some"
        setTimeout(function() {
            alert.innerHTML = "";
        }, 1000);
    } else {
        span.innerHTML = '<input id="input-add" type="text" style="display: block;" maxlength="40" placeholder="add todo">'
        const input = document.getElementById("input-add")
        input.focus()
    }
}
function space(event){
    if (event.keyCode === 13){
    const input = document.getElementById("input-add")
    const volu = input.value;
    let curr = document.querySelector("ol")
    if (volu.trim() == ""){
        input.remove()
    } else {
        const isi = document.createElement("label")
        isi.innerHTML = 
        '<input class="todo" type="checkbox">' + volu ;
        span.insertAdjacentElement("afterend",isi);
        input.remove()
    }
}}
function rem(){
    const check = document.querySelectorAll("input.todo:checked");
    const la = Array.from(check).map(i => i.parentElement)
    la.forEach(hm => hm.remove())
}
plus.addEventListener("click", add);
erase.addEventListener("click", rem);

document.addEventListener("keydown", function(event) {
    if (event.target.id === "input-add") {
      space(event);
    }
  });

function ambient() {
    const iframe = document.getElementById("start").querySelector("iframe");
    let comp = window.getComputedStyle(iframe);
    let hm = comp.filter.split("rgb(")[1].split(")")[0];
    let r = parseInt(hm.split(",")[0]);
    let g = parseInt(hm.split(",")[1]);
    let b = parseInt(hm.split(",")[2]);
    let min = 93; let max = 255
    if (r >= max && b <= min){
        g++
    }
    if (g >= max && b <= min){
        r--
    }
    if (r <= min && g >= max){
        b++
    }
    if (r <= min && b >= max){
        g--
    }
    if (g <= min && b >= max){
        r++;
    }
    if (r >= max && g <= min){
        b--
    }
    iframe.style.filter = `drop-shadow(0 0 0.7rem rgb(${r}, ${g}, ${b}))`;
}
setInterval(ambient, 15);

const bar = document.getElementById("energy-bar")
const lev = document.getElementById("energy-bar-sl")
const ener = {
    color: ['#da7070', '#e4d284', '#85aed7', '#93cd81'],
    meter: [25, 50, 75, 100],
    def:['Exhausted', 'Low', 'Medium', 'High'],
    deff: [
    'Feeling exhausted, overwhelmed, and unable to function. You may have trouble staying awake or concentrating',
    'Feeling tired, sluggish, and unable to focus. You may have trouble making decisions or solving problems',
    'Able to focus and concentrate, but may need to take breaks more often. You may feel productive and efficient',
    'Energized, able to do activities that require much energy. You may feel clear-headed, focused, and motivated'],
    act: [["Sleeping",
        "Taking a nap",
        "Meditation",
        "Lying down and listening to the sounds of nature",
        "Resting in bed",],
        ["Listening to music",
        "Taking a bath or shower",
        "Reading a book",
        "Spending time with loved ones",
        "Going for a short walk",],
        ["Reading",
        "Brainstorming",
        "Planning",
        "Organizing",
        "Yoga",],
        ["Coding",
        "Writing",
        "Studying",
        "Problem-solving",
        "Playing sports",],
    ],
    find: (x) => {
        this.meter.forEach((u, i) => {
            if (x < u) {
                return i
            }
    })

        }
    }
    const p = document.getElementById("energy").querySelector("p")
    const ul = document.getElementById("energy").querySelector("ul")
    const lov = document.getElementById("energy").querySelector("h2")
    const met1 = document.getElementById("energy").querySelector("h1")
    const enercl = (event) => {
        const wBar = bar.offsetWidth;
        const wLev = lev.offsetWidth;
    const x = event.clientX - bar.offsetLeft - wLev / 2;
    lev.style.transform = "translate(" + minmax(x, 0, wBar - wLev + 1) + "px, -3px)";
    let perr = Math.trunc(perc(x, wBar - wLev));
    let In = Math.trunc(perr/(100/ener.meter.length))
    ul.innerHTML = '<li>' + ener.act[In].join('</li><li>') + '</li>';
    lov.innerHTML = 'Your current energy level:'
    met1.parentElement.style.color
    met1.innerHTML = ener.def[In] + ' <span>' + perr + "%</span>";
    met1.style.color = ener.color[In];
    p.innerHTML = ener.deff[In];
    lev.style.backgroundColor = ener.color[In];
    bar.addEventListener("mousemove", enercl);
}
bar.addEventListener("mousedown", enercl)
bar.addEventListener("mouseup", () => {
    bar.removeEventListener("mousemove", enercl);
})