export const filterData = (filterType) => {
    return {
      type: 'FILTER_DATA',
      payload: filterType,
    };
  };