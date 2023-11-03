# Port dev

## RFs (Requisitos funcionais)

 - [ ]  Deve ser possível se cadastrar;
 - [ ]  Deve ser possível se autenticar;
 - [ ]  Deve ser possível o usuário cadastrar um portfólio;
 - [ ]  Deve ser possível o usuário editar um portfólio;
 - [ ]  Deve ser possível o usuário listar todos os portfólios cadastrados;
 - [ ]  Deve ser possível o usuário visualizar um portfólio;
 - [ ]  Deve ser possível obter o perfil do usuário logado;
 - [ ]  Deve ser possível editar o perfil do suário logado;
 - [ ]  Deve ser possível o usuário listar todos os seus portfólios cadasrados;
 - [ ]  Deve ser possível o usuário curtir um portfólio;
 - [ ]  Deve ser possível obter o número de curtidas e vizualizações de um portfólio;
 - [ ]  Deve ser possível o usuário buscar por um portfólio pelas habilidades;
 - [ ]  Deve ser possível o usuário relatar algum problema com a plataforma;

## RNs (Regra de negócio)

 - [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)

 - [ ] A senha do usuário precisa estar criptografada;
 - [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
 - [ ] Todas as listas de dados precisam estar paginadas com 12 items por página;
 - [ ] O usuário deve se identificado por um JWT (JSON Web Token);
 - [ ] O Back-end deve ser desenvolvido com NodeJs + TypeScript