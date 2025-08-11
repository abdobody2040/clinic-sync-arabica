
export const generatePrescriptionPDF = (prescriptionData: any, settings: any) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to generate PDF');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Prescription</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        .prescription-container {
          max-width: 800px;
          margin: 0 auto;
          border: 2px solid #000;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .clinic-name {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 5px;
        }
        .doctor-info {
          font-size: 16px;
          color: #666;
        }
        .prescription-title {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
          text-decoration: underline;
        }
        .patient-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          background-color: #f5f5f5;
          padding: 10px;
          border-radius: 5px;
        }
        .diagnosis-section {
          margin-bottom: 20px;
        }
        .diagnosis-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .medications-section {
          margin-bottom: 20px;
        }
        .medications-title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        .medication-item {
          border: 1px solid #ddd;
          margin-bottom: 10px;
          padding: 10px;
          background-color: #fafafa;
        }
        .medication-name {
          font-weight: bold;
          font-size: 16px;
          color: #1e40af;
        }
        .medication-details {
          margin-top: 5px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .instructions-section {
          margin-top: 20px;
          padding: 10px;
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
        }
        .footer {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #000;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .signature-section {
          margin-top: 40px;
          text-align: right;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          width: 200px;
          margin: 20px 0 5px auto;
        }
        @media print {
          body { margin: 0; }
          .prescription-container { border: none; }
        }
      </style>
    </head>
    <body>
      <div class="prescription-container">
        <!-- Header -->
        <div class="header">
          <div class="clinic-name">${settings.clinicName || 'Medical Clinic'}</div>
          <div class="doctor-info">Dr. ${prescriptionData.doctorName}</div>
          <div class="doctor-info">Date: ${prescriptionData.date}</div>
        </div>

        <div class="prescription-title">PRESCRIPTION</div>

        <!-- Patient Information -->
        <div class="patient-info">
          <div><strong>Patient:</strong> ${prescriptionData.patientName}</div>
          <div><strong>Age:</strong> ${prescriptionData.patientAge}</div>
          <div><strong>Gender:</strong> ${prescriptionData.patientGender}</div>
        </div>

        <!-- Diagnosis -->
        ${prescriptionData.diagnosis ? `
        <div class="diagnosis-section">
          <div class="diagnosis-title">Diagnosis:</div>
          <div>${prescriptionData.diagnosis}</div>
        </div>
        ` : ''}

        <!-- Medications -->
        <div class="medications-section">
          <div class="medications-title">Rx</div>
          ${prescriptionData.medications.map((med: any, index: number) => `
            <div class="medication-item">
              <div class="medication-name">${index + 1}. ${med.name}</div>
              <div class="medication-details">
                <div><strong>Dosage:</strong> ${med.dosage}</div>
                <div><strong>Frequency:</strong> ${med.frequency}</div>
                <div><strong>Duration:</strong> ${med.duration}</div>
                ${med.instructions ? `<div><strong>Instructions:</strong> ${med.instructions}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- General Instructions -->
        ${prescriptionData.generalInstructions ? `
        <div class="instructions-section">
          <strong>General Instructions:</strong><br>
          ${prescriptionData.generalInstructions}
        </div>
        ` : ''}

        <!-- Signature -->
        <div class="signature-section">
          <div class="signature-line"></div>
          <div>Dr. ${prescriptionData.doctorName}</div>
          <div>Medical License: ${prescriptionData.licenseNumber || 'DEMO-LICENSE'}</div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div>This prescription is generated electronically and is valid without signature</div>
          <div>${settings.clinicName || 'Medical Clinic'} - Digital Health Solutions</div>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
