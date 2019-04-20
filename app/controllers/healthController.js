const healthController = {
    healthCheck(req, res) {
        res.boom.success('API status: Alive');
    }
};

export default healthController;
