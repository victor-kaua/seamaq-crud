# 📊 Sistema de Controle de Máquinas - SEAMAQ

Este projeto é um sistema simples de **CRUD (Criar, Ler, Atualizar e Deletar)** para controle de máquinas utilizado pela empresa **SEAMAQ**, especializada em automação comercial e bancária (máquinas de cédulas e moedas).

---

## 🚀 Funcionalidades

- Cadastro de máquinas com os seguintes dados:
  - Modelo
  - Tipo (Cédulas ou Moedas)
  - Número de Série
  - Data de Fabricação
  - Cliente
  - Local de Instalação
  - Status (Ativo, Inativo, Manutenção)
  - Versão do Firmware
- Filtros por todos os campos para facilitar buscas
- Edição e exclusão de máquinas cadastradas
- Interface com design simples e responsivo

---

## 💻 Tecnologias Utilizadas

- **HTML5** – Estrutura da aplicação
- **CSS3** – Estilização da interface
- **JavaScript (ES6)** – Lógica de funcionamento (sem frameworks)
- **Boxicons** – Ícones gráficos para botões
- **SQLite + Node.js** – Backend para armazenamento 

---

## 📦 Como Executar Localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/projeto-seamaq.git
```

2. **Acesse a pasta do projeto:**
   
```bash
cd seamaq-crud
```
3. **Inicie o Servidor**
    - Requer: Node.js instalado.
```bash
node server.js
```
  - Caso apareça: Servidor rodando em http://localhost:3000. O sistema já está rodando.

4. **Acesse o sistema**
   - Abra o navegador e acesse:
```bash
http://localhost:3000
```

---

## 🧪 Funcionalidades Futuras
- Integração com banco de dados SQLite via backend em Node.js
- Relatórios de manutenção
- Cadastro de técnicos
- Histórico de leitura de máquinas

---

## Licença de uso
Este projeto pode ser utilizado, reproduzido, modificado e comercializado sem a prévia autorização do autor. Use como desejar.
