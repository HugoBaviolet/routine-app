const Habit = require('../models/Habit');

//Get all habits
exports.getHabits = async (req,res) => {
    try {
        const habits = await Habit.find();
        res.json({ success: true, data: habits});
    }catch(err){
        res.status(500).json({success: false, error: 'Server Error'});
    }
};

//Add a new habit
exports.addHabit = async (req, response) => {
    try {
        const { name } = req.body;
        const newHabit = new Habit({ name });
        await newHabit.save();
        res.json({success: true, data: newHabit});
    } catch(err){
        res.status(500).json({ success: false, error: 'Server Error'});
    };
};