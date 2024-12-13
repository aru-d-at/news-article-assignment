import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateUpdateArticle from "./pages/CreateUpdateArticle";
import DisplayArticles from "./pages/DisplayArticles";


const App: React.FC = () => {
	return (
		<div>
			<nav>
				<Link to="/">View Articles</Link> |{" "}
				<Link to="/new-post">Create/Update Articles</Link> |{" "}
			</nav>
			<Routes>
				<Route path="/" element={<DisplayArticles />} />
				<Route path="/new-post" element={<CreateUpdateArticle />} />
			</Routes>
		</div>
	);
};

export default App;