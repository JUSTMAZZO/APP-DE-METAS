// Referência aos elementos da interface
const inputNovaMeta = document.getElementById('nova-meta');
const btnAdicionarMeta = document.getElementById('adicionar-meta');
const listaDeMetas = document.getElementById('lista-de-metas');

// Lista de metas inicial
let metas = [];

// Carregar as metas existentes no início (se houver)
const carregarMetas = () => {
    const metasSalvas = localStorage.getItem('metas');
    if (metasSalvas) {
        metas = JSON.parse(metasSalvas);
        renderizarMetas();
    }
};

// Salvar metas no localStorage
const salvarMetas = () => {
    localStorage.setItem('metas', JSON.stringify(metas));
};

// Adicionar uma nova meta
btnAdicionarMeta.addEventListener('click', () => {
    const valorMeta = inputNovaMeta.value.trim();
    if (valorMeta) {
        metas.push({ value: valorMeta, checked: false });
        inputNovaMeta.value = '';
        salvarMetas();
        renderizarMetas();
    }
});

// Renderizar metas na interface
const renderizarMetas = () => {
    listaDeMetas.innerHTML = '';
    metas.forEach((meta, index) => {
        const li = document.createElement('li');
        li.className = 'meta';

        // Texto da meta
        const metaTexto = document.createElement('span');
        metaTexto.textContent = meta.value;
        metaTexto.style.textDecoration = meta.checked ? 'line-through' : 'none';

        // Ações para cada meta
        const actions = document.createElement('div');
        actions.className = 'actions';

        // Botão para marcar como concluída
        const btnCheck = document.createElement('button');
        btnCheck.textContent = meta.checked ? 'Desmarcar' : 'Concluir';
        btnCheck.style.color = meta.checked ? 'orange' : 'green';
        btnCheck.addEventListener('click', () => {
            metas[index].checked = !metas[index].checked;
            salvarMetas();
            renderizarMetas();
        });

        // Botão para editar meta
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', () => {
            const novoValor = prompt('Edite a meta:', meta.value);
            if (novoValor !== null && novoValor.trim() !== '') {
                metas[index].value = novoValor.trim();
                salvarMetas();
                renderizarMetas();
            }
        });

        // Botão para deletar meta
        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Excluir';
        btnDelete.style.color = 'red';
        btnDelete.addEventListener('click', () => {
            metas.splice(index, 1);
            salvarMetas();
            renderizarMetas();
        });

        // Adicionar botões às ações e à lista
        actions.appendChild(btnCheck);
        actions.appendChild(btnEdit);
        actions.appendChild(btnDelete);
        li.appendChild(metaTexto);
        li.appendChild(actions);
        listaDeMetas.appendChild(li);
    });
};

// Carregar e exibir metas no início
carregarMetas();
