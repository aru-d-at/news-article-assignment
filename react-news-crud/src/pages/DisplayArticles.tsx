import React, { useEffect, useState } from "react";
import { getArticles } from "../api";


const DisplayArticles: React.FC = () => {
	const [articles, setArticles] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);  // To handle loading state

	const fetchArticles = async (page: number) => {
		setLoading(true);
		const data = await getArticles(page);
		setArticles(data.data);
		setCurrentPage(data.currentPage);
		setTotalPages(data.totalPages);
		setLoading(false);
	};

	useEffect(() => {
		fetchArticles(currentPage);
	}, [currentPage]);

	return (
		<div className="article-container">
			<h1>Articles</h1>
			<button className="refresh-button" onClick={() => fetchArticles(currentPage)} disabled={loading}>
				{loading ? "Loading..." : "Refresh"}
			</button>
			
			<ul className="article-list">
				{articles.map((article) => (
					<li key={article.id} className="article-item">
						<h2>{article.title}</h2>
						<p>{article.summary}</p>
						<p>
							<strong>Publisher:</strong> {article.publisher} | <strong>Date:</strong> {article.date}
						</p>
					</li>
				))}
			</ul>
			
			<div className="pagination">
				<button
					className="pagination-button"
					disabled={currentPage === 1 || loading}
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
				>
					Previous
				</button>
				<span className="page-info">
					Page {currentPage} of {totalPages}
				</span>
				<button
					className="pagination-button"
					disabled={currentPage === totalPages || loading}
					onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default DisplayArticles;