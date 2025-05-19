const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const sModelo = document.querySelector('#m-modelo')
const sTipo = document.querySelector('#m-tipo')
const sSerie = document.querySelector('#m-serie')
const sData = document.querySelector('#m-data')
const sCliente = document.querySelector('#m-cliente')
const sLocal = document.querySelector('#m-local')
const sStatus = document.querySelector('#m-status')
const sFirmware = document.querySelector('#m-firmware')

const btnSalvar = document.querySelector('#btnSalvar')

let itens = []
let id = undefined

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
      clearErrors()
    }
  }

  if (edit) {
    const item = itens[index]
    sModelo.value = item.modelo
    sTipo.value = item.tipoLeitor
    sSerie.value = item.serie
    sData.value = item.dataFabricacao
    sCliente.value = item.cliente
    sLocal.value = item.local
    sStatus.value = item.status
    sFirmware.value = item.firmware
    id = index
  } else {
    clearForm()
    id = undefined
  }
  clearErrors()
}

function clearForm() {
  sModelo.value = ''
  sTipo.value = ''
  sSerie.value = ''
  sData.value = ''
  sCliente.value = ''
  sLocal.value = ''
  sStatus.value = ''
  sFirmware.value = ''
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-message')
  errors.forEach(el => el.remove())
}

function showError(input, message) {
  clearErrors()
  const error = document.createElement('div')
  error.classList.add('error-message')
  error.style.color = 'red'
  error.style.fontSize = '0.9rem'
  error.style.marginTop = '-15px'
  error.style.marginBottom = '10px'
  error.textContent = message
  input.parentNode.insertBefore(error, input.nextSibling)
}

function validateForm() {
  if (!sModelo.value.trim()) {
    showError(sModelo, 'Informe o modelo')
    return false
  }
  if (!sTipo.value) {
    showError(sTipo, 'Informe o tipo de leitor')
    return false
  }
  if (!sSerie.value.trim()) {
    showError(sSerie, 'Informe o número de série')
    return false
  }
  if (!sData.value) {
    showError(sData, 'Informe a data de fabricação')
    return false
  }
  if (!sCliente.value.trim()) {
    showError(sCliente, 'Informe o cliente vinculado')
    return false
  }
  if (!sLocal.value.trim()) {
    showError(sLocal, 'Informe o local de instalação')
    return false
  }
  if (!sStatus.value) {
    showError(sStatus, 'Informe o status')
    return false
  }
  if (!sFirmware.value.trim()) {
    showError(sFirmware, 'Informe a versão do firmware')
    return false
  }

  const dataMin = new Date('1930-12-31')
  const dataMax = new Date('2099-12-31')
  const dataFabricacao = new Date(sData.value)

  if (dataFabricacao < dataMin || dataFabricacao > dataMax) {
    showError(sData, 'Data deve estar entre 31/12/1930 e 31/12/2099')
    return false
  }

  return true
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.modelo}</td>
    <td>${item.tipoLeitor}</td>
    <td>${item.serie}</td>
    <td>${item.dataFabricacao}</td>
    <td>${item.cliente}</td>
    <td>${item.local}</td>
    <td><span class="status ${item.status}">${item.status}</span></td>
    <td>${item.firmware}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = async e => {
  e.preventDefault()
  clearErrors()
  if (!validateForm()) return

  const data = {
    modelo: sModelo.value,
    tipoLeitor: sTipo.value,
    serie: sSerie.value,
    dataFabricacao: sData.value,
    cliente: sCliente.value,
    local: sLocal.value,
    status: sStatus.value,
    firmware: sFirmware.value
  }

  if (id !== undefined) {
    const item = itens[id]
    await fetch(`/api/maquinas/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } else {
    await fetch('/api/maquinas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  modal.classList.remove('active')
  clearForm()
  id = undefined
  loadItens()
}

function editItem(index) {
  openModal(true, index)
}

async function deleteItem(index) {
  const maquinaId = itens[index].id
  await fetch(`/api/maquinas/${maquinaId}`, { method: 'DELETE' })
  loadItens()
}

async function loadItens() {
  const res = await fetch('/api/maquinas')
  itens = await res.json()
  aplicarFiltro()
}

function aplicarFiltro() {
  const modeloFiltro = document.querySelector('#filter-modelo').value.toLowerCase()
  const tipoFiltro = document.querySelector('#filter-tipo').value
  const serieFiltro = document.querySelector('#filter-serie').value.toLowerCase()
  const dataFiltro = document.querySelector('#filter-data').value
  const clienteFiltro = document.querySelector('#filter-cliente').value.toLowerCase()
  const localFiltro = document.querySelector('#filter-local').value.toLowerCase()
  const statusFiltro = document.querySelector('#filter-status').value
  const firmwareFiltro = document.querySelector('#filter-firmware').value.toLowerCase()

  tbody.innerHTML = ''

  itens.forEach((item, index) => {
    const corresponde = (
      item.modelo.toLowerCase().includes(modeloFiltro) &&
      (tipoFiltro === '' || item.tipoLeitor === tipoFiltro) &&
      item.serie.toLowerCase().includes(serieFiltro) &&
      (dataFiltro === '' || item.dataFabricacao === dataFiltro) &&
      item.cliente.toLowerCase().includes(clienteFiltro) &&
      item.local.toLowerCase().includes(localFiltro) &&
      (statusFiltro === '' || item.status === statusFiltro) &&
      item.firmware.toLowerCase().includes(firmwareFiltro)
    )

    if (corresponde) insertItem(item, index)
  })
}

const filtros = [
  '#filter-modelo', '#filter-tipo', '#filter-serie',
  '#filter-data', '#filter-cliente', '#filter-local',
  '#filter-status', '#filter-firmware'
]

filtros.forEach(seletor => {
  document.querySelector(seletor).addEventListener('input', aplicarFiltro)
})

loadItens()
