# Vitalidade Dourada AI 🌿

**Redescubra sua Vitalidade, com Segurança e Cuidado.**

Vitalidade Dourada AI é uma aplicação web inovadora e compassiva, projetada para gerar planos personalizados de exercícios de baixo impacto e nutrição balanceada para o público sênior (60+). Utilizando o poder da IA do Google (Gemini), o projeto visa promover um envelhecimento ativo, saudável e com mais qualidade de vida, sempre com foco na segurança e nas necessidades individuais de cada usuário.

## ✨ Funcionalidades Principais

-   **Planos 100% Personalizados:** A IA gera um plano semanal completo com base em dados do usuário, como idade, condições de saúde, metas, restrições e preferências.
-   **Foco em Segurança Sênior:** As sugestões de exercícios são exclusivamente de baixo impacto, e os planos nutricionais são focados em alimentos de fácil digestão e ricos em nutrientes essenciais para a idade.
-   **Autenticação Segura:** Utiliza o Supabase para um sistema de login e cadastro seguro, garantindo que os dados de saúde dos usuários sejam armazenados de forma privada.
-   **Interface Intuitiva e Acessível:** Construído com React e Tailwind CSS, o app oferece uma experiência de usuário limpa, moderna e fácil de navegar.
-   **Conteúdo Inspirador:** Cada plano diário inclui uma seção "Vida Vitoriosa" com um versículo bíblico e uma reflexão motivacional para fortalecer o bem-estar mental e espiritual.
-   **Persistência de Dados:** O perfil e o último plano gerado são salvos, permitindo que o usuário retome sua jornada de onde parou.

## 🚀 Tecnologias Utilizadas

-   **Frontend:**
    -   [React](https://react.dev/) (com Hooks)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Tailwind CSS](https://tailwindcss.com/) para estilização
    -   [React Hook Form](https://react-hook-form.com/) para gerenciamento de formulários
-   **Inteligência Artificial:**
    -   [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`) com schema de resposta JSON estruturado.
-   **Backend & Banco de Dados (BaaS):**
    -   [Supabase](https://supabase.com/)
        -   Autenticação de Usuários
        -   Banco de Dados PostgreSQL para armazenar perfis de usuário e planos.
-   **Tooling:**
    -   Módulos ES6 com `importmap` para carregamento de dependências via CDN.

## ⚙️ Como Funciona

1.  **Login/Cadastro:** O usuário cria uma conta ou faz login de forma segura.
2.  **Coleta de Dados:** O usuário preenche um formulário detalhado com suas informações de saúde, objetivos e preferências.
3.  **Geração do Plano:** Os dados do formulário são enviados para a API do Gemini junto com um *system prompt* robusto que define as regras e o formato da resposta.
4.  **Resposta da IA:** A IA processa as informações e retorna um plano semanal completo no formato JSON, seguindo um schema pré-definido.
5.  **Armazenamento:** O plano gerado é salvo no perfil do usuário no banco de dados Supabase.
6.  **Visualização:** O plano é exibido na interface de forma organizada, com uma navegação intuitiva por dias da semana e seções claras para exercícios, nutrição e bem-estar.

## 📂 Estrutura do Projeto

```
/
├── components/          # Componentes React reutilizáveis
│   ├── ui/              # Componentes de UI genéricos (Button, Card, Input, etc.)
│   ├── Auth.tsx         # Componente de autenticação
│   ├── Footer.tsx       # Rodapé da aplicação
│   ├── Header.tsx       # Cabeçalho da aplicação
│   ├── InputForm.tsx    # Formulário de coleta de dados do usuário
│   ├── LandingPage.tsx  # Página inicial para usuários não logados
│   ├── LoadingSpinner.tsx # Animação de carregamento
│   └── PlanDisplay.tsx    # Componente para exibir o plano semanal gerado
│
├── services/            # Módulos para lógica de negócio e comunicação com APIs
│   ├── geminiService.ts # Lógica para interagir com a API do Google Gemini
│   ├── profileService.ts# Funções para ler e escrever no banco de dados (Supabase)
│   └── supabaseClient.ts# Configuração e inicialização do cliente Supabase
│
├── types.ts             # Definições de tipos TypeScript
├── App.tsx              # Componente principal que gerencia o estado e as rotas
├── index.html           # Ponto de entrada HTML
├── index.tsx            # Ponto de montagem da aplicação React
└── metadata.json        # Metadados da aplicação
```

## 🔧 Configuração e Execução

Para executar este projeto localmente, você precisará de credenciais para a API do Google Gemini e para o Supabase.

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-diretorio>
    ```

2.  **Variáveis de Ambiente:**
    Este projeto espera que uma variável de ambiente `API_KEY` esteja disponível no contexto de execução para a API do Google.
    -   `API_KEY`: Sua chave de API do Google AI Studio.

    As credenciais do Supabase estão atualmente no código (`services/supabaseClient.ts`), mas o ideal é movê-las para variáveis de ambiente também.

3.  **Execute o Projeto:**
    Como o projeto não utiliza um `package.json` e carrega as dependências via `importmap`, você pode servi-lo com um servidor local simples que suporte `index.html` como ponto de entrada. Uma maneira fácil é usando a extensão **Live Server** no VS Code.

    -   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

## ⚠️ Aviso Importante

Este projeto é uma ferramenta de apoio e incentivo. As informações e planos gerados pela IA **não substituem, em nenhuma hipótese, a consulta e o acompanhamento de médicos, nutricionistas, fisioterapeutas e outros profissionais de saúde.** Sempre consulte um profissional qualificado antes de iniciar qualquer novo programa de exercícios ou dieta.
