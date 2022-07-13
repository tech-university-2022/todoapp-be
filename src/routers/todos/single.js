module.exports = (req, res) => {
  res.status(200).json({ message: 'Single page!', name: req.name });
};
