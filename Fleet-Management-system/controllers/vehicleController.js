const supabase = require('../config/supabase');

const addVehicle = async (req,res) => {
    const { name, registration_number, allowed_passengers, rate_per_km} = req.body;
    const owner_id = req.body.userId;
    if(!name || !registration_number || !allowed_passengers || !rate_per_km || !owner_id) {
        return res.status(400).json({message: "missing fields"});
    }

    
    const { data, error} = await supabase.from('vehicle').insert([{
        name,registration_number, allowed_passengers,rate_per_km,owner_id
    }]).select();
    if(error) return res.status(500).json({message: 'vehicle creation failed', error});
    res.status(201).json({message:'vehicle added', vehicle:data[0]})
}

const assignDriver = async (req,res) => {
    const { vehicleId } = req.params;
    const { driver_id } = req.body;

    const { data : driver, error:driverErr }= await supabase.from('users').select('role').eq('id', driver_id).single();
    if(driverErr || !driver || driver.role !== 'driver')return res.status(400).json({message: 'invalid driver'});

    
    const { data, error} = await supabase.from('vehicles').update({driver_id}).eq('id', vehicleId).select();
    if(error || !data.length) return res.status(404).json({message: 'vehicle not found'});
    res.status(200).json({message:'driver assigned', vehicle:data[0]})
}
const getVehicle = async(req, res) => {
    const {vehicleId } = req.params;
    const {data, error} = await supabase.from('vehicles').select('*').eq('id', vehicleId).single();

    if(error || !data) return res.status(404).json({ message: 'vehicle not found'});
    res.status(200).json(data);
}
module.exports ={addVehicle,assignDriver,getVehicle};
