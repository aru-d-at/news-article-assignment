const API_BASE = "http://localhost:5000/articles";


export const getArticles = async (page: number = 1, limit: number = 2) => {
	const response = await fetch(`${API_BASE}?_page=${page}&_limit=${limit}`);
	const result = await response.json();

	// Need to have in header
	const totalItemsResp = await fetch(`http://localhost:5000/total_articles`);
	const totalItems = await totalItemsResp.text()
	const totalPages = Math.ceil(parseInt(totalItems) / limit);

	return {
		data: result,
		currentPage: page,
		totalPages,
		totalItems: parseInt(totalItems),
		itemsPerPage: limit,
	};
};

export const createOrUpdateArticle = async (article: any) => {
	const response = await fetch(API_BASE, {
		method: article.id ? "PUT" : "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(article),
	});
	return response.json();
};;