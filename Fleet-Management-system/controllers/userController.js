const supabase = require('../config/supabase');

const signup = async (req,res) => {
    const { name, email, password, role} = req.body;
    if(!name || !email || !password || !role) return res.status(400).json({message: "missing fields"});
    if(!['customer', 'owner', 'driver'].includes(role)) return res.status(400).json({message:'invalidrole'});

    const {data:existing, error:checkErr} = await supabase.from('users').select('id').eq('email', email);
    if(checkErr || existing.length>0) return res.status(409).json({ message: 'email already exists'});

    const { data, error} = await supabase.from('users').inser([{name,email, password,role}]).select();
    if(error) return res.status(500).json({message: 'signup failed', error});
    res.status(201).json({message:'user created', user:data[0]})


}

module.exports ={signup};
