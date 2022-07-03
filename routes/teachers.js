const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const Group = require("../models/GroupStud");
const Feedback = require("../models/Feedback");
const router = require("express").Router();


router

    .post("/teachers", async (req, res, next) => {
        try {
            const teacher = await Teacher.create(req.body);
            res.status(201).location(teacher.id).send().json({ message: "teacher created" })
        } catch (error) {
            next(error)
        }
    })
    .get("/teachers", async (req, res, next) => {
        try {
            const teachers = await Teacher.findAll();
            if (teachers.length > 0) {
                res.json(teachers)//trimitem profesorii existenti
            } else {
                res.status(404).json({ message: "not found" });
            }
        } catch (error) {
            next(error)
        }
    })


    //FUNCTIE CARE PERMITE ADAUGAREA UNUI CURS PENTRU UN ANUMIT PROFESOR
    //adaugare curs la un anumit profesor

    .post('/teachers/:teacherId/courses', async (req, res, next) => {
        try {
            //cautare profesor
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const course = await Course.create(req.body);
                teacher.addCourse(course);
                await teacher.save();
                res.status(201).json({ message: "created" })

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
            res.status(400).json({ message: "eroare" });
        }
    })


    //afisarea cursurilor unui anumit profesor
    .get('/teachers/:teacherId/courses', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const courses = await teacher.getCourses();
                if (courses.length > 0) {
                    res.json(courses)//trimitem cursurile identificate

                } else {
                    res.status(404).json({ message: " no courses" })
                }


            } else {
                res.status(404).json({ message: "no teacher" })
            }

        } catch (error) {
            next(error)
        }
    })
    .get('/courses', async (req, res, next) => {
        try {
            const teachers = await Course.findAll();
            if (teachers.length > 0) {
                res.json(teachers)//trimitem profesorii existenti
            } else {
                res.status(404).json({ message: "not found" });
            }
        } catch (error) {
            next(error)
        }
    })

    // .get('/courses/:idCourse', async (req, res, next) => {
    //     try {
    //         const teacher = await Course.findByPk(req.params.idCourse);
    //         if (teacher) {
    //             res.status(200).json(teacher)
    //         } else {

    //         }
    //     } catch (error) {
    //         res.status(404).json({ message: " not found" });
    //     }
    // })
    // .post('/courses/:idCourse/feedback')

    //afisarea unui anumit curs al unui profesor
    .get('/teachers/:teacherId/courses/:courseId', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const courses = await teacher.getCourses({ where: { id: req.params.courseId } });
                const course = courses.shift()
                if (course) {
                    res.json(course)//trimitem cursurile identificate

                } else {
                    res.status(404).json({ message: " no courses" })
                }


            } else {
                res.status(404).json({ message: "no teacher" })
            }

        } catch (error) {
            next(error)
        }
    })


    .post('/teachers/:teacherId/courses/:courseId/feedback', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const courses = await teacher.getCourses({ where: { id: req.params.courseId } });
                const course = courses.shift()
                if (course) {
                    const feedback=await Feedback.create(req.body);
                    course.addFeedback(feedback);
                    await course.save();
                    res.status(201).json({message:"created"});
                    
                    //curs . add feedback

                } else {
                    res.status(404).json({ message: " no courses" })
                }


            } else {
                res.status(404).json({ message: "no teacher" })
            }

        } catch (error) {
            next(error)
            res.json({message:"eroare"})
        }
    })
    .get('/teachers/:teacherId/courses/:courseId/feedback', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const courses = await teacher.getCourses({ where: { id: req.params.courseId } });
                const course = courses.shift()
                if (course) {
                    const feedback=await course.getFeedbacks();
                 
                    res.json(feedback);

                } else {
                    res.status(404).json({ message: " no courses" })
                }


            } else {
                res.status(404).json({ message: "no teacher" })
            }

        } catch (error) {
            next(error)
            res.json({message:"eroare"})
        }
    })

    .delete('/teachers/:teacherId', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                await teacher.destroy();
                res.status(200).json({
                    message: 'accepted'
                });
            } else {
                res.status(404).json({
                    message: " teacher not found"
                })
            }

        } catch (err) {
            next(err)
        }
    })
    //afisarea unui profesor cu un anumit id
    .get('/teachers/:teacherId', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                res.status(200).json(teacher)
            } else {

            }
        } catch (error) {
            res.status(404).json({ message: " not found" });
        }
    })
    //UPDATE
    //functie care permite modificarea datelor unui profesor=> utila pentru gestionarea conturilor
    .put('/teachers/:teacherId', async (req, res, next) => {
        try {
            const teacher = await Teacher.findByPk(req.params.teacherId)
            if (teacher) {

                // teacher.teacherFullName = req.body.fullName
                // teacher.teacherLastName = req.body.lastName
                // teacher.teacherSpecialization = req.body.specialization
                // teacher.teacherEmail = req.body.email
                // teacher.teacherPassword = req.body.password
                await teacher.update(req.body)
                await teacher.save()
                res.status(202).json({ message: 'Teacher updated!' })

            } else {
                res.status(404).json({ message: '404 - University Not Found!' })
            }
        } catch (err) {
            next(err);
        }
    })


    //adaugare grup
    .post('/teachers/:teacherId/group', async (req, res, next) => {
        try {
            //cautare profesor
            const teacher = await Teacher.findByPk(req.params.teacherId);
            if (teacher) {
                const course = await Group.create(req.body);
                teacher.addGroup(course);
                await teacher.save();
                res.status(201).json({ message: "created" })

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
            res.status(400).json({ message: "eroare" });
        }
    });


module.exports = router;