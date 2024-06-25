const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId)
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
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
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

           return res.json({ message: 'Thought deleted!' });
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
            return res.status(404).json({ message: 'No thought with this Id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    ///api/thoughts/:thoughtId/reactions

    //POST to create a reaction stored in a single thought's reactions array field

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought with this Id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(err);
        }


        //DELETE to pull and remove a reaction by the reaction's reactionId value

    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this Id!' });
            }
            res.json(thought);

        } catch (error) {
            res.status(500).json(err);
        }
    }
};