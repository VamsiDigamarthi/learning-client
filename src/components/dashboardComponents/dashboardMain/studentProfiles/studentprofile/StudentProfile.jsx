import React, { useEffect, useState } from "react";
import "./studentprofile.css";
import StudentSingleProfile from "../studentSingleprofile/StudentSingleProfile";
// import { usersData } from "../../../../../data/userdata";
// import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { APIS } from "../../../../../core/apiurl";
import AddExamForStudent from "../../../../../modals/addExamsForStudent/AddExamForStudent";
import ScoreDisplay from "../../../../../modals/scoreDisplay/ScoreDisplay";
const StudentProfile = ({
  selectedStudentOnLeft,
  setSelectedStudentOnLeft,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [allStudents, setAllStudents] = useState([]);
  // filter by name
  const [filterName, setFilterName] = useState("");

  // add exam modal open state
  const [addExamModalOpen, setAddExamModalOpen] = useState(false);

  // score display modal opne
  const [scoreDisplayModal, setScoreDisplayModal] = useState(false);

  //get all students
  const getAllStudentFun = () => {
    APIS.get(`/admin/fetch/Students/${UUU?.email}`)
      .then((res) => {
        // console.log(res.data);
        setAllStudents(res.data);
        setSelectedStudentOnLeft(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllStudentFun();
  }, []);

  // left side one student click that corresponding student details fetch
  const leftStudentSingleStudentClickToFetchStudent = (student) => {
    setSelectedStudentOnLeft(student);
  };

  return (
    <div className="student-profile-card">
      <div className="student-viewall-card">
        <h3>Students</h3>
        <span onClick={() => setScoreDisplayModal(true)}>Score Display</span>
      </div>
      <div className="student-serach-card">
        <input
          onChange={(e) => setFilterName(e.target.value?.trim())}
          type="text"
          placeholder="Enter StudentName"
        />
        <div
          onClick={() => setAddExamModalOpen(true)}
          className="dash-board-add-exams"
        >
          {/* <FaFilter />
          <span>Filters</span> */}
          <span>Add Exams</span>
        </div>
      </div>
      {allStudents?.length > 0 ? (
        <>
          {allStudents
            ?.filter((each) =>
              filterName.length === 0
                ? each
                : each.firstName
                    .toLowerCase()
                    ?.includes(filterName.toLowerCase())
            )
            .map((each, key) => (
              <StudentSingleProfile
                selectedStudentOnLeft={selectedStudentOnLeft} // left side student click store student state
                leftStudentSingleStudentClickToFetchStudent={
                  leftStudentSingleStudentClickToFetchStudent
                } // student click that corresponding students fetching
                key={key}
                student={each}
              />
            ))}
        </>
      ) : (
        <div className="admin-student-not-found">
          <h3>Students Not Found</h3>
        </div>
      )}
      {addExamModalOpen && (
        <AddExamForStudent
          setAddExamModalOpen={setAddExamModalOpen} // close modal
          allStudents={allStudents} //send students data to filter langues student to give exam date
          getAllStudentFun={getAllStudentFun} // this function fetch all students == when exam assigned specific language
        />
      )}
      {scoreDisplayModal && (
        <ScoreDisplay
          allStudents={allStudents}
          setScoreDisplayModal={setScoreDisplayModal}
        />
      )}
    </div>
  );
};

export default StudentProfile;
