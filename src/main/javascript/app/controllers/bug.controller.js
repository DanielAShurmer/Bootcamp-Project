const Bug = require('../models/bug.model.js');

exports.create = (req, res) => {

    const bug = new Bug({
        bugNumber: req.body.bugNumber || "Unassigned",
        description: req.body.description || "No Description Given",
        status: req.body.status || "Open",
        priority: req.body.priority || "Low",
        tagOne: req.body.tagOne || "-",
        tagTwo: req.body.tagTwo || "-",
        tagThree: req.body.tagThree || "-",
        image: req.body.image || "-",
        closeReason: req.body.closeReason || "-",
        openReason: req.body.openReason || "-"
    });

    bug.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the bug report."
            });
        });
};

exports.findAll = (req, res) => {
    Bug.find()
    .then(bugs => {
        res.send(bugs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving bug reports."
        });
    });
};

exports.findOne = (req, res) => {
    Bug.findById(req.params.bugId)
    .then(bug => {
        if(!bug) {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });            
        }
        res.send(bug);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving report with id " + req.params.bugId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Bug Report content can not be empty"
        });
    }

    Bug.findByIdAndUpdate(req.params.bugId, {
        bugNumber: req.body.bugNumber || "Unassigned",
        description: req.body.description || "No Description Given",
        status: req.body.status || "Open",
        priority: req.body.priority || "Low",
        tagOne: req.body.tagOne || "-",
        tagTwo: req.body.tagTwo || "-",
        tagThree: req.body.tagThree || "-",
        image: req.body.image || "-",
        closeReason: req.body.closeReason || "-",
        openReason: req.body.openReason || "-"
    }, {new: true})
    .then(bug => {
        if(!bug) {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });
        }
        res.send(bug);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });                
        }
        return res.status(500).send({
            message: "Error updating report with id " + req.params.bugId
        });
    });
};

exports.delete = (req, res) => {
    Bug.findByIdAndRemove(req.params.bugId)
    .then(bug => {
        if(!bug) {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });
        }
        res.send({message: "Report deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Report not found with id " + req.params.bugId
            });                
        }
        return res.status(500).send({
            message: "Could not delete report with id " + req.params.bugId
        });
    });
};