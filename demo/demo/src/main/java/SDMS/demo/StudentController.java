package SDMS.demo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // GET ALL STUDENTS
    @GetMapping
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    // GET ONE STUDENT
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {

        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADD STUDENT
    @PostMapping
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentRepository.save(student);
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable int id,
            @Valid @RequestBody Student student) {

        return studentRepository.findById(id)
                .map(existingStudent -> {

                    existingStudent.setRollNo(student.getRollNo());
                    existingStudent.setFullName(student.getFullName());
                    existingStudent.setFatherName(student.getFatherName());
                    existingStudent.setMotherName(student.getMotherName());
                    existingStudent.setCourse(student.getCourse());
                    existingStudent.setDepartment(student.getDepartment());
                    existingStudent.setDateOfBirth(student.getDateOfBirth());
                    existingStudent.setGender(student.getGender());
                    existingStudent.setPhone(student.getPhone());
                    existingStudent.setEmail(student.getEmail());
                    existingStudent.setAddress(student.getAddress());

                    Student updatedStudent =
                            studentRepository.save(existingStudent);

                    return ResponseEntity.ok(updatedStudent);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {

        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        studentRepository.deleteById(id);

        return ResponseEntity.ok("Student deleted successfully");
    }
}