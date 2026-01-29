// Configuração da API
const API_BASE_URL = 'https://todo-api-28fl.onrender.com/api/tarefas';

// Estado da aplicação
let tarefas = [];
let filtroAtual = 'todas';
let termoBusca = '';

// Elementos do DOM
const tarefaForm = document.getElementById('tarefaForm');
const listaTarefas = document.getElementById('listaTarefas');
const loading = document.getElementById('loading');
const mensagemErro = document.getElementById('mensagemErro');
const semTarefas = document.getElementById('semTarefas');
const contadorTarefas = document.getElementById('contadorTarefas');
const buscaInput = document.getElementById('buscaInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const modalEditar = document.getElementById('modalEditar');
const formEditar = document.getElementById('formEditar');
const fecharModal = document.getElementById('fecharModal');
const cancelarEdicao = document.getElementById('cancelarEdicao');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    // Formulário de criação
    tarefaForm.addEventListener('submit', criarTarefa);

    // Busca
    buscaInput.addEventListener('input', (e) => {
        termoBusca = e.target.value.toLowerCase();
        renderizarTarefas();
    });

    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroAtual = btn.dataset.filter;
            renderizarTarefas();
        });
    });

    // Modal
    fecharModal.addEventListener('click', fecharModalEdicao);
    cancelarEdicao.addEventListener('click', fecharModalEdicao);
    formEditar.addEventListener('submit', salvarEdicao);

    // Fechar modal ao clicar fora
    modalEditar.addEventListener('click', (e) => {
        if (e.target === modalEditar) {
            fecharModalEdicao();
        }
    });
}

// Funções de API
async function carregarTarefas() {
    mostrarLoading(true);
    esconderErro();

    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            // Se não conseguir parsear JSON, usar o texto da resposta
            const text = await response.text();
            throw new Error(`Resposta inválida do servidor: ${text || response.statusText}`);
        }
        
        tarefas = data.tarefas || [];
        renderizarTarefas();
    } catch (error) {
        // Tratamento específico para diferentes tipos de erro
        let mensagemErro = 'Erro ao carregar tarefas: ';
        
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            const apiUrl = API_BASE_URL.replace('/tarefas', '');
            mensagemErro += `Não foi possível conectar à API. Verifique se o servidor está rodando em ${apiUrl}`;
        } else if (error.message.includes('NetworkError') || error.message.includes('network')) {
            mensagemErro += 'Erro de rede. Verifique sua conexão e se a API está acessível.';
        } else {
            mensagemErro += error.message;
        }
        
        mostrarErro(mensagemErro);
        console.error('Erro ao carregar tarefas:', error);
    } finally {
        mostrarLoading(false);
    }
}

async function criarTarefa(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const titulo = formData.get('titulo');
    const descricao = formData.get('descricao');
    const status = formData.get('status');
    
    const novaTarefa = {
        titulo: titulo ? titulo.trim() : '',
        descricao: descricao ? descricao.trim() : '',
        status: status || 'a fazer'
    };

    if (!novaTarefa.titulo || novaTarefa.titulo.trim() === '') {
        mostrarErro('O título é obrigatório e não pode estar vazio!');
        return;
    }
    
    if (novaTarefa.titulo.trim().length < 1) {
        mostrarErro('O título deve ter pelo menos 1 caractere!');
        return;
    }

    mostrarLoading(true);
    esconderErro();

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTarefa)
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            // Se não conseguir parsear JSON, usar o texto da resposta
            const text = await response.text();
            throw new Error(`Resposta inválida do servidor: ${text || response.statusText}`);
        }

        if (!response.ok) {
            throw new Error(data.mensagem || data.erro || `Erro ${response.status}: ${response.statusText}`);
        }

        // Limpar formulário
        tarefaForm.reset();
        
        // Recarregar tarefas
        await carregarTarefas();
        
        // Mostrar mensagem de sucesso
        mostrarMensagemSucesso('Tarefa criada com sucesso!');
    } catch (error) {
        // Tratamento específico para diferentes tipos de erro
        let mensagemErro = 'Erro ao criar tarefa: ';
        
        if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
            const apiUrl = API_BASE_URL.replace('/tarefas', '');
            mensagemErro += `Não foi possível conectar à API. Verifique se o servidor está rodando em ${apiUrl}`;
        } else if (error.message.includes('NetworkError') || error.message.includes('network')) {
            mensagemErro += 'Erro de rede. Verifique sua conexão e se a API está acessível.';
        } else {
            mensagemErro += error.message;
        }
        
        mostrarErro(mensagemErro);
        console.error('Erro ao criar tarefa:', error);
    } finally {
        mostrarLoading(false);
    }
}

async function atualizarTarefa(id, dados) {
    mostrarLoading(true);
    esconderErro();

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || `Erro ${response.status}`);
        }

        await carregarTarefas();
        mostrarMensagemSucesso('Tarefa atualizada com sucesso!');
    } catch (error) {
        mostrarErro(`Erro ao atualizar tarefa: ${error.message}`);
        console.error('Erro ao atualizar tarefa:', error);
    } finally {
        mostrarLoading(false);
    }
}

// Função global para atualizar status (chamada inline no HTML)
window.atualizarStatusTarefa = async function(id, novoStatus) {
    await atualizarStatus(id, novoStatus);
};

async function atualizarStatus(id, novoStatus) {
    mostrarLoading(true);
    esconderErro();

    try {
        const response = await fetch(`${API_BASE_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: novoStatus })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || `Erro ${response.status}`);
        }

        await carregarTarefas();
    } catch (error) {
        mostrarErro(`Erro ao atualizar status: ${error.message}`);
        console.error('Erro ao atualizar status:', error);
    } finally {
        mostrarLoading(false);
    }
}

async function deletarTarefa(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return;
    }

    mostrarLoading(true);
    esconderErro();

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || `Erro ${response.status}`);
        }

        await carregarTarefas();
        mostrarMensagemSucesso('Tarefa excluída com sucesso!');
    } catch (error) {
        mostrarErro(`Erro ao excluir tarefa: ${error.message}`);
        console.error('Erro ao excluir tarefa:', error);
    } finally {
        mostrarLoading(false);
    }
}

// Funções de renderização
function renderizarTarefas() {
    const tarefasFiltradas = filtrarTarefas();
    
    listaTarefas.innerHTML = '';
    
    atualizarContador(tarefasFiltradas.length);

    if (tarefasFiltradas.length === 0) {
        semTarefas.style.display = 'block';
        return;
    }

    semTarefas.style.display = 'none';

    tarefasFiltradas.forEach(tarefa => {
        const card = criarCardTarefa(tarefa);
        listaTarefas.appendChild(card);
    });
}

function filtrarTarefas() {
    let filtradas = tarefas;

    // Aplicar filtro de status
    if (filtroAtual !== 'todas') {
        filtradas = filtradas.filter(t => t.status === filtroAtual);
    }

    // Aplicar busca
    if (termoBusca) {
        filtradas = filtradas.filter(t => 
            t.titulo.toLowerCase().includes(termoBusca) ||
            (t.descricao && t.descricao.toLowerCase().includes(termoBusca))
        );
    }

    return filtradas;
}

function criarCardTarefa(tarefa) {
    const card = document.createElement('div');
    card.className = `tarefa-card ${tarefa.status === 'concluída' ? 'concluida' : ''}`;
    
    const dataFormatada = formatarData(tarefa.createdAt);
    const statusClass = tarefa.status.replace(' ', '-');

    card.innerHTML = `
        <div class="tarefa-header">
            <h3 class="tarefa-titulo">${escaparHtml(tarefa.titulo)}</h3>
            <div class="tarefa-acoes">
                <button class="btn btn-success btn-small" onclick="abrirModalEdicao(${tarefa.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-small" onclick="deletarTarefaGlobal(${tarefa.id})">
                    🗑️ Excluir
                </button>
            </div>
        </div>
        ${tarefa.descricao ? `<p class="tarefa-descricao">${escaparHtml(tarefa.descricao)}</p>` : ''}
        <div class="tarefa-footer">
            <div>
                <span class="tarefa-status ${statusClass}">${formatarStatus(tarefa.status)}</span>
                <select class="tarefa-status-select" onchange="atualizarStatusTarefa(${tarefa.id}, this.value)" style="margin-left: 10px; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-color);">
                    <option value="a fazer" ${tarefa.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                    <option value="em andamento" ${tarefa.status === 'em andamento' ? 'selected' : ''}>Em Andamento</option>
                    <option value="concluída" ${tarefa.status === 'concluída' ? 'selected' : ''}>Concluída</option>
                </select>
            </div>
            <span class="tarefa-data">Criada em: ${dataFormatada}</span>
        </div>
    `;

    return card;
}

// Funções globais para chamadas inline
window.abrirModalEdicao = abrirModalEdicao;
window.deletarTarefaGlobal = deletarTarefa;

// Funções do modal
function abrirModalEdicao(id) {
    const tarefa = tarefas.find(t => t.id === id);
    
    if (!tarefa) {
        mostrarErro('Tarefa não encontrada!');
        return;
    }

    document.getElementById('editarId').value = tarefa.id;
    document.getElementById('editarTitulo').value = tarefa.titulo;
    document.getElementById('editarDescricao').value = tarefa.descricao || '';
    document.getElementById('editarStatus').value = tarefa.status;

    modalEditar.style.display = 'flex';
}

function fecharModalEdicao() {
    modalEditar.style.display = 'none';
    formEditar.reset();
}

async function salvarEdicao(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('editarId').value);
    const dados = {
        titulo: document.getElementById('editarTitulo').value.trim(),
        descricao: document.getElementById('editarDescricao').value.trim(),
        status: document.getElementById('editarStatus').value
    };

    if (!dados.titulo) {
        mostrarErro('O título é obrigatório!');
        return;
    }

    await atualizarTarefa(id, dados);
    fecharModalEdicao();
}

// Funções auxiliares
function formatarStatus(status) {
    const statusMap = {
        'a fazer': 'A Fazer',
        'em andamento': 'Em Andamento',
        'concluída': 'Concluída'
    };
    return statusMap[status] || status;
}

function formatarData(dataString) {
    if (!dataString) return 'Data não disponível';
    
    const data = new Date(dataString);
    const agora = new Date();
    const diffMs = agora - data;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
    if (diffHours < 24) return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    if (diffDays < 7) return `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;

    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function atualizarContador(total) {
    contadorTarefas.textContent = `${total} tarefa${total !== 1 ? 's' : ''}`;
}

function mostrarLoading(mostrar) {
    loading.style.display = mostrar ? 'block' : 'none';
}

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.style.display = 'block';
    
    // Esconder após 5 segundos
    setTimeout(() => {
        esconderErro();
    }, 5000);
}

function esconderErro() {
    mensagemErro.style.display = 'none';
}

function mostrarMensagemSucesso(mensagem) {
    // Criar elemento temporário para mensagem de sucesso
    const sucessoDiv = document.createElement('div');
    sucessoDiv.className = 'mensagem-sucesso';
    sucessoDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    sucessoDiv.textContent = mensagem;
    
    document.body.appendChild(sucessoDiv);
    
    setTimeout(() => {
        sucessoDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(sucessoDiv);
        }, 300);
    }, 3000);
}

function escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
