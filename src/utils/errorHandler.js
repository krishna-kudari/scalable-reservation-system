const handleNotFound = (req, res) => {
    res.status(404).json({ error: 'Not Found' });
};

const handleServerError = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
    handleNotFound,
    handleServerError,
};
