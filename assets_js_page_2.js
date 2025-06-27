document.addEventListener('DOMContentLoaded', function() {
  // Feature-to-field mapping
  const fieldMap = {
    voiceBots: { label: 'Total voice bot minutes per month', unit: 'minutes' },
    digitalBots: { label: 'Total digital bot sessions per month', unit: 'sessions' },
    virtualAgent: { label: 'Total virtual agent sessions per month', unit: 'sessions' },
    agentCopilot: { label: 'Number of concurrent Agent Copilot users', unit: 'users' },
    aiTranslate: { label: 'Total translations per month', unit: 'translations' },
    speechNamed: { label: 'Number of named analytics users', unit: 'users' },
    speechConcurrent: { label: 'Number of concurrent analytics users', unit: 'users' },
    aiScoring: { label: 'Total AI scoring evaluations per month', unit: 'evaluations' },
    aiSummary: { label: 'Total AI summaries & insights per month', unit: 'summaries' },
    predictiveEngagement: { label: 'Total predictive engagement events per month', unit: 'events' },
    predictiveRouting: { label: 'Total predictive routing interactions per month', unit: 'interactions' },
    facebookMessenger: { label: 'Total Facebook Messenger messages per month', unit: 'messages' },
    instagramDM: { label: 'Total Instagram direct messages per month', unit: 'messages' },
    whatsappMessaging: { label: 'Total WhatsApp messages per month', unit: 'messages' },
    xDM: { label: 'Total X direct messages per month', unit: 'messages' },
    socialPosts: { label: 'Total social posts per month', unit: 'posts' }
  };

  // Get selected features from localStorage
  const selected = JSON.parse(localStorage.getItem('selectedFeatures') || '[]');
  const container = document.getElementById('fieldsContainer');

  // Create input fields
  selected.forEach(feature => {
    const info = fieldMap[feature];
    if (!info) return;

    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'input-field';

    const label = document.createElement('label');
    label.htmlFor = feature;
    label.textContent = `${info.label} (` + info.unit + `): `;

    const input = document.createElement('input');
    input.type = 'number';
    input.id = feature;
    input.name = feature;
    input.min = '0';
    input.required = true;

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    container.appendChild(fieldWrapper);
  });

  // On Calculate, gather inputs, save, and redirect
  const calcBtn = document.getElementById('calculateBtn');
  calcBtn.addEventListener('click', function() {
    const values = {};
    let allFilled = true;

    selected.forEach(feature => {
      const input = document.getElementById(feature);
      const val = parseFloat(input.value);
      if (isNaN(val)) {
        allFilled = false;
        input.classList.add('error');
      } else {
        values[feature] = val;
      }
    });

    if (!allFilled) {
      alert('Please fill in all fields before proceeding.');
      return;
    }

    localStorage.setItem('featureInputs', JSON.stringify(values));
    window.location.href = 'summary.html';
  });
});
