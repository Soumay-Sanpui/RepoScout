import React, { useState } from 'react';
import useMainStore from '../app/mainStore.js';

const SearchBox = () => {
  const [currentUserInput, setCurrentUserInput] = useState('');

  const { setUserInput, userInput } = useMainStore((state) => ({
    setUserInput: state.setUserInput,
    userInput: state.userInput,
  }));

  const handleSubmit = () => {
    if(currentUserInput.length > 0) {
      console.log(currentUserInput)
      setUserInput(currentUserInput);
      console.log(userInput)
      setCurrentUserInput(""); 
    }
  };

  return (
    <div className="p-2 w-full flex items-center justify-around">
      <input
        placeholder="Github Username"
        onChange={(e) => setCurrentUserInput(e.target.value)}
        className="focus:outline-none border-2 border-dashed border-black p-2 font-mono w-3/4 text-base sm:text-sm md:text-md lg:text-lg"
        value={currentUserInput}
      />
      <button onClick={handleSubmit} className="w-1/5 group relative inline-block text-sm font-medium text-red-600 focus:outline-none active:text-red-500 hover:text-red">
        <span className="absolute inset-0 border border-current"></span>
        <span className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
          Search Repos
        </span>
      </button>
    </div>
  );
};

export default SearchBox;

