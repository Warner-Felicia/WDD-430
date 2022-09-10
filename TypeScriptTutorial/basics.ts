//  Primitive number, sting, boolean
// More complex types: arrays, objects
//Funtion types, parameters

//Primitives

let age: number;
age = 12;

let userName: string;

userName = "Felicia";

let isInstructor: boolean;

isInstructor = true;

//More complex types

let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

type Person = {
    name: string,
    age: number
}

let person: Person;

person = {
    name: "Felicia",
    age: 42
}

let people: Person[];

// Type inference

let course: string | number = 'React - The Complete Guide';

course = 1234;

// Functions and types

function add(a: number, b: number) {
    return a + b;
};

function printOutput(value: any) {
    console.log(value);
}

// Generics
function insertAtBeggining<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1,2,3];
const secondDemoArray = ["Felicia", "Bryan", "Paul", "Leah", "Ethan"]

const updatedarray = insertAtBeggining(demoArray, -1); // [-1, 1, 2, 3]
const secondUpdatedArray = insertAtBeggining(secondDemoArray, "Nala");

//classes and interfaces

class Student {
    
    constructor(
        public first: string, 
        public last: string, 
        public age: number, 
        private courses: string[]
    ) {}

    enroll(courseName: string) {
        this.courses.push(courseName);
    }

    listCourses() {
        return this.courses;
    }
}

const student = new Student("Felicia", "Warner", 42, ["Angular"]);
student.enroll('React');
student.listCourses;

interface Human {
    firstName: string;
    age: number;

    greet: () => void;
}

let felicia: Human;
felicia = {
    firstName: "Felicia",
    age: 32,
    greet() {
        console.log("Hello!");
    }
};

class Instructor implements Human {

    constructor(
        public firstName: string, 
        public age: number, 
    ) {}
    greet() {
        console.log("Hello!!!!!");
    }
}
