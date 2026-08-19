function SearchBar(props) {
    return (
        <div>
            <h2>Search Questions</h2>

            <input
                type="text"
                placeholder="Search questions..."
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;