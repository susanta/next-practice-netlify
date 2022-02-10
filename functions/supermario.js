exports.handler = async () => {
  console.log('supermario function ran');

  const data = { name: 'mario', age: 30, job: 'plumber' };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
