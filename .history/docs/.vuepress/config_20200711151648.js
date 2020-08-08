module.exports = {
  dest: 'blog',
  title: 'SWEET\'s blog',
  description: '静坐常思己过，闲谈莫论人非',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'Resume', link: '/resume' },
      {text: 'Blog', link: '/components/interfaceSpecification'} 
    ],
    sidebarDepth: 3, // 侧边栏显示2级
    sidebar: {
      '/components/': [
        'vue/FAQ-1'
      ]
    }, // 侧边栏配置
  }
}