let $siteList = $(".siteList")
let $lastLi = $('.last')
let x = localStorage.getItem('x')
let xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        url: 'https://www.bilibili.com'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
]
let render = () => {
    $siteList.find('li:not(.last)').remove()
    let $li
    hashMap.forEach((item, index) => {
        if (document.body.classList.contains('dark')) {
            $li = $(`<li>
            <div class="site dark">
                <div class="logo">${item.logo[0]}</div>
                <div class="link">${simplifyUrl(item.url)}</div>
                <div class="remove">
                <svg class="icon">
                        <use xlink:href="#icon-darkR"></use>
                </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        } else {
            $li = $(`<li>
        <div class="site">
            <div class="logo">${item.logo[0]}</div>
            <div class="link">${simplifyUrl(item.url)}</div>
            <div class="remove">
            <svg class="icon">
                    <use xlink:href="#icon-remove"></use>
            </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi)
        }
        $li.on('click', () => {
            window.open(item.url)
        })
        $li.on('click', '.remove', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
const simplifyUrl = (url) => {
    return url.replace("https://", "").replace("www.", '').replace('http://', '').replace('/\/.*/', "") //删除/开头的内容直到结尾
}
render()
$('.addButton').on('click', function (e) {
    let url = window.prompt('请问要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()

});
$(document).on('keypress', (e) => {
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        console.log(hashMap[i].logo);
        console.log(hashMap[i].url);
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
const addIcon = document.querySelector('.icon-wrapper use');
const removeIcon = document.querySelectorAll('.remove use')
const theme = document.getElementById('theme');
theme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    $(".site").toggleClass('dark');
    $(".sreach>button").toggleClass('dark');
    $(".sreach>input").toggleClass('dark');
    $(".addButton").toggleClass('dark');
    if (document.body.classList.contains('dark')) {
        theme.innerHTML = `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-light"></use>
                </svg>`;
        addIcon.href.animVal = "#icon-darkA"
        addIcon.href.baseVal = "#icon-darkA"
        removeIcon.forEach((item) => {
            item.href.animVal = "#icon-darkR"
            item.href.baseVal = "#icon-darkR"
        })
    } else {
        theme.innerHTML = `<svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-dark"></use>
         </svg>`;
        addIcon.href.animVal = "#icon-add"
        addIcon.href.baseVal = "#icon-add"
        removeIcon.forEach((item) => {
            item.href.animVal = "#icon-remove"
            item.href.baseVal = "#icon-remove"
        })
    }
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    $(".site").addClass('dark');
    $(".sreach>button").addClass('dark');
    $(".sreach>input").addClass('dark');
    $(".addButton").addClass('dark');
    theme.innerHTML = `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-light"></use>
                </svg>`;
    addIcon.href.animVal = "#icon-darkA"
    addIcon.href.baseVal = "#icon-darkA"
    removeIcon.forEach((item) => {
        item.href.animVal = "#icon-darkR"
        item.href.baseVal = "#icon-darkR"
    })

}
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}