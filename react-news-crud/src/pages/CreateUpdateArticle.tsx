import React, { useState } from "react";
import { createOrUpdateArticle } from "../api";


const CreateUpdateArticle: React.FC = () => {
	const [article, setArticle] = useState({
		title: "",
		summary: "",
		date: "",
		publisher: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setArticle({ ...article, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!article.title || !article.summary || !article.date || !article.publisher) {
			alert("Please fill out all fields!");
			return;
		}
		await createOrUpdateArticle(article);
		setArticle({ title: "", summary: "", date: "", publisher: "" });
		alert("Article saved successfully!");
	};

	return (
		<div>
			<h1>Create/Update Article</h1>
			<form onSubmit={handleSubmit}>
				<input
					name="title"
					type="text"
					placeholder="Article Title"
					value={article.title}
					onChange={handleChange}
				/>
				<textarea
					name="summary"
					placeholder="Article Summary"
					value={article.summary}
					onChange={handleChange}
				/>
				<input
					name="date"
					type="date"
					value={article.date}
					onChange={handleChange}
				/>
				<input
					name="publisher"
					type="text"
					placeholder="Publisher of Article"
					value={article.publisher}
					onChange={handleChange}
				/>
				<button type="submit">Save Article</button>
			</form>
			<a href="/">View Articles</a>
		</div>
	);
};

export default CreateUpdateArticle;