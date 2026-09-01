const supabaseUrl = 'https://jpalpbejjjburbisawka.supabase.co';
    const supabaseKey = 'sb_publishable_Vo4EjrV4dCYe2pA8cWSxzg_6lWrgFER';
    const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

    const form = document.getElementById('employeeForm');
    const messageBox = document.getElementById('message');
    const popupModal = document.getElementById('popupModal');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');
    const popupClose = document.getElementById('popupClose');
    const popupButton = document.getElementById('popupButton');
    const STORAGE_KEY = 'employeeFormDraft';

    function saveDraft() {
      const formData = new FormData(form);
      const employee = Object.fromEntries(formData.entries());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employee));
    }

    function restoreDraft() {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (!draft) return;

      try {
        const employee = JSON.parse(draft);
        Object.entries(employee).forEach(([key, value]) => {
          const field = form.elements.namedItem(key);
          if (field && typeof value !== 'undefined') {
            field.value = value;
          }
        });
      } catch (err) {
        console.warn('Could not restore saved form draft:', err);
      }
    }

    function showMessage(text, type) {
      messageBox.textContent = text;
      messageBox.className = 'message ' + type;
    }

    function showPopup(title, text, type) {
      popupTitle.textContent = title;
      popupText.textContent = text;
      popupModal.classList.add(type);
      popupModal.style.display = 'flex';
    }

    function hidePopup() {
      popupModal.classList.remove('success', 'error');
      popupModal.style.display = 'none';
    }

    popupClose.addEventListener('click', hidePopup);
    popupButton.addEventListener('click', hidePopup);
    form.addEventListener('input', saveDraft);
    form.addEventListener('change', saveDraft);
    restoreDraft();

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      saveDraft();

      const formData = new FormData(form);
      const employee = Object.fromEntries(formData.entries());

      try {
        const { data, error } = await supabaseClient
          .from('employees')
          .insert([employee])
          .select();

        if (error) {
          throw error;
        }

        localStorage.removeItem(STORAGE_KEY);
        showMessage('Employee details saved successfully!', 'success');
        showPopup('Success', 'Employee details saved successfully!', 'success');
        form.reset();
        console.log('Saved employee:', data);
      } catch (err) {
        console.error(err);
        const errorMessage = err.message || 'Failed to save employee details. Please check your Supabase setup.';
        saveDraft();
        showMessage('Error: ' + errorMessage + ' Data has been saved locally. Please retry.', 'error');
        showPopup('Error', errorMessage + ' Your form data has been saved locally and will be restored when you reload the page.', 'error');
      }
    });