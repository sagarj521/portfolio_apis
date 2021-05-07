
const Project = require('../models/project');

exports.createProject = (req, res, next) => {
    
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration.label,
        technologies: req.body.technologies,
    })

    project.save()
           .then(result => {
            res.status(200).json({
                message: "project created succefully",
                data: result
            });
           })
           .catch(err => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
               next(err);
           })
}

exports.getProjects = ((req, res, next)=> {
    Project.find()
           .then(projects => {
               res.status(200).json({
                   data:projects,
                   message: "projects get succefully"
               })
           })
           .catch(err => next(err));
});
      