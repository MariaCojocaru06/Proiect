const express = require('express');
const app = express();
const port = 8080;
const sequelize = require('./sequelize')
const cors= require('cors')


//Importam modelele create pentru entitatile folosite
const Course = require('./models/Course');
const Student = require('./models/Student')
const Teacher = require('./models/Teacher');
const Group=require('./models/GroupStud');
const Feedback=require('./models/Feedback')
//const { noExtendRight } = require("sequelize/dist/lib/operators");
const { message } = require('statuses');


//Definim legaturile intre entitati
//entitatea comuna este cursul care are un profesor si mai multi studenti
//feedback ul ar putea fi o alta entitate care se regaseste multiplu in curs

//Course.hasOne(Teacher);
Teacher.hasMany(Student);
Group.hasMany(Student);
Student.belongsTo(Group,{through:"one"})
Teacher.hasMany(Course);
// Student.hasMany(Course);
// Course.hasMany(Student);

Student.belongsToMany(Course, { through: "enrollements" });
Course.belongsToMany(Student, { through: "enrollements" })

//*********************adaugare legatura cu feedback
Course.hasMany(Feedback)
Feedback.belongsTo(Course,{through:"one"})
// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors())
//importare routes
app.use("/api-teacher",require("./routes/teachers"));
app.use("/api-group",require("./routes/groups"));
app.use("/api-feedback",require('./routes/feedback'))

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.
listen(port, () => {
    console.log('Running on port ' + port);
});

//app.use(cors({ origin: 'http://localhost:3000' }));
// Create a middleware to handle 500 status errors.
app.use((error, request, response, next) => {
    console.error(`[ERROR]: ${error}`);
    response.status(500).json(error);
});

//Functie pentru sincronizarea  bazei de date
//1. in post cream baza de date ->localhost:3000/ put
app.put("/", async (request, response, next) => {
    try {
        await sequelize.sync({ force: true });
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// //POST pentru adaugarea unui nou profesor
// app.post('/teachers', async (req, res, next) => {
//     try {
//         const teacher = await Teacher.create(req.body);
//         res.status(201).location(teacher.id).send()
//         res.json({ message: "teacher created" })
//     } catch (error) {
//         next(error)
//     }
// })

// //GET pentru afisarea tuturor profesorilor
// app.get('/teachers', async (req, res, next) => {
//     try {
//         const teachers = await Teacher.findAll();
//         if (teachers.length > 0) {
//             res.json(teachers)//trimitem profesorii existenti
//         } else {
//             res.status(404).json({ message: "not found" });
//         }
//     } catch (error) {
//         next(error)
//     }
// })


// //FUNCTIE CARE PERMITE ADAUGAREA UNUI CURS PENTRU UN ANUMIT PROFESOR
// // //adaugare curs la un anumit profesor
// app.post('/teachers/:teacherId/courses', async (req, res, next) => {
//     try {
//         //cautare profesor
//         const teacher= await Teacher.findByPk(req.params.teacherId);
//         if (teacher) {
//             const course= await Course.create(req.body);
//             teacher.addCourse(course);
//             await teacher.save();
//             res.status(201).json({message:"created"})

//         } else {
//             res.status(404).json({ message: "not found" })
//         }

//     } catch (error) {
//         next(error)
//         res.status(400).json({message:"eroare"})
//     }
// })

// //afisarea cursurilor unui anumit profesor
// app.get('/teachers/:teacherId/courses', async (req, res, next) => {
//     try {
//         const teacher = await Teacher.findByPk(req.params.teacherId);
//         if (teacher) {
//             const courses = await teacher.getCourses();
//             if (courses.length > 0) {
//                 res.json(courses)//trimitem cursurile identificate

//             } else {
//                 res.status(404).json({ message: " no courses" })
//             }


//         } else {
//             res.status(404).json({ message: "no teacher" })
//         }

//     } catch (error) {
//         next(error)
//     }
// })

// //afisarea unui anumit curs al unui profesor

// app.get('/teachers/:teacherId/courses/:courseId', async(req,res,next)=>{
//     try{
//         const teacher = await Teacher.findByPk(req.params.teacherId);
//         if (teacher) {
//             const courses = await teacher.getCourses({id: req.params.courseId});
//             const course=courses.shift()
//             if (course) {
//                 res.json(course)//trimitem cursurile identificate

//             } else {
//                 res.status(404).json({ message: " no courses" })
//             }


//         } else {
//             res.status(404).json({ message: "no teacher" })
//         }



//     }catch(error){
//         next(error)
//     }
// })

//ADAUGARE OPERATII PENTRU LUCRUL CU STUDENTI
//++ADAUGARE ELEMET PENTRU FEEDBACK


//LOGAREA STUDENT/PROFESOR SE FACE SEPARAT prin butoane diferite

// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name))
//   })
  
//   function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next()
//     })
//   }
// app.post('/loginStud',(req,res)=>{
//     const username=req.body

// })


//ADAUGARE OPERATII PENTRU LUCRUL CU STUDENTI
//++ADAUGARE ELEMET PENTRU FEEDBACK


//LOGAREA STUDENT/PROFESOR SE FACE SEPARAT prin butoane diferite

app.get('/user/teacher/:email/:password',(req,res,next)=>{
  try{ Teacher.findOne({
        where:{
            email:req.params.email,
            password:req.params.password
        }
    }).then(result=>{
        if(result!==null)
        res.json(result)
        else
        res.json({message:"invalid login"})
    })
}catch(error){
    next(error);
}
})

app.get('/user/student/:email/:password',(req,res,next)=>{
    try{ Student.findOne({
          where:{
              email:req.params.email,
              password:req.params.password
          }
      }).then(result=>{
          if(result!==null)
          res.json(result)
          else
          res.json({message:"invalid login"})
      })
  }catch(error){
      next(error);
  }
  })
//Realizarea grupurilor de studenti pentru studiu

// app.post('/groups',async(req,res,next)=>{
//     try{
//         let group=await Group.create(req.body);
//         res.status(200).json({message:"created"}).location(group.id).send()

//     }catch(error){
//         next(error)
//     }
// })

// app.get('/groups',async(req,res,next)=>{
//     try{
//         let groups = await Group.findAll();
//         res.status(200).json(groups);

//     }catch(error){
//         next(error)
//     }
// })

// //functii pentru adaugarea unui student intr-un grup de studiu identificat prin id
// app.post('/groups/:id/students',async(req,res,next)=>{
//     try{
//         let group = await Group.findByPk(req.params.id)
//         if (group) {
//             const student= await Student.create(req.body);
//             group.addStudent(student);
//             await group.save();
//             res.status(201).json({message:"created"})

//         } else {
//             res.status(404).json({ message: "not found" })
//         }

//     }catch(error){
//         next(error)
//     }
// })

// //afisarea studentilor dintr-un anumit grup de studiu
// app.get('/groups/:id/students', async (req, res, next) => {
//     try {
//         const group = await Group.findByPk(req.params.id);
//         if (group) {
//             const students = await group.getStudents();
//             if (students.length > 0) {
//                 res.json(students)//trimitem cursurile identificate

//             } else {
//                 res.status(404).json({ message: " no students" })
//             }


//         } else {
//             res.status(404).json({ message: "no group" })
//         }

//     } catch (error) {
//         next(error)
//     }
// })

 