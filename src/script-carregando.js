
setTimeout(() => {
    document.getElementById('main').style.display = 'none';
    
  }, );
  

  setTimeout(() => {
    document.getElementById('main').style.display = 'block'; 
    console.log("5 segundos após o carregamento da página");
    onclick = () => {
      const som = document.getElementById('meuSomclick');
      som.currentTime = 0;
      som.play();
    }
  }, 4000);

  setTimeout(() => {
    document.getElementById('main-loader').style.display = 'none'; 
    console.log("5 segundos após o carregamento da página");
    const som = document.getElementById('meuSomIniciar');
    som.currentTime = 0; 
    som.play();
  }, 4000);

  setTimeout(() => {
    document.getElementById('OldNotesTaref').style.display = 'none';
  }, 1);
