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
    hashMap.forEach((item, index) => {
        let $li = $(`<li>
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
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
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