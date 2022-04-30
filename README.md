# Este é meu primeiro projeto utilizando TDD

![example-workflow](https://github.com/victorjoao97/primeiro-tdd/actions/workflows/node.js.yml/badge.svg)
![example-workflow](https://github.com/victorjoao97/primeiro-tdd/actions/workflows/node.js.windows.yml/badge.svg)
![example-workflow](https://github.com/victorjoao97/primeiro-tdd/actions/workflows/node.js.macos.yml/badge.svg)

Como inicio estou utilizando JS pois é mais rápido a codificação, então foi bem simples de iniciar, a curva é bem menor graças a Deus.
Escrevi todos os testes do CRUD e logo depois comecei a implementar o código do CRUD.
Logo depois fiz o Refactor, como de costume.

No segundo passo, não achei necessário passar o ID para o crud, deixei a cargo do Serviço de Dados injetado pelo construtor no CRUD para gerenciar o ID, logo muitos testes falharam.

Com o auxilio dos testes, rapidamente corrigi os testes que falharam e prontinho, tudo funcionando novamente!

TDD é lindo, e todos deviam usar ❤️👌

# Design Patterns adotados
- Dependency Injection
    - A controller utiliza a business injetada por parametro, e a business por sua vez utiliza a serviço de acesso a dados injetado por parametro

# Design de Software
- Tentando aplicar o Clean Architecture
    - Dessa forma separei as camadas do projeto<br>
    ![image](/Architecture.png)