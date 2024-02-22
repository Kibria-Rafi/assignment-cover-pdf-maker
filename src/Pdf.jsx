import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Link } from 'react-router-dom';

const Pdf = () => {

  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [topic, setTopic] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [submittedTo, setSubmittedTo] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [department, setDepartment] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [defaultPdfName, setDefaultPdfName] = useState('Assignment'); // Default PDF name state

  const universityName = 'Daffodil International University';
  const imageUrl = 'https://i.ibb.co/NpWxfLV/74e499e046c0b7f26dafbe8d3b3ca0a9.png';

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
      { label: 'Course Code: ', value: courseCode },
      { label: 'Course Title: ', value: courseTitle},
      { label: 'Topic: ', value: topic, marginBottom: 15  },
      { label: 'Submitted To: ', value: submittedTo, isBold: true },
      { label: "Teacher's Name: ", value: teacherName },
      { label: 'Department: ', value: department },
      { label: '', value: universityName, marginBottom: 15 },
      { label: 'Submitted By: ', value: submittedBy, isBold: true },
      { label: 'Student Name: ', value: studentName },
      { label: 'ID:', value: studentId },
      { label: 'Section:', value: section },
      { label: 'Department: ', value: studentDepartment },
      { label: '', value: universityName },
      { label: 'Date of submission:', value: date ,marginBottom: 10},
    ];

    let yOffset = 0;
    fields.forEach(({ label, value, marginBottom = 0 }, index) => {
      const yPos = 600- index * 28 - 100 - yOffset;

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
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'Assignment.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDropdownChange = (e) => {
    setDefaultPdfName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full" >
      <div className="navbar bg-sky-700 text-neutral-content shadow-xl">
      <h1 className="text-xl font-bold text-white">Create Your Own coverpage</h1>
</div>
      <h1 className="text-2xl font-bold text-sky-500 mt-5"></h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="pdfType" className="text-white">
          Select PDF Type:
        </label>
        <select
          id="pdfType"
          value={defaultPdfName}
          onChange={handleDropdownChange}
          className="border-green-400 border-2 rounded-md px-16 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label  className='text-white' htmlFor="department">Department:</label>
        <input
        placeholder='Enter Department'
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-5 py-1"
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
          className="border-green-400 border-2 rounded-md px-10 py-1"
        />
      </div>
      <div className='mb-5'>
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button>
      {pdfUrl && (
        <button onClick={handleDownload} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Download PDF
        </button>
      )}
      </div>
      
      <footer className="footer items-center p-4 bg-sky-700 text-neutral-content">
  <aside className="items-center grid-flow-col">
    <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> 
    <p>Copyright © 2024 - All right reserved by Kibria Rafi</p>
  </aside> 
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
     
  </nav>
</footer>
    </div>
  );
};

export default Pdf;
