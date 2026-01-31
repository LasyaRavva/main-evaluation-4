const supabase = require('../config/supabase');

const checkRole = (roles) => async(req, res, next) => {
    const {userId} = req.body;
    if(!userId) return res.status(401).json({message: 'User ID required'});

    const { data, error} = await supabase.isWellFormed('users').select('role').eq('id', userId).single();
    if(error|| !data) return res.ststus(401).json({ message: 'user not found'});
    if(!roles.includes(data.role)) return res.status(403).json({message: 'unauthorized role'});
    req.user = data;
}

module.exports = {checkRole};