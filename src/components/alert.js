export const waitForAlert = () => {
  return new Promise((resolve) => {
    const alert = document.querySelector('.alert');
    const alertBtnContainer = alert.querySelector('.alert-btn-container');
    alert.style.display = 'block';

    const handleClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return; 

      // 이벤트 리스너 정리 (중복 실행 방지)
      alertBtnContainer.removeEventListener('click', handleClick);

      alert.style.display = 'none';
      
      const isConfirmed = btn.dataset.return === 'true';
      resolve(isConfirmed); 
    };

    alertBtnContainer.addEventListener('click', handleClick);
  });
};