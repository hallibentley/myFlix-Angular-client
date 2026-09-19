# myFlix-Angular-client

The myFlix movie database application, rebuilt in Angular and TypeScript.

This is a deliberate reimplementation. The same application exists as a [React client](https://github.com/hallibentley/myFlix-client), and both consume the same [Node.js and Express backend](https://github.com/hallibentley/Movie-API). Building it twice was an exercise in learning how the two frameworks differ in practice: component architecture, state handling, dependency injection, and how each handles HTTP and routing.

**Live:** https://hallibentley.github.io/myFlix-Angular-client

## Stack

**Framework:** Angular 14, TypeScript  
**UI:** Angular Material, Angular CDK  
**Routing:** Angular Router  
**Async:** RxJS  
**Testing:** Karma, Jasmine  
**Docs:** TypeDoc  
**Deploy:** GitHub Pages via angular-cli-ghpages

## Architecture notes

Where the React version used class components and a state-based view switch, this version uses Angular Router for navigation and services with dependency injection for API access. HTTP calls return RxJS observables rather than promises. Angular Material supplies the component library, so the UI layer is declarative rather than hand-styled.

Documentation is generated from TSDoc comments with TypeDoc and lives in `/docs`.

## Features

- Register an account and log in
- Browse all movies
- View plot, director, and genre details
- Add and remove favorites
- Update and delete profile

## Running locally

```bash
git clone https://github.com/hallibentley/myFlix-Angular-client.git
cd myFlix-Angular-client
npm install
ng serve
```

Navigate to `http://localhost:4200/`. Requires a running instance of [Movie-API](https://github.com/hallibentley/Movie-API). The API was originally hosted on Heroku, whose free tier ended in November 2022, so run the backend locally.

Run tests with `ng test`. Regenerate documentation with `npx typedoc`.
