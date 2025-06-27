document.addEventListener('DOMContentLoaded', function() {
  // Retrieve usage inputs
  const inputs = JSON.parse(localStorage.getItem('featureInputs') || '{}');

  // Mapping for display labels
  const featureLabels = {
    voiceBots: 'Voice Bots',
    digitalBots: 'Digital Bots',
    virtualAgent: 'Virtual Agent',
    agentCopilot: 'Agent Copilot',
    aiTranslate: 'AI Translate',
    speechNamed: 'Speech & Text Analytics – Named',
    speechConcurrent: 'Speech & Text Analytics – Concurrent',
    aiScoring: 'AI Scoring',
    aiSummary: 'AI Summary & Insights',
    predictiveEngagement: 'Predictive Engagement',
    predictiveRouting: 'Predictive Routing',
    facebookMessenger: 'Facebook Messenger',
    instagramDM: 'Instagram DM',
    whatsappMessaging: 'WhatsApp Messaging',
    xDM: 'X (Twitter) DM',
    socialPosts: 'Social Posts'
  };

  // Token calculation formulas
  const tokenCalc = {
    voiceBots: val => Math.ceil(val / 17),
    digitalBots: val => Math.ceil(val / 51),
    virtualAgent: val => Math.ceil(val / 2),
    agentCopilot: val => val * 60,
    aiTranslate: val => Math.ceil(val / 2),
    speechNamed: val => val * 30,
    speechConcurrent: val => val * 45,
    aiScoring: val => Math.ceil(val / 20),
    aiSummary: val => Math.ceil(val / 50),
    predictiveEngagement: val => Math.ceil(val / 4000),
    predictiveRouting: val => Math.ceil(val / 17),
    facebookMessenger: val => Math.ceil(val / 200),
    instagramDM: val => Math.ceil(val / 200),
    whatsappMessaging: val => Math.ceil(val / 200),
    xDM: val => Math.ceil(val / 200),
    socialPosts: val => Math.ceil(val / 200)
  };

  // Calculate tokens and render table
  const breakdownDiv = document.getElementById('breakdown');
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Feature</th>
        <th>Usage</th>
        <th>Tokens</th>
      </tr>
    </thead>
    <tbody></tbody>
    <tfoot>
      <tr>
        <th colspan="2">Total Tokens</th>
        <th id="totalTokens"></th>
      </tr>
    </tfoot>
  `;
  breakdownDiv.appendChild(table);

  const tbody = table.querySelector('tbody');
  let total = 0;

  for (const [feature, value] of Object.entries(inputs)) {
    const tokens = tokenCalc[feature](value);
    total += tokens;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${featureLabels[feature] || feature}</td>
      <td>${value}</td>
      <td>${tokens}</td>
    `;
    tbody.appendChild(row);
  }

  document.getElementById('totalTokens').textContent = total;

  // Function to generate PDF
  function generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('AI Token Usage Summary', 14, 22);

    doc.setFontSize(12);
    let yPos = 32;
    // Table header
    doc.text('Feature', 14, yPos);
    doc.text('Usage', 90, yPos);
    doc.text('Tokens', 150, yPos);
    yPos += 6;

    // Table rows
    for (const [feature, value] of Object.entries(inputs)) {
      const tokens = tokenCalc[feature](value);
      doc.text(featureLabels[feature] || feature, 14, yPos);
      doc.text(String(value), 90, yPos);
      doc.text(String(tokens), 150, yPos);
      yPos += 6;
    }

    // Total
    yPos += 4;
    doc.text('Total Tokens: ' + total, 14, yPos);

    // Return Blob for emailing
    return doc.output('blob');
  }

  // Stub for sending report
  function sendReport(name, email, pdfBlob) {
    // TODO: integrate with backend or HubSpot API
    alert(`Report PDF ready to be sent to ${email}`);
    console.log('Stub sendReport called with', { name, email, pdfBlob });
  }

  // Handle Send Report button
  const sendBtn = document.getElementById('sendReportBtn');
  sendBtn.addEventListener('click', function() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    if (!name || !email) {
      alert('Please enter your name and business email.');
      return;
    }
    const pdfBlob = generatePdf();
    sendReport(name, email, pdfBlob);
  });
});
