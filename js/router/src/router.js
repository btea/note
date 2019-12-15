const route = {
    routes: [
		{
			path: '/',
			redirect: '/a'
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
		}
	]
}
export default route