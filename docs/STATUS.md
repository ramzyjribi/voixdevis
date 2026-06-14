# Status - VoixDevis MVP

Derniere mise a jour: 2026-06-14  
Source de planification: `docs/PLAN.md`  
Architecture de reference: `docs/ARCHITECTURE.md`  
Statut global: Phase 2 terminee, Phase 3 en attente de validation utilisateur

## 1. Reprise rapide

### Etat actuel

- `docs/PRD.md` existe et decrit le MVP.
- `docs/ARCHITECTURE.md` existe et definit l'architecture cible.
- `docs/PLAN.md` existe et detaille les phases d'implementation.
- La section 20 de `docs/ARCHITECTURE.md` renvoie vers `docs/PLAN.md`.
- La regle UX voix est actee: la voix remplit le champ, l'utilisateur corrige, puis envoie explicitement.
- Le catalogue a ete renomme en `data/catalog.ts`.
- La Phase 0 est terminee: guides Next.js locaux relus, tools officiels confirmes, scope plomberie confirme, `npm` confirme.
- La Phase 1 est terminee: dependances `zustand` et `zod` installees, types domaine/tools crees, helpers catalogue/templates crees, calculs financiers centralises crees, generateurs d'IDs crees, store Zustand persistant cree, actions devis locales implementees et tests domaine ajoutes.
- Les controles Phase 1 passent: `npm.cmd run test:domain`, `npm.cmd run lint`, `npm.cmd run build`.
- La Phase 2 est terminee: `lucide-react` installe, shadcn/ui initialise, composants UI requis ajoutes, AppShell responsive cree, rendu devis professionnel cree, ajout manuel article/template/ligne libre branche, edition/suppression de lignes et sections branchee, parametres entreprise persistants crees, bouton Nouveau devis branche.
- Les controles Phase 2 passent: `npm.cmd run test:domain`, `npm.cmd run lint`, `npm.cmd run build`.
- Verification navigateur effectuee sur `http://localhost:3001` avec `next start`: chargement desktop, ajout article, edition quantite, totaux, parametres entreprise et onglet mobile Devis valides.
- La Phase 3 ne doit pas etre demarree sans validation utilisateur explicite.

### Prochaine action recommandee

Attendre la validation utilisateur avant de demarrer la Phase 3 de `docs/PLAN.md`.

Si validation recue:

1. Lire les guides Next.js locaux pertinents avant toute modification d'UI.
2. Creer le panneau conversation et le composer texte.
3. Ajouter la dictee assistee via `hooks/useSpeechRecognition.ts` sans declenchement Gemini automatique.


### Commandes de controle utiles

```bash
npm run lint
npm run build
```

Ces commandes deviendront surtout utiles a partir des phases de code. Pour l'instant, le travail realise est documentaire.

## 2. Progression des phases

| Phase | Milestone | Statut | Avancement | Bloque par | Prochaine action |
|---:|---|---|---:|---|---|
| 0 | Preparation du socle projet | Terminee | 100% | Rien | Aucune |
| 1 | Fondations domaine et store | Terminee | 100% | Rien | Aucune |
| 2 | UI devis, edition et parametres | Terminee | 100% | Rien | Aucune |
| 3 | Conversation texte et dictee assistee | Non demarree | 0% | Validation utilisateur | Attendre validation avant de creer chat, composer et hook Web Speech |
| 4 | Gemini Function Calling | Non demarree | 0% | Phases 1 et 3 | Creer tools, promptBuilder, route `/api/ai` |
| 5 | Clarifications et edge cases metier | Non demarree | 0% | Phase 4 | Implementer `request_clarification` et actions edge |
| 6 | Export PDF | Non demarree | 0% | Phases 1, 2 et 5 | Ajouter `@react-pdf/renderer` et le document PDF |
| 7 | Durcissement, QA et polish MVP | Non demarree | 0% | Phases 0 a 6 | Ajouter tests et verifier lint/build |

Legende:

- `Non demarree`: aucun travail d'implementation commence.
- `A demarrer`: prochaine phase active.
- `En cours`: implementation commencee, criteres pas encore tous valides.
- `Terminee`: criteres d'acceptation de la phase valides.
- `Bloquee`: impossible d'avancer sans decision ou correction.

## 3. Checklist de reprise par phase

### Phase 0 - Preparation du socle projet

Statut: Terminee

- [x] Relire `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`.
- [x] Relire `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`.
- [x] Relire `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`.
- [x] Relire `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`.
- [x] Confirmer la liste officielle des tools dans `docs/PLAN.md`.
- [x] Confirmer le scope MVP plomberie uniquement.
- [x] Confirmer la strategie STT: texte-first avec dictee assistee.
- [x] Confirmer que `npm` reste le gestionnaire de paquets.
- [x] Marquer la Phase 0 comme terminee quand tous les points ci-dessus sont faits.

Resultat attendu: contrats de base confirmes et Phase 1 prete a commencer.

### Phase 1 - Fondations domaine et store

Statut: Terminee

- [x] Creer les types domaine.
- [x] Creer les helpers de lookup catalogue/templates.
- [x] Creer les calculs financiers centralises.
- [x] Creer les generateurs d'IDs locaux.
- [x] Installer `zustand`.
- [x] Installer `zod`.
- [x] Creer le store Zustand persistant.
- [x] Implementer les actions de devis sans IA.
- [x] Ajouter les tests unitaires domaine prevus.
- [x] Valider les criteres d'acceptation de la Phase 1 dans `docs/PLAN.md`.

Resultat attendu: moteur de devis local testable sans UI finale, Gemini ni PDF.

### Phase 2 - UI devis, edition manuelle et parametres

Statut: Terminee

- [x] Installer `lucide-react`.
- [x] Initialiser shadcn/ui selon la documentation officielle.
- [x] Ajouter les composants UI shadcn necessaires.
- [x] Remplacer la page starter par l'AppShell.
- [x] Construire le split desktop et les onglets mobile.
- [x] Construire le rendu devis.
- [x] Ajouter l'edition manuelle des lignes.
- [x] Ajouter les parametres entreprise persistants.
- [x] Ajouter le bouton Nouveau devis.
- [x] Tester responsive, edition, suppression et persistence.
- [x] Valider les criteres d'acceptation de la Phase 2 dans `docs/PLAN.md`.

Resultat attendu: application locale utilisable sans IA.

### Phase 3 - Conversation texte et dictee assistee

Statut: Non demarree

- [ ] Creer le panneau conversation.
- [ ] Creer la liste de messages.
- [ ] Creer le composer texte.
- [ ] Creer le bouton micro.
- [ ] Implementer `hooks/useSpeechRecognition.ts`.
- [ ] Afficher la transcription live.
- [ ] Garantir que la voix ne declenche jamais Gemini automatiquement.
- [ ] Ajouter le fallback texte si la Web Speech API est indisponible.
- [ ] Tester saisie texte, correction avant envoi et refus micro.
- [ ] Valider les criteres d'acceptation de la Phase 3 dans `docs/PLAN.md`.

Resultat attendu: saisie conversationnelle controlee, prete a etre connectee a Gemini.

### Phase 4 - Gemini Function Calling

Statut: Non demarree

- [ ] Verifier la documentation officielle Gemini au moment de l'implementation.
- [ ] Installer le SDK Gemini officiel courant, probablement `@google/genai`.
- [ ] Ajouter les variables `GEMINI_API_KEY` et `GEMINI_MODEL`.
- [ ] Creer `ai/tools.ts`.
- [ ] Creer `ai/promptBuilder.ts`.
- [ ] Creer `ai/geminiClient.ts`.
- [ ] Creer `app/api/ai/route.ts`.
- [ ] Creer `hooks/useAiConversation.ts`.
- [ ] Creer ou finaliser `domain/toolExecutor.ts`.
- [ ] Tester les fixtures Gemini sans appel reseau.
- [ ] Valider les criteres d'acceptation de la Phase 4 dans `docs/PLAN.md`.

Resultat attendu: l'IA peut modifier le devis via tool calls valides et executes cote application.

### Phase 5 - Clarifications et edge cases metier

Statut: Non demarree

- [ ] Implementer `request_clarification`.
- [ ] Creer `components/chat/ClarificationActions.tsx`.
- [ ] Mapper les candidate IDs vers les articles catalogue.
- [ ] Implementer le clic candidat.
- [ ] Gerer la resolution texte/voix d'une clarification.
- [ ] Implementer `answer_question`.
- [ ] Implementer `unknown_action`.
- [ ] Implementer `reset_quote`.
- [ ] Implementer `delete_section`.
- [ ] Tester ambiguite, clic candidat, question, hors scope, reset et suppression section.
- [ ] Valider les criteres d'acceptation de la Phase 5 dans `docs/PLAN.md`.

Resultat attendu: le flux conversationnel gere les ambiguites et les commandes limites sans corrompre le devis.

### Phase 6 - Export PDF

Statut: Non demarree

- [ ] Installer `@react-pdf/renderer`.
- [ ] Creer le snapshot PDF immutable.
- [ ] Creer `components/pdf/QuotePdfDocument.tsx`.
- [ ] Creer `components/pdf/ExportPdfButton.tsx`.
- [ ] Creer `hooks/usePdfExport.ts`.
- [ ] Brancher le bouton export.
- [ ] Brancher le tool `trigger_pdf_export`.
- [ ] Verifier coherence UI/PDF sur les totaux.
- [ ] Tester export avec sections, ligne custom, template, remise et TVA.
- [ ] Valider les criteres d'acceptation de la Phase 6 dans `docs/PLAN.md`.

Resultat attendu: devis professionnel exportable en PDF.

### Phase 7 - Durcissement, QA et polish MVP

Statut: Non demarree

- [ ] Installer `vitest`.
- [ ] Installer `@testing-library/react`.
- [ ] Installer `@testing-library/jest-dom`.
- [ ] Installer `jsdom`.
- [ ] Ajouter la configuration de tests.
- [ ] Couvrir les modules domaine critiques.
- [ ] Couvrir l'integration IA avec fixtures.
- [ ] Couvrir les composants UI critiques.
- [ ] Verifier les erreurs Gemini/STT/PDF/localStorage.
- [ ] Nettoyer les logs debug.
- [ ] Executer `npm run lint`.
- [ ] Executer `npm run build`.
- [ ] Valider les criteres globaux de fin de MVP dans `docs/PLAN.md`.

Resultat attendu: MVP stable, testable et demonstrable.

## 4. Decisions verrouillees

- Le MVP est local-first.
- Pas d'authentification.
- Pas de base de donnees serveur.
- Pas de persistance cloud.
- Le catalogue MVP est plomberie.
- Gemini ne modifie jamais directement le store.
- Les tool calls sont valides cote application.
- Les modifications/suppressions utilisent `lineItemId`.
- Les templates sont decomposes en lignes atomiques.
- La cle Gemini reste cote serveur.
- La voix ne declenche jamais automatiquement Gemini.
- `docs/PLAN.md` est la source de verite operationnelle.

## 5. Points de vigilance ouverts

| Sujet | Risque | Action prevue |
|---|---|---|
| Gemini SDK | API susceptible d'evoluer | Verifier la doc officielle en Phase 4 |
| Web Speech API | Support navigateur variable | Fallback texte obligatoire en Phase 3 |
| LocalStorage | Donnees corrompues ou schema ancien | Versionner la persistence en Phase 1 |
| UI/PDF | Totaux divergents | Reutiliser les selectors de calcul en Phase 6 |
| Reset devis | Action destructive | Prevoir une UX claire en Phase 5 |
| `next dev` local | Echec possible sur lockfile `.next` selon permissions Windows | Utiliser `npm.cmd run build` puis `npm.cmd run start -- --port 3001` pour verification navigateur si besoin |

## 6. Known Issues

Problemes concrets deja identifies, a surveiller pendant l'implementation.

| Issue | Impact | Phase cible | Statut |
|---|---|---:|---|
| Les dossiers `ai/`, `data/`, `docs/` apparaissent non suivis par Git dans ce worktree | Risque d'oublier des fichiers au commit | 0 | Resolu |
| Web Speech API dependante de Chrome et du support navigateur | La voix peut etre indisponible chez certains utilisateurs | 3 | Ouvert |
| La Web Speech API peut dependre du reseau/service navigateur | Transcription lente ou instable en conditions chantier | 3 | Ouvert |
| Le reset devis est une action destructive | Perte de travail utilisateur si declenchement accidentel | 5 | Ouvert |
| Gemini peut proposer des IDs invalides ou ambigus | Devis incoherent si validation insuffisante | 4 | Ouvert |
| `next dev` peut echouer avec `Access is denied` lors de l'acquisition du lockfile `.next` | Verification dev server bloquee dans ce worktree | 2 | Ouvert |

## 7. Technical Debt

Compromis acceptes pour le MVP, non bloquants maintenant mais a suivre apres stabilisation.

| Dette | Pourquoi acceptee maintenant | Reprise possible |
|---|---|---|
| Catalogue mock statique embarque dans le prompt | Suffisant pour demontrer le matching MVP | Catalogue dynamique ou base de donnees |
| Pas d'indexation/recherche catalogue dediee | Le catalogue MVP reste petit | Recherche semantique ou index local |
| Pas de base de donnees serveur | MVP local-first sans compte utilisateur | Supabase ou autre persistance cloud |
| Pas d'historique multi-devis cloud | Hors scope MVP | Gestion multi-devis et synchronisation |
| Tests e2e Playwright repousses | D'abord stabiliser domaine, UI et IA mockee | Ajouter apres Phase 7 si besoin demo robuste |
| `answer_question` depend du contexte injecte a Gemini | Acceptable si les totaux calcules sont fournis par l'app | Reponses calculees par l'app puis formulees par IA |
| Catalogue limite a la plomberie | Scope MVP clair | Extension multi-metiers |

## 8. Journal de progression

| Date | Phase | Changement | Resultat | Suite |
|---|---|---|---|---|
| 2026-06-14 | Documentation | Creation de `docs/ARCHITECTURE.md` | Architecture cible disponible | Creer un plan operationnel |
| 2026-06-14 | Documentation | Creation de `docs/PLAN.md` et renvoi depuis `ARCHITECTURE.md` | Plan par phases disponible | Creer le suivi de progression |
| 2026-06-14 | Documentation | Creation de `docs/STATUS.md` | Reprise de travail facilitee | Demarrer Phase 0 |
| 2026-06-14 | Documentation | Ajout de `Known Issues` et `Technical Debt` | Suivi des problemes et dettes clarifie | Demarrer Phase 0 |
| 2026-06-14 | Preparation | Catalogue renomme en `data/catalog.ts` | Issue de nommage catalogue resolue | Mettre a jour les references du plan |
| 2026-06-14 | Phase 0 | Guides Next locaux relus et contrats confirmes | Phase 0 terminee | Demarrer Phase 1 |
| 2026-06-14 | Documentation | Ajout du workflow de session dans `AGENTS.md` | Les prochaines sessions savent lire et mettre a jour `STATUS.md` | Demarrer Phase 1 |
| 2026-06-14 | Documentation | Ajout des regles UI, TypeScript, Zod et qualite dans `AGENTS.md` | Les prochaines implementations ont des garde-fous techniques et UI | Demarrer Phase 1 |
| 2026-06-14 | Phase 1 | Installation de `zustand` et `zod`, creation du domaine devis, des validations, du store persistant et des tests domaine | Phase 1 terminee, controles `test:domain`, `lint` et `build` passes | Attendre validation utilisateur pour Phase 2 |
| 2026-06-14 | Phase 2 | Initialisation shadcn/ui, creation AppShell responsive, rendu devis, parametres entreprise, ajout manuel, edition et suppression | Phase 2 terminee, controles `test:domain`, `lint`, `build` et verification navigateur passes | Attendre validation utilisateur pour Phase 3 |

## 9. Comment mettre a jour ce fichier

Apres chaque session de travail:

1. Mettre a jour `Derniere mise a jour`.
2. Mettre a jour `Statut global`.
3. Mettre a jour `1. Reprise rapide > Etat actuel` avec les faits les plus importants pour reprendre sans relire tout l'historique.
4. Mettre a jour `1. Reprise rapide > Prochaine action recommandee` pour pointer vers la prochaine tache concrete.
5. Mettre a jour la ligne de phase concernee dans le tableau de progression.
6. Cocher les taches terminees dans la checklist de phase.
7. Ajouter une entree dans le journal de progression.
8. Noter tout blocage dans `Points de vigilance ouverts`.
9. Ajouter les problemes concrets dans `Known Issues`.
10. Ajouter les compromis acceptes dans `Technical Debt`.
11. Indiquer clairement la prochaine action recommandee.

Regle pour `Etat actuel`:

- Garder uniquement les faits de reprise, pas le detail complet des travaux.
- Mentionner les fichiers crees ou modifies qui changent le point de depart.
- Mentionner la phase active et son statut.
- Mentionner les blocages importants s'ils changent la suite.
- Supprimer les faits obsoletes au lieu d'empiler l'historique.

Statuts autorises pour les phases:

- `Non demarree`
- `A demarrer`
- `En cours`
- `Terminee`
- `Bloquee`

## 10. Prochain point de reprise

Reprendre ici:

- Phase: 3 - Conversation texte et dictee assistee
- Statut: Non demarree, en attente de validation utilisateur
- Premiere action: apres validation explicite, relire les guides Next.js locaux pertinents puis creer le panneau conversation, le composer texte et `hooks/useSpeechRecognition.ts`
- Fichier de reference principal: `docs/PLAN.md`
