const {Thought,User}=require('../models');

module.exports={
    async getThoughts(req,res){
        try {
            const thoughts=await Thought.find()
            res.json(thoughts)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getSingleThought(req,res){
        try {
            const thought= await Thought.findById(req.params.thoughtId)
            if (!thought)
                return res.status(404).json('no thought with that id found');
            res.json(thought);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
     //create a new thought 
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    
    // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that Id' });
      }

      await User.deleteMany({ _id: { $in: thought.user } });
      res.json({ message: 'Thought and User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this Id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

 