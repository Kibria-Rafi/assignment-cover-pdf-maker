import  { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const Pdf = () => {
  
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

  const universityName = "Daffodil International University";
  const defaultPdfName = "Assignment";
  const imageUrl = "https://i.ibb.co/NpWxfLV/74e499e046c0b7f26dafbe8d3b3ca0a9.png"; 

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); 

    
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
      x: 300 - (defaultPdfName.length * 5), 
      y: 580, 
      size: 20,
      color: rgb(255 / 255, 165 / 255, 0),
    });

   
    const fields = [
      { label: 'Course Code: ', value: courseCode },
      { label: 'Course Title: ', value: courseTitle, marginBottom: 20 }, 
      { label: 'Submitted To: ', value: submittedTo, isBold: true }, 
      { label: "Teacher's Name: ", value: teacherName },
      { label: 'Department: ', value: department },
      { label: '', value: universityName, marginBottom: 20 },
      { label: 'Submitted By: ', value: submittedBy, isBold: true }, 
      { label: 'Student Name: ', value: studentName },
      { label: 'ID:', value: studentId },
      { label: 'Department: ', value: studentDepartment },
      { label: '', value: universityName },
    ];

   
    let yOffset = 0;
    fields.forEach(({ label, value, marginBottom = 0, }, index) => {
      const yPos = 600 - index * 30 - 100 - yOffset; 

      if (marginBottom) {
        
        yOffset += marginBottom;
      }

      
      const labelY = yPos - 1;
      page.drawText(`${label}`, {
        x: 100,
        y: labelY,
        size: 20,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${value}`, {
        x: 100 + label.length*10, 
        y: yPos,
        size: 15,
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-sky-500">Create Your Own coverpage</h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="courseCode" className='text-white'>Course Code:</label>
        <input
        placeholder='Enter Your Course code'
          type="text"
          id="courseCode"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="courseTitle" className='text-white'>Course Title:</label>
        <input
        placeholder='Enter Your Course title'
          type="text"
          id="courseTitle"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
        
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="teacherName" className='text-white'>Teacher Name:</label>
        <input
        placeholder='Enter teacher Name'
          type="text"
          id="teacherName"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label  className='text-white' htmlFor="department">Department:</label>
        <input
        placeholder='Enter Department'
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="studentName"  className='text-white'>Student Name:</label>
        <input
        placeholder='Enter Your name'
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="studentId"  className='text-white'>ID:</label>
        <input
        placeholder='Enter your student Id'
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="studentDepartment" className='text-white'>Department:</label>
        <input
        placeholder='Enter your Department'
          type="text"
          id="studentDepartment"
          value={studentDepartment}
          onChange={(e) => setStudentDepartment(e.target.value)}
          className="border-gray-400 border-2 rounded-md px-2 py-1"
        />
      </div>
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button>
      {pdfUrl && (
        <button onClick={handleDownload} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Download PDF
        </button>
      )}
      <span className='text-sky-700'>Developed by G.M. Kibria Rafi</span>
    </div>
  );
};

export default Pdf;
