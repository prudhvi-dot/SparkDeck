import Form from "next/form";

import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="flex search-form items-center justify-between w-full max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 shadow-lg mt-10"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search for startups..."
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-300 text-lg"
      />

      <div className="flex items-center gap-2">
        {query && <SearchFormReset />}

        <button
          type="submit"
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white shadow-md"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
