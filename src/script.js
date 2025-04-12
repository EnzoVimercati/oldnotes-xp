const inpLista = document.getElementById('inpLista');
const inpListaTitle = document.getElementById('inpListaTitle');
const btnAdicionar = document.getElementById('btnAdicionar');
const CriarNota = document.getElementById('CriarNota');
const container = document.getElementById('listaContainer');
const corNota = document.getElementById('corNota');
const fecharmain = document.getElementById('fecharmain');


let listas = [];

document.getElementById('Main-criar').style.display = 'none';

CriarNota.onclick = () => {
  document.getElementById('OldNotesTaref').style.display = '';
  const som = document.getElementById('meuSomclick');
  som.currentTime = 0;
  som.play();
  document.getElementById('Main-criar').style.display = 'block';
};

btnAdicionar.onclick = () => {
  const titulo = inpListaTitle.value.trim();
  const primeiroItem = inpLista.value.trim();
  const cor = corNota.value;

  if (titulo === '') {
    const som = document.getElementById('meuSomError');
    som.currentTime = 0;
    som.play();
    mostrarErro('Título vazio!');
    return;
  }

  if (primeiroItem === '') {
    const som = document.getElementById('meuSomError');
    som.currentTime = 0;
    som.play();
    mostrarErro('Adicione pelo menos um item!');
    return;
  }

  const som = document.getElementById('meuSomConcluido');
  som.currentTime = 0;
  som.play();
 
  listas.push({
    titulo: titulo,
    itens: [{ texto: primeiroItem, concluido: false }],
    cor: cor,
    top: 160 + listas.length * 30,
    left: 540 + listas.length * 30,
    dataCriada: new Date()
  });

  inpLista.value = '';
  inpListaTitle.value = '';
  corNota.value = '#ffff88';
  

  mostrarListas();
};

function mostrarListas() {
  container.innerHTML = '';

  listas.forEach((lista, index) => {
    lista.itens = lista.itens.map(item =>
      typeof item === 'string' ? { texto: item, concluido: false } : item
    );

    const bloco = document.createElement('div');
    bloco.classList.add('bloco-lista');
    bloco.style.top = `${lista.top}px`;
    bloco.style.left = `${lista.left}px`;
    bloco.style.backgroundColor = lista.cor || '#ffff88';

    let isDragging = false;
    let modoEdicao = false;
    let modoRemocao = false;

    bloco.addEventListener('mousedown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

      e.preventDefault();
      isDragging = true;
      const shiftX = e.clientX - bloco.offsetLeft;
      const shiftY = e.clientY - bloco.offsetTop;

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const newLeft = e.pageX - shiftX;
        const newTop = e.pageY - shiftY;
        bloco.style.left = `${newLeft}px`;
        bloco.style.top = `${newTop}px`;
        listas[index].left = newLeft;
        listas[index].top = newTop;
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    bloco.ondragstart = () => false;

    const btnFechar = document.createElement('button');
    btnFechar.classList.add('btnfechar');
    btnFechar.textContent = '✕';
    btnFechar.onclick = () => {
      const som = document.getElementById('meuSomfechar');
      som.currentTime = 0;
      som.play();
      listas.splice(index, 1);
      mostrarListas();
    };
    bloco.appendChild(btnFechar);

    const h3 = document.createElement('h3');
    h3.textContent = lista.titulo;
    bloco.appendChild(h3);

    const mainNotes = document.createElement('div');
    mainNotes.classList.add('main-notes');

    const divBotoes = document.createElement('div');
    divBotoes.classList.add('botoesdalista');

    const btnToggleEdicao = document.createElement('button');
    btnToggleEdicao.textContent = 'Editar nota';
    btnToggleEdicao.classList.add('btnlistaeditar');
    btnToggleEdicao.onclick = () => {
      modoEdicao = !modoEdicao;
      btnToggleEdicao.textContent = modoEdicao ? 'Finalizar edição' : 'Editar nota';
      const som = document.getElementById('meuSomclick');
      som.currentTime = 0;
      som.play();
      if (modoEdicao) {
        modoRemocao = false;
        btnRemoverItem.textContent = 'Remover itens';
      }
    };
    divBotoes.appendChild(btnToggleEdicao);

    const btnRemoverItem = document.createElement('button');
    btnRemoverItem.textContent = 'Remover itens';
    btnRemoverItem.classList.add('btnlistaremover');
    btnRemoverItem.onclick = () => {
      modoRemocao = !modoRemocao;
      btnRemoverItem.textContent = modoRemocao ? 'Cancelar remoção' : 'Remover itens';
      const som = document.getElementById('meuSomclick');
      som.currentTime = 0;
      som.play();
      if (modoRemocao) {
        modoEdicao = false;
        btnToggleEdicao.textContent = 'Editar nota';
      }
    };
    divBotoes.appendChild(btnRemoverItem);
    mainNotes.appendChild(divBotoes);

    const ul = document.createElement('ul');
    lista.itens.forEach((item, indexItem) => {
      const li = document.createElement('li');

      // Troca o checkbox por um radio button
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.checked = item.concluido;
      radio.onchange = () => {
        listas[index].itens[indexItem].concluido = radio.checked;
        mostrarListas();
      };
      const span = document.createElement('span');
      span.textContent = item.texto;
      span.style.marginLeft = '8px';
      if (item.concluido) {
        span.style.textDecoration = 'line-through';
        span.style.color = '#555';
      }

      span.onclick = () => {
        if (modoEdicao) {
          const novoTexto = prompt('Editar item:', lista.itens[indexItem].texto);
          if (novoTexto !== null && novoTexto.trim() !== '') {
            listas[index].itens[indexItem].texto = novoTexto.trim();
            mostrarListas();
          }
        } else if (modoRemocao) {
          if (confirm('Deseja remover este item?')) {
            listas[index].itens.splice(indexItem, 1);
            mostrarListas();
          }
        }
      };

      li.appendChild(radio);
      li.appendChild(span);
      ul.appendChild(li);
    });
    mainNotes.appendChild(ul);

    const inputNovoItem = document.createElement('input');
    inputNovoItem.placeholder = 'Novo item';

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Adicionar';
    btnAdd.onclick = () => {
      const som = document.getElementById('meuSomclick');
      som.currentTime = 0;
      som.play();
      const valor = inputNovoItem.value.trim();
      if (valor !== '') {
        listas[index].itens.push({ texto: valor, concluido: false });
        mostrarListas();
      }
    };

    mainNotes.appendChild(inputNovoItem);
    mainNotes.appendChild(btnAdd);

    const dataDiv = document.createElement('div');
    dataDiv.classList.add('data-notas');
    dataDiv.textContent = new Date(lista.dataCriada).toLocaleDateString();

    bloco.appendChild(mainNotes);
    bloco.appendChild(dataDiv);
    container.appendChild(bloco);
  });
}

function mostrarErro(mensagem = 'Ocorreu um erro.') {
  const erro = document.getElementById('xp-erro');
  erro.querySelector('.xp-mensagem').textContent = mensagem;
  erro.style.display = 'block';
  document.getElementById('meuSomError').play();
}

function fecharErro() {
  document.getElementById('xp-erro').style.display = 'none';
}

function atualizarRelogio() {
  const agora = new Date();
  const horas = agora.getHours().toString().padStart(2, '0');
  const minutos = agora.getMinutes().toString().padStart(2, '0');
  document.getElementById('relogio').textContent = `${horas}:${minutos}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

fecharmain.onclick = () => {
  document.getElementById('OldNotesTaref').style.display = 'none';
  document.getElementById('Main-criar').style.display = 'none';
  const som = document.getElementById('meuSomfechar');
  som.currentTime = 0;
  som.play();
}

