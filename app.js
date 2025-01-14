// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbcT2Dbv_gGvejEraqEmTRpjWfP_INZo0",
  authDomain: "first-project-ed208.firebaseapp.com",
  projectId: "first-project-ed208",
  storageBucket: "first-project-ed208.firebasestorage.app",
  messagingSenderId: "724413631751",
  appId: "1:724413631751:web:4bac7ed9cd9c80212a89a2",
  measurementId: "G-6HJ83XTGP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

// CRUD
let deleteStudent = async (id) => {
  try {
    await deleteDoc(doc(db, "students", id));
    console.log("Deleted");
    location.reload(); // Reload the page after deletion
  } catch (error) {
    console.error("Error in deleting", error);
  }
};

let allData = [];

// get data
(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
      allData.push({ id: doc.id, ...doc.data() });
    });
    renderStudents(allData);
  } catch (error) {
    console.error(error);
  }
})();

let addStudent = async () => {
  try {
    const docRef = await addDoc(collection(db, "students"), {
      std_age: 14,
      std_name: "Muhib Khan",
    });

    console.log("Document written with ID: ", docRef.id);
    location.reload(); // Reload the page after addition
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

document.querySelector("#addBtn").addEventListener("click", addStudent);

let updateData = async (id) => {
    try {
      // Prompt user for new name and age
      const newName = prompt("Enter new name:");
      const newAge = prompt("Enter new age:");
  
      // Basic validation
      if (!newName || !newAge) {
        alert("Please enter both name and age.");
        return;
      }
  
      const ageAsInt = parseInt(newAge);
      if (isNaN(ageAsInt) || ageAsInt <= 0) {
        alert("Please enter a positive integer for age.");
        return;
      }
  
      // Update document in Firebase
      await updateDoc(doc(db, "students", id), {
        std_name: newName,
        std_age: ageAsInt,
      });
  
      console.log("Updated");
      location.reload(); // Reload the page after update
    } catch (error) {
      console.error(error);
    }
  };
// Render students
let renderStudents = (students) => {
    const main = document.querySelector("#main");
    main.innerHTML = "";
    students.forEach((student) => {
      const studentHTML = `
        <div id='${student.id}' class="student">
          <h2>Name: ${student.std_name}</h2>
          <h2>Age: ${student.std_age}</h2>
          <button class="delete-btn">Delete</button>
          <button class="update-btn">Update</button>
        </div>
      `;
      main.innerHTML += studentHTML;
    });
  
    // Attach event listeners to delete and update buttons
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const studentId = e.target.parentNode.id;
        deleteStudent(studentId);
      });
    });
  
    const updateButtons = document.querySelectorAll(".update-btn");
    updateButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const studentId = e.target.parentNode.id;
        updateData(studentId);
      });
    });
  };