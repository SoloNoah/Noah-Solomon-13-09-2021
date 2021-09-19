const getFavLocations = () => {
  try {
    if (!localStorage.getItem('likes')) {
      return [];
    }
    const parsedLikes = JSON.parse(localStorage.getItem('likes'));
    return parsedLikes;
  } catch (error) {
    return Error("Couldn't get Favorite locations.");
  }
};

export default { getFavLocations };
