import { useState } from "react";

const SearchBar = (props: {handleSearch: Function}) => {

    const [searchVal, setSearchVal] = useState('')

    const handleSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        props.handleSearch(searchVal);
    }

    return (
        <div>
            <form onSubmit={handleSubmitEvent}>
                <input type="text" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
                <button type="submit" className="btn btn-outline-primary">Szukaj!</button>
            </form>
        </div>
    )

}

export default SearchBar;