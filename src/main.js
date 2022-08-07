const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x') //尝试读取当前网站下的x
const xObject = JSON.parse(x) //把字符串重新变回对象
const hashMao = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'B', url: 'https://www.bilibili.com/' },
] //如果xObject不为空就用xObject,为空就初始化为含有两项的数组
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除/开头的内容
}

const render = () => {
  $siteList.find('li:not(.last').remove()
  hashMao.forEach((node, index) => {
    const $li = $(`
    <li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url) //js实现a标签跳转
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() //点击a标签里的close,阻止冒泡
      hashMao.splice(index, 1) //删除网址
      render() //重新渲染
    })
  })
}

render()

$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥?')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    console.log(url)
    hashMao.push({
      logo: simplifyUrl(url)[0],
      url: url
    });
    render()
  });

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMao) //把对象变成字符串
  localStorage.setItem('x', string)
} //关闭页面时,会把hashMao变成字符串,存到Local Storage里面



//键盘事件
$(document).on('keypress', (e) => {
  const { key } = e
  for (let i = 0; i < hashMao.length; i++) {
    if (hashMao[i].logo.toLowerCase() === key) { //如果hashMao的第i个变成toLowerCase(小写)之后等于key
      window.open(hashMao[i].url) //我就打开这个网站
    }
  }
})