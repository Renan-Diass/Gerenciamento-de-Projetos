# Gerenciamento de Projetos

Um sistema simples de gerenciamento de projetos e tarefas desenvolvido com Node.js, utilizando Bcrypt para criptografia de senhas e tokens JWT para autenticação. O sistema é construído com o framework Express e inclui testes automatizados de API e integração usando Supertest para garantir a qualidade.

## Descrição

Este projeto é um sistema de gerenciamento de projetos e tarefas que permite aos usuários criar, editar e acompanhar o progresso de suas tarefas dentro de projetos. Ele foi desenvolvido como forma de estudo para demonstrar o uso de tecnologias modernas e práticas recomendadas em desenvolvimento web.

### Funcionalidades
- **Gerenciamento de Projetos**: Criação, visualização e edição de projetos.
- **Gerenciamento de Tarefas**: Adição, edição e acompanhamento de tarefas.
- **Autenticação Segura**: Utiliza Bcrypt para criptografia de senhas e tokens JWT para autenticação.
- **Testes Automatizados**: Inclui testes automatizados de API e integração para garantir a qualidade e confiabilidade.

## Instalação

Siga os passos abaixo para configurar o ambiente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Renan-Diass/Gerenciamento-de-Projetos
   
Navegue até o diretório do projeto:

```bash
cd gerenciamentodeprojetos
```
Instale as dependências:

```bash
npm install
```
Configure as variáveis de ambiente:

Copie o arquivo .env.example para um novo arquivo .env e ajuste as variáveis conforme necessário.

Uso
Para iniciar o servidor, use o comando:

```bash
npm start
```
Exemplos de Requisições
Criar um projeto:

bash
```
POST /api/projects
{
  "name": "Novo Projeto",
  "description": "Descrição do projeto"
}
```
Adicionar uma tarefa:

```bash
Copiar código
POST /api/tasks
{
  "title": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "projectId": "id-do-projeto"
}
```
Testes
Os testes automatizados são realizados utilizando Supertest. Para executar os testes, use o comando:

```bash
npm test
```
Isso executará todos os testes de API e integração para verificar a funcionalidade do sistema.

Contribuição
Contribuições são bem-vindas! Para contribuir com o projeto:

Faça um fork do repositório.
Crie uma branch para sua feature ou correção:

```bash
git checkout -b minha-feature
```
Faça commit das suas alterações:

```bash
git commit -am 'Adiciona nova feature'
```
Envie para o repositório remoto:
```bash
git push origin minha-feature
```
Abra um pull request.

Referências
Documentação do Express
Documentação do Bcrypt
Documentação do JWT
Documentação do Supertest
