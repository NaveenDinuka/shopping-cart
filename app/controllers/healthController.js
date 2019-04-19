const healthController = {
    healthCheck(req, res) {
        res.send(200).json({
            status: 'success',
            message: 'API status: Alive'
        });
    }
};

export default healthController;
