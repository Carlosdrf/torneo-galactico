# MorningValue

# Torneo Galáctico

Aplicación web interactiva donde distintas especies del universo compiten en combates galácticos.  
El proyecto permite registrar especies, enfrentarlas en combates, visualizar resultados y generar un ranking global basado en desempeño.

Diseño inspirado en una estética sci-fi / futurista (tipo Star Wars), con animaciones sutiles y una UI moderna.

---

## Features

### Gestión de Especies
- Registro de nuevas especies
- Atributos:
  - Nombre
  - Nivel de poder (entero)
  - Habilidad especial
- Persistencia local usando `localStorage`

### Combates
- Selección manual de luchadores
- Regla de combate:
  - Gana la especie con **mayor nivel de poder**
  - En caso de empate, gana por **orden alfabético**
- Animación visual simple para simular el enfrentamiento
- Registro automático de resultados (victorias / derrotas)

### Ranking Galáctico
- Ordenado por:
  1. Numero de victorias
  2. Cantidad de poder

---

##  Tecnologías usadas

- **Angular** (Standalone Components)
- **Angular Material (icons)**
- **Tailwind CSS**
- **TypeScript**
- **LocalStorage** para persistencia
- **Formly** para formularios dinámicos
- **CSS Custom Properties** + efectos glow
- Arquitectura modular y reusable
- Node 20 LTS

-----

##  Instalacion y uso

git clone https://github.com/Carlosdrf/torneo-galactico.git
cd torneo-galactico

--

npm install


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
