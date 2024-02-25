import { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";


const Pdf = () => {
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  const [topic, setTopic] = useState("");
  const [Designation, setDesignation] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [submittedTo, setSubmittedTo] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [department, setDepartment] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [defaultPdfName, setDefaultPdfName] = useState("Assignment");

  const universityName = "Daffodil International University";
  const imageUrl =
    "https://i.ibb.co/NpWxfLV/74e499e046c0b7f26dafbe8d3b3ca0a9.png";
  const greenColor = rgb(0, 128 / 255, 0);
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);

    page.drawLine({
      start: { x: 50, y: 50 },
      end: { x: 50, y: 791.89 },
      thickness: 2,
      color: rgb(0, 128 / 255, 0),
    });

    // Draw right border
    page.drawLine({
      start: { x: 545.28, y: 50 },
      end: { x: 545.28, y: 791.89 },
      thickness: 2,
      color: rgb(0, 128 / 255, 0),
    });

    // Draw top border
    page.drawLine({
      start: { x: 50, y: 792 },
      end: { x: 545.28, y: 792 },
      thickness: 2,
      color: rgb(0, 128 / 255, 0),
    });
    // Draw bottom border
    page.drawLine({
      start: { x: 50, y: 50 },
      end: { x: 545.28, y: 50 },
      thickness: 2,
      color: rgb(0, 128 / 255, 0),
    });

    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const imageWidth = 250;
    const imageHeight = 250;
    const imageX = 175;
    const imageY = 841.89 - imageHeight - 50;
    page.drawImage(image, {
      x: imageX,
      y: imageY,
      width: imageWidth,
      height: imageHeight,
    });

    page.drawText(`${defaultPdfName}`, {
      x: 300 - defaultPdfName.length * 5,
      y: 580,
      size: 20,
      color: rgb(0, 128 / 255, 0),
    });

    const underlineY = 592 - 20; // 20 is the font size
    const underlineXStart = 305 - defaultPdfName.length * 5 - 5; // 5 is padding
    const underlineXEnd = 300 + defaultPdfName.length * 5 + 5; // 5 is padding

    page.drawLine({
      start: { x: underlineXStart, y: underlineY },
      end: { x: underlineXEnd, y: underlineY },
      thickness: 1,
      color: rgb(0, 128 / 255, 0),
    });

    const fields = [
      { label: "Course Code: ", value: courseCode },
      { label: "Course Title: ", value: courseTitle },
      { label: "Topic: ", value: topic, marginBottom: 15 },
      { label: "Submitted To: ", value: submittedTo, isBold: true },
      { label: "Teacher's Name: ", value: teacherName },
      { label: "Designation: ", value: Designation },
      { label: "Department: ", value: department },
      { label: "", value: universityName, marginBottom: 15 },
      { label: "Submitted By: ", value: submittedBy, isBold: true },
      { label: "Student Name: ", value: studentName },
      { label: "ID:", value: studentId },
      { label: "Section:", value: section },
      { label: "Department: ", value: studentDepartment },
      { label: "", value: universityName },
      { label: "Date of submission:", value: date, marginBottom: 10 },
    ];

    let yOffset = 0;
    fields.forEach(({ label, value, marginBottom = 0 }, index) => {
      const yPos = 600 - index * 28 - 100 - yOffset;

      if (marginBottom) {
        yOffset += marginBottom;
      }

      const labelY = yPos - 1;
      page.drawText(`${label}`, {
        x: 100,
        y: labelY,
        size: 15,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${value}`, {
        x: 100 + label.length * 8,
        y: yPos,
        size: 13,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "Assignment.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDropdownChange = (e) => {
    setDefaultPdfName(e.target.value);
  };

  return (
    <div className="section flex flex-col items-center justify-center h-full mt-4" id="pdf" >
      <h1 className="text-2xl lg:text-4xl font-semibold text-white"> <span className="text-purple-600">PLEASE FILL-UP</span> <span className="text-2xl lg:text-4xl">THE FORM</span></h1>
    
    <h1 className="text-2xl font-bold text-sky-500 mt-5"></h1>
    <div className="flex flex-col mb-4">
      <label htmlFor="pdfType" className="text-white">
        Select PDF Type:
      </label>
      <select
        id="pdfType"
        value={defaultPdfName}
        onChange={handleDropdownChange}
        className="block w-full py-2 px-20 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      >
        <option value="Assignment">Assignment</option>
        <option value="Lab Report">Lab Report</option>
      </select>
    </div>
    <div className="flex flex-col mb-3">
      <label htmlFor="courseCode" className='text-white'>Course Code:</label>
      <input
      placeholder='Enter Your Course code'
        type="text"
        id="courseCode"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        className=" block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white outline-none"
      />
    </div>
    <div className="flex flex-col mb-3">
      <label htmlFor="courseTitle" className='text-white'>Course Title:</label>
      <input
      placeholder='Enter Your Course title'
        type="text"
        id="courseTitle"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-3">
      <label htmlFor="courseTitle" className='text-white'>Topic:</label>
      <input
      placeholder='Enter the topic'
        type="text"
        id="courseTitle"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-3">
      
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="teacherName" className='text-white'>Teacher Name:</label>
      <input
      placeholder='Enter teacher Name'
        type="text"
        id="teacherName"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="teacherName" className='text-white'>Teacher Designation:</label>
      <input
      placeholder='Enter teacher Designation'
        type="text"
        id="Designation"
        value={Designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label  className='text-white' htmlFor="department">Teacher's Department:</label>
      <input
      placeholder='Enter Teacher Department'
        type="text"
        id="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white border-purple-700 outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="studentName"  className='text-white'>Student Name:</label>
      <input
      placeholder='Enter Your name'
        type="text"
        id="studentName"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border  rounded-lg text-sm placeholder-gray-500 text-white border-purple-700 outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="studentId"  className='text-white'>ID:</label>
      <input
      placeholder='Enter your student Id'
        type="text"
        id="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="studentId"  className='text-white'>Section:</label>
      <input
      placeholder='Enter your Section'
        type="text"
        id="studentId"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="studentDepartment" className='text-white'>Department:</label>
      <input
      placeholder='Enter your Department'
        type="text"
        id="studentDepartment"
        value={studentDepartment}
        onChange={(e) => setStudentDepartment(e.target.value)}
        className="block w-full py-2 px-12 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white  outline-none"
      />
    </div>
    <div className="flex flex-col mb-2">
      <label htmlFor="studentDepartment" className='text-white'>submisson date:</label>
      <input
      placeholder='Submission date'
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full py-2  px-16 h-11  bg-gray-800 border border-purple-700 rounded-lg text-sm placeholder-gray-500 text-white border-purple-700 outline-none"
      />
    </div>
    <div className=''>
    <button onClick={generatePDF} className="bg-purple-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
      Generate PDF
    </button>
    {pdfUrl && (
      <button onClick={handleDownload} className="mt-4 bg-white text-black hover:bg-sky-700 font-bold py-2 px-4 rounded">
        Download PDF
      </button>
    )}
    </div>
    
  </div>
);
};
  


export default Pdf;
