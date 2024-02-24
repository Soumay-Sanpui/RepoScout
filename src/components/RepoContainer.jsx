import React, { useState, useEffect } from 'react';
import RepoCard from './RepoCard.jsx';
import SkeletonLoader from './SkeletonLoader.jsx';
import useMainStore from '../app/mainStore.js';

const RepoContainer = () => {
  const [isFirst, setIsFirst] = useState(true);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInput = useMainStore((state) => state.userInput);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${userInput}/repos`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
        setIsFirst(false);
      }
    };

    if (userInput) {
      fetchRepos();
    }
  }, [userInput]);

  const truncateDescription = (description) => {
    if (!description) {
      return "";
    }
    const words = description.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    }
    return description;
  };

  if (loading && !isFirst) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return <div className="w-screen h-[90vh] flex items-center justify-center flex-wrap px-3 text-4xl font-bold">Search Public Github Repos of any github user</div>;
  }

  return (
    <div className="w-screen h-auto flex flex-wrap px-3">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          cardTitle={repo.name}
          desc={truncateDescription(repo.description)}
          repoLink={repo.html_url}
        />
      ))}
    </div>
  );
};

export default RepoContainer;

