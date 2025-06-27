document.addEventListener('DOMContentLoaded', function() {
  // Toggle submenus when theme checkboxes change
  const themeCheckboxes = document.querySelectorAll('input[id^="theme"]');
  themeCheckboxes.forEach(themeCheckbox => {
    themeCheckbox.addEventListener('change', function() {
      const themeKey = this.value; // e.g. 'bots', 'assistance', etc.
      const submenu = document.getElementById(`submenu-${themeKey}`);
      if (submenu) {
        submenu.classList.toggle('visible', this.checked);
      }
    });
  });

  // On Next button click, store selected features and navigate to page2.html
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', function() {
    const selectedFeatures = Array.from(
      document.querySelectorAll('.submenu input[type="checkbox"]:checked')
    ).map(cb => cb.value);

    // Save to localStorage
    localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));

    // Redirect to Page 2
    window.location.href = 'page2.html';
  });
});
