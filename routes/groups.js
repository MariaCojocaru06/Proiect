const Group = require("../models/GroupStud");
const Student = require("../models/Student");

const router = require("express").Router()

//Realizarea grupurilor de studenti pentru studiu
router
    .post('/groups',async(req,res,next)=>{
        try{
            let group=await Group.create(req.body);
            res.status(200).json({message:"created"}).location(group.id).send()
    
        }catch(error){
            next(error)
        }
    })

    .get('/groups',async(req,res,next)=>{
        try{
            let groups = await Group.findAll();
            res.status(200).json(groups);
    
        }catch(error){
            next(error)
        }
    })
    .put('/groups/:id',async(req,res,next)=>{
        try{
            let group=await Group.findByPk(req.params.id)
            if(group){
                group.groupName=req.body.Name;
                await group.save();
                res.status(202).json(group)
            }else
            res.status.json({message:"Not found"})
            

        }catch(error){
            res.status(200).json({message:"Not updated"})
        }
    })
    .get('/groups/:id',async(req,res,next)=>{
        try{
            let group=await Group.findByPk(req.params.id)
            if(group){
                res.status(202).json(group)
            }else
            res.status.json({message:"Not found"})
            

        }catch(error){
            res.status(400).json({message:"error"})
        }
    })
    //functii pentru adaugarea unui student intr-un grup de studiu identificat prin id

    .post('/groups/:id/students',async(req,res,next)=>{
        try{
            let group = await Group.findByPk(req.params.id)
            if (group) {
                const student= await Student.create(req.body);
                group.addStudent(student);
                await group.save();
                res.status(201).json({message:"created"})
    
            } else {
                res.status(404).json({ message: "not found" })
            }
    
        }catch(error){
            next(error)
        }
    })

    //afisarea studentilor dintr-un anumit grup de studiu
    .get('/groups/:id/students', async (req, res, next) => {
        try {
            const group = await Group.findByPk(req.params.id);
            if (group) {
                const students = await group.getStudents();
                if (students.length > 0) {
                    res.json(students)//trimitem cursurile identificate
    
                } else {
                    res.status(404).json({ message: " no students" })
                }
    
    
            } else {
                res.status(404).json({ message: "no group" })
            }
    
        } catch (error) {
            next(error)
        }
    })

    .delete('/groups/:gid/students/:studentid',async(req,res,next)=>{
        try{
            const group = await Group.findByPk(req.params.gid)
            if(group){
                const students = await group.getStudents({where:{id:req.params.studentid}})
                const student = students.shift();
                if(student){
                    await student.destroy();
                    res.status(202).json({message: 'accepted'});
                }else{
                    res.status(404).json({message: 'student not found'})
                }
            }
            else{
                res.status(404).json({message: 'group not found'})
            }

        }catch(err){
            next(error)
        }

    })
    //modificarea atributelor unui student
    .put('/groups/:gid/students/:studentid',async(req,res,next)=>{
        try{
            const group = await Group.findByPk(req.params.gid)
            if(group){
                const students = await group.getStudents({where:{id:req.params.studentid}})
                const student = students.shift();
                if(student){
                    await student.update(req.body)
                    await student.save()
                    res.status(202).json({message: 'accepted'});
                }else{
                    res.status(404).json({message: 'student not found'})
                }
            }
            else{
                res.status(404).json({message: 'group not found'})
            }

        }catch(err){
            next(error)
        }

    })
    //afisarea unui anumit student identificat dupa id
    .get('/groups/:gid/students/:studentid',async(req,res,next)=>{
        try{
            const group = await Group.findByPk(req.params.gid)
            if(group){
                const students = await group.getStudents({where:{id:req.params.studentid}})
                const student = students.shift();
                if(student){
                   
                    res.status(202).json(student);
                }else{
                    res.status(404).json({message: 'student not found'})
                }
            }
            else{
                res.status(404).json({message: 'group not found'})
            }

        }catch(err){
            next(error)
        }

    })



    module.exports =router;