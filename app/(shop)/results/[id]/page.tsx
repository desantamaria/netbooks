"use client";
import React, { use, useEffect, useState } from "react";

const SearchResultsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [search, setSearch] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setSearch(resolvedParams);
    };
    fetchParams();
  }, [params]);

  console.log(search);
  return (
    <div className="flex items-center justify-center py-10">
      Search Results for: {search?.id}
    </div>
  );
};

export default SearchResultsPage;
