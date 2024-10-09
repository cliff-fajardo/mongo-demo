const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://clifffajardo:NkUDAIppdX5okdox@cluster0.4ew2l.mongodb.net/playground?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err)=> console.log('Could not connect to MongoDB...',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    // Compile schema into model - Class
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });


    // Promise...Save document to DB
    const result = await course.save();
    console.log(result);
}
// createCourse();

async function getCourses(){
    const courses = await Course
        .find()
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses);
}
getCourses();