const notFound = async (req, res) => {
  res.send({
    code: 404,
    detail: 'Not found',
  });
};

export default notFound;
