import React from 'react';

const FilteredStatus = ({ filterReviews, clearAllFilters }) => {
  const filtersUsed = [];
  let i = 1;
  filterReviews.forEach(filter => {
    if (filter === 1) {
      filtersUsed.push(<div className="filter-title">{i} Stars</div>);
    }
    i++;
  });

  return (
    <div className="filters-used">
      <div>Filters Used:</div>
      {filtersUsed}
      <div className="clear-filters" onClick={() => clearAllFilters()}>Clear All Filters</div>
    </div>
  );
};

export default FilteredStatus;
