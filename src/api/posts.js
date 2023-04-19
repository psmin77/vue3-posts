const posts = [
	{ id: 1, title: '제목1', content: '내요오오옹111', createAt: '2023-01-01' },
	{ id: 2, title: '제목2', content: '내요오오옹222', createAt: '2023-02-02' },
	{ id: 3, title: '제목3', content: '내요오오옹333', createAt: '2023-03-03' },
	{ id: 4, title: '제목4', content: '내요오오옹444', createAt: '2023-04-04' },
	{ id: 5, title: '제목5', content: '내요오오옹555', createAt: '2023-06-05' },
];

export function getPosts() {
	return posts;
}

export function getPostById(id) {
	return posts.find(item => item.id === id);
}
