const route = {
	mode: 'history',
    routes: [
		{
			path: '/',
			content: '默认路由内容'
		},
		{
			path: '/a',
			name: 'a',
			content: 'this is a router content.'
		},
		{
			path: '/b',
			name: 'b',
			content: '这就是b路由',
			children: [
				{
					path: '/com',
					name: 'com',
					content: '这是b路由的子路由'
				}
			]
		},
		{
			path: '/c',
			name: 'c',
			content: '路由c'
		}
	]
}
export default route