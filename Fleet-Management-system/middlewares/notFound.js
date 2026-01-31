const notFound = (req,res) => {
    res.status(404).json({message: ' this request is not found'});

}

module.exports = {notFound};
