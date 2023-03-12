export const userQuery = userId => {
  // SANITY QUERY SYNTAX
  // Try to get me a document of type user with a specific id
  const query = `*[_type == "user" && _id == '${userId}' ]`;

  // Return query
  return query;
};
